import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="w-full px-4 pb-16 pt-20 md:px-12 md:pt-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12 lg:gap-20">
          {/* Left side - Story */}
          <div>
            <div
              className={`mb-4 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                60 лет
                <br />
                в погоне
                <br />
                <span className="text-foreground/40">за реальностью</span>
              </h2>
            </div>

            <div
              className={`space-y-2 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-sm leading-relaxed text-foreground/90">
                Виртуальная реальность зародилась в лабораториях учёных-мечтателей задолго до появления интернета — и с тех пор не прекращает удивлять мир.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-foreground/90">
                Этот проект прослеживает путь VR-игр от механических симуляторов 1960-х до иммерсивных миров Meta Quest и Apple Vision Pro.
              </p>
              <blockquote className="max-w-md border-l-2 border-foreground/30 pl-4 pt-1">
                <p className="text-xs italic leading-relaxed text-foreground/60">
                  «Виртуальная реальность — это технология, которая позволяет нам разделить внутренний мир воображения»
                </p>
                <footer className="mt-1 font-mono text-xs text-foreground/40">— Джарон Ланье, основоположник термина VR</footer>
              </blockquote>
            </div>
          </div>

          {/* Right side - Stats */}
          <div className="grid grid-cols-2 gap-4 md:flex md:flex-col md:justify-center md:space-y-6">
            {[
              { value: "1962", label: "Первый симулятор", sublabel: "Sensorama Мортона Хейлига", direction: "right" },
              { value: "60+", label: "Лет истории", sublabel: "Непрерывной эволюции технологий", direction: "left" },
              { value: "171M", label: "Пользователей VR", sublabel: "По всему миру в 2024 году", direction: "right" },
              { value: "$40B", label: "Объём рынка", sublabel: "Прогноз на 2026 год", direction: "left" },
            ].map((stat, i) => {
              const getRevealClass = () => {
                if (!isVisible) {
                  return stat.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
                }
                return "translate-x-0 opacity-100"
              }

              return (
                <div
                  key={i}
                  className={`flex items-baseline gap-2 border-l border-foreground/30 pl-3 transition-all duration-700 md:pl-6 ${getRevealClass()}`}
                  style={{ transitionDelay: `${300 + i * 150}ms` }}
                >
                  <div className="text-2xl font-light text-foreground md:text-5xl">{stat.value}</div>
                  <div>
                    <div className="font-sans text-sm font-light text-foreground md:text-base">{stat.label}</div>
                    <div className="font-mono text-xs text-foreground/60">{stat.sublabel}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={`mt-6 flex flex-wrap gap-3 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.(1)}>
            Смотреть эпохи
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.(2)}>
            Технологии
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}