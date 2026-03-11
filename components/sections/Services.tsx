"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Building2, Wrench, Zap, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type ServiceKey =
  | "main_construction"
  | "renovation"
  | "engineering_systems";

type ServiceItem = {
  key: ServiceKey;
  icon: LucideIcon;
};

const services: ServiceItem[] = [
  { key: "main_construction", icon: Building2 },
  { key: "renovation", icon: Wrench },
  { key: "engineering_systems", icon: Zap },
];

export function Services(): ReactNode {
  const t = useTranslations("services");

  return (
    <section className="py-20 bg-card" id="services">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("main_title")}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full group">
                  <CardHeader className="pb-2">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                      <Icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {t(`${service.key}.title`)}
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <p className="text-muted leading-relaxed">
                      {t(`${service.key}.description`)}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button href="/services" variant="outline" size="lg">
            {t("see_all_services")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
