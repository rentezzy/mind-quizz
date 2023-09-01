import { Sidebar } from "@/components/common/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
}
