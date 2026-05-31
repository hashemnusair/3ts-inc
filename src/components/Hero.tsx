"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export type HeroVisualVariant = "constellation-canvas" | "constellation-image";

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  pulse: number;
  leftField: boolean;
  brightness: number;
  glow: number;
  speed: number;
  driftPhase: number;
  sprite: HTMLCanvasElement;
  spriteSize: number;
};

type ConnectionCandidate = {
  from: number;
  to: number;
  distance: number;
  opacity: number;
};

function ConstellationCanvas({ reduceMotion }: { reduceMotion: boolean | null }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let animationFrame = 0;
    let lastRenderTime = 0;
    let previousMotionTime = 0;
    let width = 0;
    let height = 0;
    let nodes: NodePoint[] = [];
    let linkOpacity = new Float32Array(0);
    let linkTarget = new Float32Array(0);
    let backgroundGradient: CanvasGradient | null = null;
    let isVisible = true;
    let isDocumentVisible = document.visibilityState === "visible";
    let frameInterval = 1000 / 60;
    let linkRefreshEvery = 5;

    const createNodeSprite = (radius: number, brightness: number, glow: number) => {
      const size = Math.ceil(Math.max(16, radius * 2 + glow * 12));
      const scale = 2;
      const sprite = document.createElement("canvas");
      sprite.width = size * scale;
      sprite.height = size * scale;

      const spriteContext = sprite.getContext("2d");
      if (!spriteContext) return { sprite, spriteSize: size };

      spriteContext.scale(scale, scale);
      const center = size / 2;
      const gradient = spriteContext.createRadialGradient(center, center, 0, center, center, size / 2);
      gradient.addColorStop(0, `rgba(255, 226, 157, ${Math.min(0.92, 0.64 * brightness)})`);
      gradient.addColorStop(0.26, `rgba(237, 199, 126, ${Math.min(0.56, 0.3 * brightness * glow)})`);
      gradient.addColorStop(1, "rgba(237, 199, 126, 0)");
      spriteContext.fillStyle = gradient;
      spriteContext.fillRect(0, 0, size, size);

      spriteContext.beginPath();
      spriteContext.arc(center, center, Math.max(1.2, radius * 0.58), 0, Math.PI * 2);
      spriteContext.fillStyle = `rgba(255, 230, 171, ${Math.min(0.96, 0.78 * brightness)})`;
      spriteContext.fill();

      return { sprite, spriteSize: size };
    };

    const createNodes = () => {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1120;
      const count = mobile ? 42 : tablet ? 68 : 92;
      const leftCount = Math.round(count * (mobile ? 0.36 : 0.22));
      frameInterval = mobile ? 1000 / 45 : 1000 / 60;
      linkRefreshEvery = mobile ? 7 : 5;

      nodes = Array.from({ length: count }, (_, index) => {
        const leftField = index < leftCount;
        const prominent = Math.random() > (leftField ? 0.86 : 0.76);
        const x = leftField
          ? 0.04 + Math.random() * (mobile ? 0.9 : 0.42)
          : (mobile ? 0.1 : 0.38) + Math.pow(Math.random(), 0.72) * (mobile ? 0.82 : 0.58);
        const y = 0.08 + Math.random() * 0.84;
        const speed = (leftField ? 0.00028 : 0.00048) + Math.random() * (leftField ? 0.00018 : 0.00034);
        const angle = Math.random() * Math.PI * 2;
        const baseRadius = (leftField ? 1.35 : 1.55) + Math.random() * (prominent ? 2.4 : 1.45);
        const brightness = prominent ? 1.15 + Math.random() * 0.45 : 0.72 + Math.random() * 0.38;
        const glow = prominent ? 1.15 + Math.random() * 0.65 : 0.72 + Math.random() * 0.34;
        const { sprite, spriteSize } = createNodeSprite(baseRadius, brightness, glow);

        return {
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseRadius,
          radius: baseRadius,
          pulse: Math.random() * Math.PI * 2,
          leftField,
          brightness,
          glow,
          speed,
          driftPhase: Math.random() * Math.PI * 2,
          sprite,
          spriteSize,
        };
      });
      linkOpacity = new Float32Array(count * count);
      linkTarget = new Float32Array(count * count);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      backgroundGradient = context.createLinearGradient(0, 0, width, 0);
      backgroundGradient.addColorStop(0, "rgba(11, 15, 12, 0.98)");
      backgroundGradient.addColorStop(0.45, "rgba(18, 24, 19, 0.96)");
      backgroundGradient.addColorStop(1, "rgba(8, 11, 9, 1)");
      createNodes();
    };

    const refreshLinks = () => {
      const mobile = width < 768;
      const threshold = mobile ? Math.min(width, height) * 0.15 : Math.min(width, height) * 0.165;
      const thresholdSquared = threshold * threshold;
      const maxConnectionsPerNode = mobile ? 3 : 4;
      const connectionCounts = new Uint8Array(nodes.length);
      const candidates: ConnectionCandidate[] = [];

      linkTarget.fill(0);

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        const ax = a.x * width;
        const ay = a.y * height;

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const bx = b.x * width;
          const by = b.y * height;
          const dx = ax - bx;
          const dy = ay - by;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < thresholdSquared) {
            const distance = Math.sqrt(distanceSquared);
            const midpoint = (a.x + b.x) / 2;
            const rightAffinity = mobile ? 0.72 : Math.min(1, Math.max(0.34, midpoint * 1.18));
            const leftDamp = a.leftField || b.leftField ? (mobile ? 0.72 : 0.52) : 1;
            const brightness = (a.brightness + b.brightness) / 2;
            const opacity = (1 - distance / threshold) * 0.44 * rightAffinity * leftDamp * brightness;

            candidates.push({
              from: i,
              to: j,
              distance,
              opacity,
            });
          }
        }
      }

      candidates.sort((a, b) => a.distance - b.distance);

      candidates.forEach((candidate) => {
        if (
          connectionCounts[candidate.from] >= maxConnectionsPerNode ||
          connectionCounts[candidate.to] >= maxConnectionsPerNode
        ) {
          return;
        }

        connectionCounts[candidate.from] += 1;
        connectionCounts[candidate.to] += 1;
        const linkIndex = candidate.from * nodes.length + candidate.to;
        linkTarget[linkIndex] = candidate.opacity;
      });
    };

    const drawConnection = (from: number, to: number, opacity: number) => {
      const a = nodes[from];
      const b = nodes[to];
      if (!a || !b || opacity <= 0.006) return;

      const ax = a.x * width;
      const ay = a.y * height;
      const bx = b.x * width;
      const by = b.y * height;
      const midpoint = (a.x + b.x) / 2;
      const brightness = (a.brightness + b.brightness) / 2;

      context.beginPath();
      context.moveTo(ax, ay);
      context.lineTo(bx, by);
      context.strokeStyle = `rgba(211, 177, 112, ${opacity})`;
      context.lineWidth = (midpoint > 0.55 ? 0.82 : 0.56) * Math.min(1.2, brightness);
      context.stroke();
    };

    const moveNodes = (timestamp: number) => {
      const deltaFrames = previousMotionTime ? Math.min(2, (timestamp - previousMotionTime) / 16.67) : 1;
      previousMotionTime = timestamp;

      nodes.forEach((node) => {
        if (!reduceMotion) {
          const steer = node.speed * 0.04 * deltaFrames;
          node.vx += Math.sin(timestamp * 0.00054 + node.driftPhase) * steer;
          node.vy += Math.cos(timestamp * 0.00042 + node.driftPhase * 1.23) * steer;

          const currentSpeed = Math.hypot(node.vx, node.vy) || node.speed;
          const maxSpeed = node.speed * 1.85;
          const minSpeed = node.speed * 0.52;
          if (currentSpeed > maxSpeed) {
            node.vx = (node.vx / currentSpeed) * maxSpeed;
            node.vy = (node.vy / currentSpeed) * maxSpeed;
          } else if (currentSpeed < minSpeed) {
            node.vx = (node.vx / currentSpeed) * minSpeed;
            node.vy = (node.vy / currentSpeed) * minSpeed;
          }

          node.x += node.vx * deltaFrames;
          node.y += node.vy * deltaFrames;

          if (node.x < 0.02 || node.x > 0.99) {
            node.x = Math.min(0.99, Math.max(0.02, node.x));
            node.vx *= -0.94;
          }
          if (node.y < 0.05 || node.y > 0.95) {
            node.y = Math.min(0.95, Math.max(0.05, node.y));
            node.vy *= -0.94;
          }
        }
      });
    };

    const draw = (timestamp = 0) => {
      if (!reduceMotion && (!isVisible || !isDocumentVisible)) {
        previousMotionTime = timestamp;
        animationFrame = window.requestAnimationFrame(draw);
        return;
      }

      if (!reduceMotion && timestamp - lastRenderTime < frameInterval) {
        animationFrame = window.requestAnimationFrame(draw);
        return;
      }

      lastRenderTime = timestamp;
      frame += 1;
      moveNodes(timestamp);

      if (frame === 1 || frame % linkRefreshEvery === 0) {
        refreshLinks();
      }

      context.clearRect(0, 0, width, height);
      context.fillStyle = backgroundGradient ?? "rgba(11, 15, 12, 0.98)";
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalCompositeOperation = "screen";

      const mobile = width < 768;

      for (let from = 0; from < nodes.length; from += 1) {
        for (let to = from + 1; to < nodes.length; to += 1) {
          const linkIndex = from * nodes.length + to;
          const target = linkTarget[linkIndex];
          const previous = linkOpacity[linkIndex];
          const ease = target > previous ? 0.16 : 0.08;
          const next = reduceMotion ? target : previous + (target - previous) * ease;

          if (next <= 0.006 && target <= 0) {
            linkOpacity[linkIndex] = 0;
            continue;
          }

          linkOpacity[linkIndex] = next;
          drawConnection(from, to, next);
        }
      }

      nodes.forEach((node) => {
        const x = node.x * width;
        const y = node.y * height;
        const rightAffinity = mobile ? 0.78 : Math.min(1, Math.max(0.42, node.x * 1.14));
        const pulse = reduceMotion ? 0.92 : 0.94 + Math.sin(timestamp * 0.00156 + node.pulse) * 0.08;
        const alpha = rightAffinity * (node.leftField && !mobile ? 0.82 : 1);
        const drawSize = node.spriteSize * pulse;

        context.globalAlpha = Math.min(1, 0.82 * alpha);
        context.drawImage(node.sprite, x - drawSize / 2, y - drawSize / 2, drawSize, drawSize);
      });

      context.globalAlpha = 1;
      context.restore();

      if (!reduceMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: "160px" },
    );

    observer.observe(canvas);

    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === "visible";
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

function HeroVisual({ variant }: { variant: HeroVisualVariant }) {
  const reduceMotion = useReducedMotion();

  if (variant === "constellation-image") {
    return (
      <>
        <Image
          src="/hero-concepts/06-signal-constellation.png"
          alt="Warm constellation lines across a dark textured field"
          fill
          priority
          className="object-cover object-[68%_50%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,13,11,0.96)_0%,rgba(10,13,11,0.88)_31%,rgba(10,13,11,0.34)_62%,rgba(10,13,11,0.1)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(211,177,112,0.18),transparent_34%)]" />
      </>
    );
  }

  return (
    <>
      <ConstellationCanvas reduceMotion={reduceMotion} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,11,9,0.88)_0%,rgba(8,11,9,0.82)_28%,rgba(8,11,9,0.34)_60%,rgba(8,11,9,0.06)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_38%,rgba(211,177,112,0.17),transparent_34%),radial-gradient(circle_at_86%_72%,rgba(127,159,80,0.08),transparent_28%)]" />
    </>
  );
}

export default function Hero({
  visualVariant = "constellation-canvas",
}: {
  visualVariant?: HeroVisualVariant;
}) {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-charcoal">
      <div className="absolute inset-0">
        <HeroVisual variant={visualVariant} />
      </div>

      <div className="relative z-10 w-full px-6 pt-40 sm:px-8 md:w-[58%] md:px-16 md:pt-44 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-10 flex flex-col items-start space-y-4 md:mb-12">
            <span className="max-w-[18rem] text-xs font-semibold uppercase leading-relaxed tracking-[0.2em] text-gold md:max-w-none">
              Considered collaboration. Consequential change.
            </span>
            <div className="h-[2px] w-12 bg-gold/70" />
          </div>

          <h1 className="mb-8 max-w-[21rem] font-serif text-4xl leading-[1.08] text-white sm:max-w-2xl sm:text-5xl md:text-6xl lg:text-7xl">
            Thoroughly. Thought. Through.
          </h1>

          <p className="mb-10 max-w-[21rem] text-lg leading-relaxed text-white/82 sm:max-w-lg md:mb-12 md:text-xl">
            A better world starts with intention and is built through better decisions, made by the right people, with honest information, in rooms designed for clarity rather than comfort.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="bg-cream px-8 py-4 text-sm font-medium uppercase tracking-widest text-charcoal shadow-lg transition-all hover:-translate-y-1 hover:bg-white active:translate-y-0"
            >
              Get Started &rarr;
            </Link>
            <a
              href="https://calendly.com/shareef3ts/a-30min-slot-with-shareef"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-cream/30 px-6 py-4 text-sm font-medium uppercase tracking-widest text-cream transition-all hover:bg-cream/10"
            >
              Book Now
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 mt-16 w-full px-6 pb-8 sm:px-8 md:mt-24 md:px-16 md:pb-12 lg:px-24"
      >
        <div className="flex max-w-6xl items-start gap-4 border-t border-cream/15 pt-6 sm:gap-6 sm:pt-8">
          <div className="shrink-0 border-r border-cream/15 pr-3 font-serif text-4xl italic leading-none text-gold sm:pr-4 sm:text-5xl">
            3<span className="ml-0.5 text-3xl sm:text-4xl">T</span>
          </div>
          <p className="min-w-0 text-sm font-medium leading-relaxed text-cream/65 sm:text-base md:max-w-5xl md:text-lg">
            Coaching; Facilitation, Teambuilding &amp; Training; OD &amp; Change Management; Program Design &mdash; grounded in neuroscience, governance, and 20 years of global leadership experience.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
