import type { ReactNode, ButtonHTMLAttributes } from "react";
import { Link } from "@/i18n/navigation";

type ButtonVariant = "primary" | "secondary" | "outline" | "outlineOnDark" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = BaseButtonProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl",
  secondary:
    "bg-secondary text-white hover:bg-secondary-dark shadow-lg hover:shadow-xl",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  outlineOnDark:
    "border-2 border-white bg-transparent text-white hover:border-white hover:bg-transparent hover:text-white",
  ghost: "text-primary hover:bg-primary/10",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  href,
  ...props
}: ButtonProps): ReactNode {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50";
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClassName}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
