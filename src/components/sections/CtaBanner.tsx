import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { MagneticButton } from "@/components/reactbits/MagneticButton";
import { SplitTextReveal } from "@/components/reactbits/SplitTextReveal";

export const CtaBanner = () => {
  return (
    <section className="container max-w-5xl py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative liquid-glass rounded-3xl p-10 md:p-16 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-aurora opacity-20 animate-aurora" />
        <div className="relative">
          <SplitTextReveal
            as="h2"
            text="Ready to experience Zenith?"
            className="font-display font-bold text-4xl md:text-5xl tracking-tight"
          />
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Join {siteConfig.bot.servers} communities already using {siteConfig.bot.name}. Free forever, no credit card.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <MagneticButton>
              <Button asChild variant="hero" size="xl">
                <a href={siteConfig.bot.inviteUrl} target="_blank" rel="noreferrer">
                  Invite {siteConfig.bot.name} <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button asChild variant="glass" size="xl">
                <a href={siteConfig.bot.supportUrl} target="_blank" rel="noreferrer">Get Support</a>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
