"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  CheckCircle,
  MessageCircle,
  ClipboardList,
  Wrench,
  PackageCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/sections/CTA";
import type { ReactNode } from "react";

import mainConstImage from "@/lib/assets/services/main const.jpg";
import repairImage from "@/lib/assets/services/repair.jpg";
import engineeringImage from "@/lib/assets/services/engineering.jpg";
import materialsImage from "@/lib/assets/services/materials.jpg";

type ServiceConfig = {
  key: string;
  image: string;
};

const services: ServiceConfig[] = [
  {
    key: "main_construction",
    image: mainConstImage.src,
  },
  {
    key: "renovation",
    image: repairImage.src,
  },
  {
    key: "engineering_systems",
    image: engineeringImage.src,
  },
  {
    key: "it_supply",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
  },
  {
    key: "materials_supply",
    image: materialsImage.src,
  },
  {
    key: "project_management",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1631&q=80",
  },
];

export default function ServicesPage(): ReactNode {
  const t = useTranslations("services");
  const featuresByService = t.raw("features") as Record<
    string,
    { items: string[] }
  >;
  const processSteps = t.raw("process_steps") as {
    step: string;
    title: string;
    desc: string;
    icon?: typeof MessageCircle;
  }[];

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-20 pb-12 sm:pt-24 sm:pb-14 md:pt-28 md:pb-16 bg-primary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-white/90">{t("subtitle")}</p>
          </motion.div>
        </Container>
      </section>

      {/* Services List */}
      <section className="py-20">
        <Container>
          <div className="space-y-24">
            {services.map((service, index) => {
              const isReversed = index % 2 === 1;
              const featureItems = featuresByService[service.key]?.items ?? [];

              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={isReversed ? "lg:order-2" : ""}>
                    <div className="relative rounded-2xl overflow-hidden">
                      <img
                        src={service.image}
                        alt={t(`${service.key}.title`)}
                        className="w-full h-[220px] sm:h-[280px] md:h-[350px] lg:h-[400px] object-cover"
                      />
                    </div>
                  </div>

                  <div className={isReversed ? "lg:order-1" : ""}>
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      {t(`${service.key}.title`)}
                    </h2>
                    <p className="text-muted text-lg mb-6">
                      {t(`${service.key}.description`)}
                    </p>
                    <ul className="space-y-3">
                      {featureItems.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-card">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("process_title")}
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {t("process_subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, index) => {
              const Icon =
                item.icon ??
                [MessageCircle, ClipboardList, Wrench, PackageCheck][index] ??
                MessageCircle;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center p-6 h-full relative overflow-hidden">
                    <span className="absolute -top-4 -right-4 text-8xl font-bold text-primary/5">
                      {item.step}
                    </span>
                    <div className="relative">
                      <div className="flex justify-center mb-4">
                        <Icon className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted">{item.desc}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      <CTA />
    </main>
  );
}
