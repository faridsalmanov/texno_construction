"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

const PHONE_VALUE = "+994 51 391 00 00";
const EMAIL_VALUE = "Texno-construction_az@mail.ru";

const contactInfoItems = [
  { icon: Phone, key: "phone" as const, value: PHONE_VALUE, href: "tel:+994513910000" },
  { icon: Mail, key: "email" as const, value: EMAIL_VALUE, href: "mailto:Texno-construction_az@mail.ru" },
  { icon: Clock, key: "hours" as const },
];

export default function ContactPage(): ReactNode {
  const t = useTranslations("contact");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Form submitted! (Demo)");
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-24 pb-16 sm:pt-28 sm:pb-18 md:pt-32 md:pb-20 bg-primary">
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

      {/* Contact Content */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {t("form_title")}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t("form_name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder={t("form_placeholder_name")}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        {t("form_phone")}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder={t("form_placeholder_phone")}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t("form_email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder={t("form_placeholder_email")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t("form_subject")}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">{t("form_subject_placeholder")}</option>
                      <option value="residential">{t("form_subject_options.residential")}</option>
                      <option value="commercial">{t("form_subject_options.commercial")}</option>
                      <option value="renovation">{t("form_subject_options.renovation")}</option>
                      <option value="consultation">{t("form_subject_options.consultation")}</option>
                      <option value="other">{t("form_subject_options.other")}</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t("form_message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                      placeholder={t("form_placeholder_message")}
                    />
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    <Send className="mr-2 h-5 w-5" />
                    {t("form_submit")}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {t("info_title")}
                </h2>
                <div className="space-y-6">
                  {contactInfoItems.map((info, index) => {
                    const Icon = info.icon;
                    const value = "value" in info ? info.value : t("hours_value");
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted mb-1">
                            {t(info.key)}
                          </p>
                          {"href" in info && info.href ? (
                            <a
                              href={info.href}
                              className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="text-lg font-medium text-foreground">
                              {value}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </main>
  );
}
