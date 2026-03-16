"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { ReactNode } from "react";

const SERVICE_COUNT = 6;

type StatItem = {
  value: string;
  key: "services" | "clients" | "team";
};

const stats: StatItem[] = [
  { value: `${SERVICE_COUNT}+`, key: "services" },
  { value: "100+", key: "clients" },
  { value: "50+", key: "team" },
];

const featureKeys = [
  "feature_license",
  "feature_team",
  "feature_tech",
  "feature_delivery",
  "feature_portfolio",
] as const;

export function About(): ReactNode {
  const t = useTranslations("about");

  return (
    <section className="py-20" id="about">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                alt="Construction team"
                className="w-full h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 right-2 sm:right-4 md:-right-8 bg-secondary text-white p-4 md:p-6 rounded-2xl shadow-xl hidden md:block">
              <p className="text-4xl font-bold">11+</p>
              <p className="text-white/90">{t("experience")}</p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("title")}
            </h2>
            <p className="text-muted text-lg mb-6">{t("subtitle")}</p>
            <p className="text-muted leading-relaxed mb-8">
              {t("description")}
            </p>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {featureKeys.map((key, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-foreground">{t(key)}</span>
                </div>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.key} className="text-center p-4 bg-card rounded-xl">
                  <p className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted">{t(stat.key)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
