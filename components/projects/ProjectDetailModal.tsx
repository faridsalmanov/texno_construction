"use client";

import { useEffect, useCallback, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import type { ProjectCardData } from "./ProjectCard";

type ProjectDetailModalProps = {
  project: ProjectCardData | null;
  onClose: () => void;
};

export function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps): ReactNode {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  const galleryImages = project
    ? (project.galleryImages ?? [project.image])
    : [];
  const selectedImage = galleryImages[selectedIndex];

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [project, handleEscape]);

  const goPrev = useCallback(() => {
    setSelectedIndex((i) => (i <= 0 ? galleryImages.length - 1 : i - 1));
  }, [galleryImages.length]);
  const goNext = useCallback(() => {
    setSelectedIndex((i) =>
      i >= galleryImages.length - 1 ? 0 : i + 1
    );
  }, [galleryImages.length]);

  return (
    <AnimatePresence>
      {project && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <button
          type="button"
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          aria-label="Close modal"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>

          {/* Large gallery - main image */}
          <div className="relative bg-muted h-[45vh] min-h-[240px] md:h-[55vh] md:min-h-[420px] flex items-center justify-center">
            {selectedImage && (
              <img
                src={selectedImage}
                alt={`${project.title} - Image ${selectedIndex + 1}`}
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            )}
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6 text-foreground" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6 text-foreground" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === selectedIndex
                          ? "bg-primary"
                          : "bg-white/60 hover:bg-white/80"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Text content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {project.title}
            </h2>
            <div className="w-12 h-1 rounded-full bg-secondary mb-6" />
            <div className="prose prose-slate max-w-none">
              <p className="text-muted leading-relaxed text-base">
                {project.extendedDescription ?? project.description}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
