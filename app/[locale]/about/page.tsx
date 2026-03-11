"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle, Award, Users, Shield } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CTA } from "@/components/sections/CTA";
import type { ReactNode } from "react";

const VALUE_ICONS = [Shield, Award, Users] as const;

export default function AboutPage(): ReactNode {
  const t = useTranslations("about");
  const features = t.raw("features") as string[];
  const values = t.raw("values") as { title: string; description: string }[];

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-white/90">{t("subtitle")}</p>
          </motion.div>
        </Container>
      </section>

      {/* About Content */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                alt="Construction site"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {t("story_title")}
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                {t("description")}
              </p>
              <p className="text-muted leading-relaxed mb-6">
                {t("story_paragraph")}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t("mission_title")}
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              {t("mission_p1")}
            </p>
            <p className="text-muted text-lg leading-relaxed">
              {t("mission_p2")}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Values */}
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
              {t("values_title")}
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {t("values_subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {values.map((value, index) => {
              const Icon = VALUE_ICONS[index] ?? Shield;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full max-w-sm"
                >
                  <Card className="text-center p-6 h-full">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted">{value.description}</p>
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
