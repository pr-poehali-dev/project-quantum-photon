import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

const TECHNOLOGIES = [
  {
    title: "Дисплеи и оптика",
    description: "От ЭЛТ-экранов 90-х до современных микро-OLED с частотой 120 Гц и широким полем зрения",
    detail: "Первые VR-шлемы использовали тяжёлые ЭЛТ-мониторы с задержкой 50+ мс — это вызывало тошноту. Сегодня микро-OLED дисплеи дают задержку менее 2 мс, что делает VR комфортным даже при длительных сессиях.",
    icon: "Eye",
    direction: "top",
    progress: 92,
    facts: ["120 Гц — стандарт 2024 года", "110° поле зрения", "4K на глаз в топ-устройствах", "< 2 мс задержка"],
    from: "ЭЛТ, 60 Гц",
    to: "микро-OLED, 120 Гц",
    image: "https://cdn.poehali.dev/projects/a2f24a3f-87d5-4a9a-ab95-0b1e2d28dbf5/files/154cdeb1-98e7-459d-b732-863df5acdaf5.jpg",
  },
  {
    title: "Трекинг движений",
    description: "Эволюция от механических джойстиков до inside-out трекинга без внешних датчиков",
    detail: "Ранние системы требовали комнаты, увешанной датчиками. Технология inside-out tracking использует камеры прямо на шлеме и нейросети для отслеживания рук и тела — без единого внешнего устройства.",
    icon: "Crosshair",
    direction: "right",
    progress: 78,
    facts: ["Sub-millimeter точность", "Трекинг рук без контроллеров", "6DoF — 6 степеней свободы", "Eye-tracking встроен"],
    from: "Механика, кабели",
    to: "Inside-out, AI",
    image: "https://cdn.poehali.dev/projects/a2f24a3f-87d5-4a9a-ab95-0b1e2d28dbf5/files/323e4463-b738-4b7c-a1cf-cec64062474b.jpg",
  },
  {
    title: "Игровые движки",
    description: "Unreal Engine и Unity как основа VR-разработки: физика, рендеринг, оптимизация",
    detail: "VR требует рендеринга двух кадров одновременно (по одному на каждый глаз) при 90+ FPS — это огромная нагрузка. Foveated rendering решает проблему: движок рендерит в высоком качестве только зону взгляда, периферию — в низком.",
    icon: "Cpu",
    direction: "left",
    progress: 85,
    facts: ["Foveated rendering экономит 40% GPU", "Haptic feedback в перчатках", "Ray tracing в реальном времени", "90+ FPS обязательно"],
    from: "OpenGL, 30 FPS",
    to: "Unreal 5, Ray Tracing",
    image: "https://cdn.poehali.dev/projects/a2f24a3f-87d5-4a9a-ab95-0b1e2d28dbf5/files/631f7bd7-a390-4ca3-9504-861d4d6aa683.jpg",
  },
  {
    title: "Социальный VR",
    description: "Метавселенные, многопользовательские пространства и будущее цифрового присутствия",
    detail: "VRChat ежемесячно посещают более 4 млн пользователей. Horizon Worlds от Meta — попытка создать рабочее пространство в VR. Концерты Travis Scott в Fortnite и выступления в VR собирают миллионы зрителей.",
    icon: "Users",
    direction: "bottom",
    progress: 55,
    facts: ["4M+ пользователей VRChat", "Аватары с мимикой лица", "Виртуальные концерты и конференции", "VR-офисы уже реальность"],
    from: "Одиночный опыт",
    to: "Метавселенная",
    image: "https://cdn.poehali.dev/projects/a2f24a3f-87d5-4a9a-ab95-0b1e2d28dbf5/files/1a668929-c64d-4538-b711-f68c1b92e8c7.jpg",
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-10 transition-all duration-700 md:mb-14 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Технологии
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Как устроен виртуальный мир</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-10 lg:gap-x-20">
          {TECHNOLOGIES.map((tech, i) => (
            <ServiceCard key={i} tech={tech} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  tech,
  index,
  isVisible,
}: {
  tech: (typeof TECHNOLOGIES)[0]
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (tech.direction) {
        case "left": return "-translate-x-16 opacity-0"
        case "right": return "translate-x-16 opacity-0"
        case "top": return "-translate-y-16 opacity-0"
        case "bottom": return "translate-y-16 opacity-0"
        default: return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="mb-3 overflow-hidden rounded-lg">
        <img
          src={tech.image}
          alt={tech.title}
          className="h-36 w-full object-cover opacity-70 transition-all duration-500 group-hover:opacity-90 group-hover:scale-105"
        />
      </div>

      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-foreground/20 bg-foreground/5 transition-all duration-300 group-hover:border-foreground/40 group-hover:bg-foreground/10">
          <Icon name={tech.icon as "Eye"} size={13} className="text-foreground/70" />
        </div>
        <span className="font-mono text-xs text-foreground/40">0{index + 1}</span>
      </div>

      <h3 className="mb-1.5 font-sans text-xl font-light text-foreground md:text-2xl">{tech.title}</h3>
      <p className="mb-2 text-sm leading-relaxed text-foreground/80">{tech.description}</p>
      <p className="mb-3 text-xs leading-relaxed text-foreground/50">{tech.detail}</p>

      <div className="mb-3">
        <div className="mb-1.5 flex justify-between font-mono text-xs text-foreground/40">
          <span>{tech.from}</span>
          <span>{tech.to}</span>
        </div>
        <div className="h-px w-full bg-foreground/10">
          <div
            className="h-px bg-foreground/50 transition-all duration-1000"
            style={{ width: isVisible ? `${tech.progress}%` : "0%", transitionDelay: `${300 + index * 150}ms` }}
          />
        </div>
      </div>

      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        {tech.facts.map((fact, j) => (
          <li key={j} className="flex items-center gap-1.5 font-mono text-xs text-foreground/50">
            <span className="h-1 w-1 rounded-full bg-foreground/30" />
            {fact}
          </li>
        ))}
      </ul>
    </div>
  )
}