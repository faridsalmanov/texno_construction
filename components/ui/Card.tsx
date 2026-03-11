import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({
  children,
  className = "",
  hover = true,
}: CardProps): ReactNode {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md overflow-hidden ${
        hover
          ? "transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = {
  children: ReactNode;
  className?: string;
};

export function CardHeader({
  children,
  className = "",
}: CardHeaderProps): ReactNode {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

type CardBodyProps = {
  children: ReactNode;
  className?: string;
};

export function CardBody({
  children,
  className = "",
}: CardBodyProps): ReactNode {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>;
}

type CardImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function CardImage({
  src,
  alt,
  className = "",
}: CardImageProps): ReactNode {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  );
}
