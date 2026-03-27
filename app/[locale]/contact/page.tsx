import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getMessages } from "next-intl/server";
import { loadSeoMetadata } from "@/lib/seo/loadSeoMetadata";
import { Mail, Phone, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactFormClient } from "@/components/pages/contact/ContactFormClient";
import type {
  ContactFormTranslations,
} from "@/components/pages/contact/ContactFormClient";

const PHONE_VALUE = "+994 51 391 00 00";
const EMAIL_VALUE = "Texno-construction_az@mail.ru";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return loadSeoMetadata(locale, "contact");
}

export default async function ContactPage(): Promise<ReactNode> {
  const messages = await getMessages();
  const contactMessages = messages.contact as ContactFormTranslations & {
    title: string;
    subtitle: string;
    info_title: string;
    phone: string;
    email: string;
    hours: string;
    hours_value: string;
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-20 pb-12 sm:pt-24 sm:pb-14 md:pt-28 md:pb-16 bg-primary">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              {contactMessages.title}
            </h1>
            <p className="text-xl text-white/90">{contactMessages.subtitle}</p>
          </div>
        </Container>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <ContactFormClient translations={contactMessages} />

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {contactMessages.info_title}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">
                        {contactMessages.phone}
                      </p>
                      <a
                        href="tel:+994513910000"
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {PHONE_VALUE}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">
                        {contactMessages.email}
                      </p>
                      <a
                        href="mailto:Texno-construction_az@mail.ru"
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {EMAIL_VALUE}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">
                        {contactMessages.hours}
                      </p>
                      <p className="text-lg font-medium text-foreground">
                        {contactMessages.hours_value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
