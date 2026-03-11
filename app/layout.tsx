import type { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

// Root layout - minimal wrapper, locale-specific layout handles the rest
export default function RootLayout({ children }: RootLayoutProps): ReactNode {
  return children;
}
