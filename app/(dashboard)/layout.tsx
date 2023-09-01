import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Sidebar />
      <Header />
      {children}
    </main>
  );
}
