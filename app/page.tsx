import { Nav } from "@/components/sections/Nav"
import { Hero } from "@/components/sections/Hero"
import { Problem } from "@/components/sections/Problem"
import { Solution } from "@/components/sections/Solution"
import { Pricing } from "@/components/sections/Pricing"
import { Simulator } from "@/components/sections/Simulator"
import { Grant } from "@/components/sections/Grant"
import { Company } from "@/components/sections/Company"
import { FAQ } from "@/components/sections/FAQ"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Pricing />
        <Simulator />
        <Grant />
        <Company />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
