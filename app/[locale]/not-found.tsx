"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";

export default function NotFound(): ReactNode {
  return (
    <main className="min-h-screen flex items-center justify-center bg-card">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <h2 className="text-3xl font-bold text-foreground mt-4 mb-4">
            Səhifə Tapılmadı
          </h2>
          <p className="text-muted text-lg mb-8 max-w-md mx-auto">
            Axtardığınız səhifə mövcud deyil və ya köçürülüb. Ana səhifəyə
            qayıdın.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/" variant="primary" size="lg">
              <Home className="mr-2 h-5 w-5" />
              Ana Səhifə
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Geri Qayıt
            </Button>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}
