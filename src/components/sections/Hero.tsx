import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import botLogo from "@/assets/bot-logo.png";

export const Hero = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 15, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 80, damping: 15, mass: 0.5 });
  const logoX = useTransform(sx, (v) => v * 24);
  const logoY = useTransform(sy, (v) => v * 24);
  const logoRotY = useTransform(sx, (v) => v * 12);
  const logoRotX = useTransform(sy, (v) => v * -12);
  const glowX = useTransform(sx, (v) => v * 14);
  const glowY = useTransform(sy, (v) => v * 14);
  const cardAX = useTransform(sx, (v) => v * -16);
  const cardAY = useTransform(sy, (v) => v * -16);
  const cardBX = useTransform(sx, (v) => v * 18);
  const cardBY = useTransform(sy, (v) => v * 18);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section className="container max-w-6xl pt-10 pb-24 relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 liquid-glass rounded-full px-4 py-1.5 text-xs font-medium"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Now powering {siteConfig.bot.servers} servers</span>
          </motion.div>

          <h1 className="mt-6 font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
            Meet <span className="text-gradient animate-aurora bg-aurora bg-clip-text text-transparent">{siteConfig.bot.name}</span>
            <br />
            {siteConfig.bot.tagline}
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
            {siteConfig.bot.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <a href={siteConfig.bot.inviteUrl} target="_blank" rel="noreferrer">
                Add to Discord <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="glass" size="lg">
              <a href={siteConfig.bot.supportUrl} target="_blank" rel="noreferrer">Join Support</a>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { label: "Servers", value: siteConfig.bot.servers },
              { label: "Users", value: siteConfig.bot.users },
              { label: "Uptime", value: siteConfig.bot.uptime },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="liquid-glass rounded-2xl p-4 text-center"
              >
                <div className="text-2xl font-display font-bold text-gradient bg-aurora bg-clip-text">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div
            ref={stageRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="relative w-full max-w-md aspect-square"
            style={{ perspective: 1000 }}
          >
            <motion.div
              className="absolute inset-10 bg-aurora rounded-full blur-3xl opacity-60 animate-pulse-glow will-change-transform"
              style={{ x: glowX, y: glowY }}
            />
            <motion.div
              className="absolute inset-0 grid place-items-center will-change-transform"
              style={{ x: logoX, y: logoY, rotateX: logoRotX, rotateY: logoRotY, transformStyle: "preserve-3d" }}
            >
              <motion.img
                src={botLogo}
                alt={siteConfig.bot.name}
                className="w-3/4 h-3/4 object-contain drop-shadow-[0_30px_60px_hsl(var(--primary)/0.5)]"
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.div
              className="absolute top-6 right-4 liquid-glass rounded-2xl px-4 py-3 text-sm will-change-transform"
              style={{ x: cardAX, y: cardAY }}
            >
              <div className="text-xs text-muted-foreground">Latency</div>
              <div className="font-display font-bold text-gradient bg-aurora bg-clip-text">42ms</div>
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-0 liquid-glass rounded-2xl px-4 py-3 text-sm will-change-transform"
              style={{ x: cardBX, y: cardBY }}
            >
              <div className="text-xs text-muted-foreground">Commands</div>
              <div className="font-display font-bold text-gradient bg-aurora bg-clip-text">{siteConfig.bot.commands}+</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
