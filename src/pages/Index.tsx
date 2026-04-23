import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { UsageSection } from "@/components/sections/usage-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"

export default function Index() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number>()

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionHeight = window.innerHeight
      scrollContainerRef.current.scrollTo({
        top: sectionHeight * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined
          return
        }

        const sectionHeight = window.innerHeight
        const scrollTop = scrollContainerRef.current.scrollTop
        const newSection = Math.round(scrollTop / sectionHeight)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 4) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = undefined
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
    }
  }, [currentSection])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#7c3aed"
            colorB="#06b6d4"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#6d28d9"
            upColor="#7c3aed"
            downColor="#0d0d1a"
            leftColor="#06b6d4"
            rightColor="#3b82f6"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 transition-opacity duration-700 md:px-12 md:py-6 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:bg-foreground/25 md:h-10 md:w-10">
            <span className="font-sans text-sm font-bold text-foreground md:text-xl">VR</span>
          </div>
          <span className="font-sans text-base font-semibold tracking-tight text-foreground md:text-xl">VR История</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {["Главная", "Эпохи", "Технологии", "О проекте"].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                  currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

      </nav>

      {/* Dots navigation */}
      <div className={`fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 transition-opacity duration-700 md:flex ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSection === i ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30 hover:bg-foreground/60"
            }`}
          />
        ))}
      </div>

      <div
        ref={scrollContainerRef}
        className={`relative z-10 h-screen overflow-y-auto overflow-x-hidden transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}
      >
        {/* Hero Section */}
        <section className="relative flex min-h-screen w-full shrink-0 flex-col justify-end px-4 pb-12 pt-20 md:px-12 md:pb-24">
          <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden opacity-30 md:opacity-40">
            <img
              src="https://cdn.poehali.dev/projects/a2f24a3f-87d5-4a9a-ab95-0b1e2d28dbf5/files/871ab0ae-76db-4460-92d9-fcfbe16e1a36.jpg"
              alt="VR experience"
              className="h-full w-full object-cover"
              style={{ maskImage: "linear-gradient(to right, transparent 0%, black 40%)" }}
            />
          </div>
          <div className="relative max-w-3xl">
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md duration-700">
              <p className="font-mono text-xs text-foreground/90">От 1962 года до наших дней</p>
            </div>
            <h1 className="mb-4 animate-in fade-in slide-in-from-bottom-8 font-sans text-4xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:mb-6 md:text-7xl lg:text-8xl">
              <span className="text-balance">
                История игр виртуальной реальности
              </span>
            </h1>
            <p className="mb-6 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-sm leading-relaxed text-foreground/90 duration-1000 delay-200 md:mb-8 md:text-xl">
              <span className="text-pretty">
                Путешествие сквозь десятилетия: от первых симуляторов до метавселенных. Как VR изменило игровую индустрию навсегда.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection(1)}>
                Смотреть историю
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(2)}>
                Технологии
              </MagneticButton>
            </div>

            <div className="mt-6 flex animate-in fade-in slide-in-from-bottom-4 gap-6 border-t border-foreground/10 pt-6 duration-1000 delay-500 md:mt-10 md:gap-12 md:pt-8">
              {[
                { value: "4 эпохи", label: "развития VR" },
                { value: "60+ лет", label: "истории технологий" },
                { value: "$40B", label: "объём рынка в 2026" },
              ].map((stat) => (
                <div key={stat.value}>
                  <div className="font-sans text-xl font-light text-foreground md:text-2xl">{stat.value}</div>
                  <div className="font-mono text-xs text-foreground/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex flex-col items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Листайте вниз</p>
              <div className="flex h-8 w-6 items-start justify-center rounded-full border border-foreground/20 bg-foreground/15 px-1 pt-1.5 backdrop-blur-md">
                <div className="h-2 w-1 animate-bounce rounded-full bg-foreground/80" />
              </div>
            </div>
          </div>
        </section>

        <WorkSection />
        <ServicesSection />
        <UsageSection />
        <AboutSection scrollToSection={scrollToSection} />
      </div>

      <style>{`
        [ref] ::-webkit-scrollbar { width: 4px; }
        [ref] ::-webkit-scrollbar-track { background: transparent; }
        [ref] ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 2px; }
      `}</style>
    </main>
  )
}