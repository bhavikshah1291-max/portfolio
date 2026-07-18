import AboutMe from "./components/home/about-me"
import Contact from "./components/home/contact"
import EducationSkills from "./components/home/education-skills"
import ExperienceSec from "./components/home/experience-sec"
import HeroSection from "./components/home/hero-section"
import ContactBar from "./components/home/hero-section/contact-bar"
import LatestWork from "./components/home/latest-work"
import ScrollReveal from "./components/common/ScrollReveal"

const page = () => {
  return (
    <>
      <main>
        <HeroSection />
        <ContactBar />
        <ScrollReveal>
          <AboutMe />
        </ScrollReveal>
        <ScrollReveal delay={60}>
          <ExperienceSec />
        </ScrollReveal>
        <ScrollReveal delay={90}>
          <EducationSkills />
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <LatestWork />
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <Contact />
        </ScrollReveal>
      </main>
    </>
  )
}

export default page