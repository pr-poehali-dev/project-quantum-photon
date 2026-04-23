import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

const EPOCHS = [
  {
    number: "01",
    title: "Пионеры",
    period: "1960–1980",
    year: "1962",
    direction: "left",
    image: "https://cdn.poehali.dev/projects/a2f24a3f-87d5-4a9a-ab95-0b1e2d28dbf5/files/2061f03a-465f-4a45-a6d0-2e6858d08a91.jpg",
    description:
      "Эпоха смелых экспериментов. Инженеры и учёные впервые попытались погрузить человека в искусственную реальность — без компьютеров, на механике и оптике.",
    devices: ["Sensorama (1962)", "The Sword of Damocles (1968)", "Aspen Movie Map (1978)"],
    milestone: "Мортон Хейлиг создал Sensorama — первую машину погружения с запахами, вибрацией и стереозвуком",
  },
  {
    number: "02",
    title: "Коммерческий старт",
    period: "1990–е годы",
    year: "1991",
    direction: "right",
    image: "https://cdn.poehali.dev/projects/a2f24a3f-87d5-4a9a-ab95-0b1e2d28dbf5/files/1d9664bf-d22b-402a-a187-0103ef1b0806.jpg",
    description:
      "VR врывается в массовую культуру: аркадные залы, первые шлемы для потребителей и громкие провалы, которые на десятилетие затормозили индустрию.",
    devices: ["VPL DataGlove (1989)", "Virtuality аркады (1991)", "Nintendo Virtual Boy (1995)", "CAVE системы (1992)"],
    milestone: "Nintendo Virtual Boy стал первой портативной VR-консолью — и одним из крупнейших коммерческих провалов Nintendo",
  },
  {
    number: "03",
    title: "Эпоха возрождения",
    period: "2000–е — 2010-е",
    year: "2007",
    direction: "left",
    image: "https://cdn.poehali.dev/projects/a2f24a3f-87d5-4a9a-ab95-0b1e2d28dbf5/files/fdee2fab-d524-4720-ad9c-042d4f3cce32.jpg",
    description:
      "Смартфоны дали дешёвые дисплеи и датчики. Google Cardboard доказал: VR может быть доступным. Инвесторы снова поверили в технологию.",
    devices: ["Google Cardboard (2014)", "Samsung Gear VR (2015)", "Oculus DK1 (2013)", "HTC Vive (2016)"],
    milestone: "Кикстартер-кампания Oculus в 2012 году собрала $2.4 млн за 30 дней и перезапустила всю индустрию",
  },
  {
    number: "04",
    title: "Современная эра",
    period: "2019 — настоящее время",
    year: "2019",
    direction: "right",
    image: "https://cdn.poehali.dev/projects/a2f24a3f-87d5-4a9a-ab95-0b1e2d28dbf5/files/d7c83b77-2d68-41d8-9708-5d58e6fc645a.jpg",
    description:
      "Автономные шлемы без ПК, отслеживание рук без контроллеров, социальные VR-пространства и первые шаги к метавселенной.",
    devices: ["Meta Quest 2/3 (2020/2023)", "PlayStation VR2 (2023)", "Apple Vision Pro (2024)", "Valve Index (2019)"],
    milestone: "Apple Vision Pro открыл эру «пространственных вычислений» с ценой $3499 и интерфейсом через взгляд и жесты",
  },
]

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      className="w-full px-4 pb-16 pt-20 md:px-12 md:pt-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-14 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Эпохи VR
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Ключевые периоды развития</p>
        </div>

        <div className="space-y-0">
          {EPOCHS.map((epoch, i) => (
            <EpochCard
              key={i}
              epoch={epoch}
              index={i}
              isVisible={isVisible}
              isExpanded={expanded === i}
              onToggle={() => setExpanded(expanded === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function EpochCard({
  epoch,
  index,
  isVisible,
  isExpanded,
  onToggle,
}: {
  epoch: (typeof EPOCHS)[0]
  index: number
  isVisible: boolean
  isExpanded: boolean
  onToggle: () => void
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return epoch.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`border-b border-foreground/10 transition-all duration-700 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between py-4 text-left md:py-7"
      >
        <div className="flex items-baseline gap-4 md:gap-8">
          <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
            {epoch.number}
          </span>
          <div>
            <div className="flex items-baseline gap-3">
              <h3 className="font-sans text-xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-1 md:text-3xl lg:text-4xl">
                {epoch.title}
              </h3>
              <span className="font-mono text-xs text-foreground/40 md:text-sm">{epoch.period}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-xs text-foreground/30 md:block">{epoch.year}</span>
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/20 transition-all duration-300 group-hover:border-foreground/40 ${
              isExpanded ? "rotate-45 bg-foreground/10" : ""
            }`}
          >
            <Icon name="Plus" size={14} className="text-foreground/60" />
          </div>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid gap-4 pb-6 md:grid-cols-[1fr_1.6fr] md:gap-10 md:pb-8">
          <div className="overflow-hidden rounded-xl">
            <img
              src={epoch.image}
              alt={epoch.title}
              className="h-40 w-full object-cover opacity-80 transition-transform duration-700 hover:scale-105 md:h-56"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm leading-relaxed text-foreground/80 md:text-base">{epoch.description}</p>
              <p className="font-mono text-xs text-foreground/40">/ Ключевые устройства</p>
              <ul className="mt-2 space-y-1.5">
                {epoch.devices.map((device, j) => (
                  <li key={j} className="flex items-center gap-2 font-mono text-xs text-foreground/70 md:text-sm">
                    <span className="h-px w-3 shrink-0 bg-foreground/30" />
                    {device}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 font-mono text-xs text-foreground/40">/ Главное событие</p>
              <p className="text-sm leading-relaxed text-foreground/80 italic md:text-base">
                "{epoch.milestone}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}