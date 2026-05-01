import { Nav } from "@/components/sections/Nav"
import { SeriesHero } from "@/components/sections/top/SeriesHero"
import { SeriesIntro } from "@/components/sections/top/SeriesIntro"
import { SeriesLineup } from "@/components/sections/top/SeriesLineup"
import { Grant } from "@/components/sections/Grant"
import { Company } from "@/components/sections/Company"
import { SharedFAQ } from "@/components/sections/top/SharedFAQ"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"

export default function Home() {
  return (
    <>
      <Nav mode="top" />
      <main>
        <SeriesHero />
        <SeriesIntro />
        <SeriesLineup />
        <Grant />
        <Company />
        <SharedFAQ />
        <Contact defaultSeries="undecided" />
      </main>
      <Footer />
    </>
  )
}
