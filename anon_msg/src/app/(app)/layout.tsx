import Navbar from "@/components/created/navbar";
import Footer from "@/components/created/footer";


export const metadata = {
  title: "AnonMsg",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
