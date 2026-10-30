import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { WhatsAppFloatingButton } from "@/components/common/WhatsAppButton";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-umber">
      <Navbar />
      <main className="flex-1">{children}</main>
      <WhatsAppFloatingButton />
      <Footer />
    </div>
  );
}
