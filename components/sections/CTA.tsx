"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

export function CTA(): ReactNode {
  const t = useTranslations("cta");

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1590650046871-92c887180603?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(21,42,69,0.94) 0%, rgba(30,58,95,0.9) 100%)",
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <Button href="/contact" variant="secondary" size="lg" className="w-full sm:w-auto">
              {t("button")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white text-white hover:bg-primary-light/40 hover:text-white hover:border-primary-light"
              onClick={() => window.open("tel:+994516579642")}
            >
              <Phone className="mr-2 h-5 w-5" />
              +994 51 657 96 42
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
