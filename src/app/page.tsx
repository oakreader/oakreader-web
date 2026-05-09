import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { UseCases } from "@/components/sections/use-cases";
import { Features } from "@/components/sections/features";
import { Privacy } from "@/components/sections/privacy";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <UseCases />
        <Features />
        <Privacy />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
