import {ReactNode} from "react";

type Props = {
  children: ReactNode;
};

// Metadata might be handled in [locale]/layout.tsx or specific pages
// export const metadata = {
//   title: "My App",
// };

export default function RootLayout({children}: Props) {
  return children;
}
