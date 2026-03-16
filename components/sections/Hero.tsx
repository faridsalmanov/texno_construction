"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

export function Hero(): ReactNode {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(30,41,59,0.7) 50%, rgba(30,58,95,0.65) 100%), linear-gradient(to bottom, rgba(245,158,11,0.45) 0%, rgba(245,158,11,0.25) 25%, rgba(245,158,11,0.1) 50%, transparent 100%)",
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-xl">
              {t("subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Button href="/contact" variant="secondary" size="lg">
                {t("cta")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button href="/projects" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Play className="mr-2 h-5 w-5" />
                {t("secondary_cta")}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 lg:mt-0"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md lg:max-w-none">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-white">
                <p className="text-3xl lg:text-4xl font-bold text-secondary">11+</p>
                <p className="text-white/80 text-sm lg:text-base">{t("stats_years")}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-white">
                <p className="text-3xl lg:text-4xl font-bold text-secondary">COP29</p>
                <p className="text-white/80 text-sm lg:text-base">{t("stats_projects")}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-white">
                <p className="text-3xl lg:text-4xl font-bold text-secondary">EL-425</p>
                <p className="text-white/80 text-sm lg:text-base">{t("stats_license")}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-white">
                <p className="text-3xl lg:text-4xl font-bold text-secondary">2013</p>
                <p className="text-white/80 text-sm lg:text-base">{t("stats_founded")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/80 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
