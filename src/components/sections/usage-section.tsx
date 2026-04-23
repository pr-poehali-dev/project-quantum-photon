import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

const USAGES = [
  {
    title: "Медицина",
    description: "Хирурги отрабатывают сложные операции в VR до того, как выйти к реальному пациенту. Психотерапевты лечат фобии через контролируемое погружение. Реабилитация после инсультов с помощью VR-упражнений.",
    icon: "Heart",
    image: "https://cdn.poehali.dev/projects/a2f24a3f-87d5-4a9a-ab95-0b1e2d28dbf5/files/53d31160-f193-41ec-941b-7c431c43f445.jpg",
    examples: ["Симуляция операций", "VR-терапия фобий", "Нейрореабилитация"],
    direction: "top",
  },
  {
    title: "Армия и спорт",
    description: "ВВС США тренируют пилотов в VR-симуляторах уже 30 лет. Команды NFL и NBA используют VR для разбора тактики. Космонавты NASA отрабатывают выходы в открытый космос в виртуальной среде.",
    icon: "Shield",
    image: "https://cdn.poehali.dev/projects/a2f24a3f-87d5-4a9a-ab95-0b1e2d28dbf5/files/b6d8aefb-56a2-4dcd-a2db-852be7a95580.jpg",
    examples: ["Подготовка пилотов", "Тактика в спорте", "Тренировки NASA"],
    direction: "right",
  },
  {
    title: "Архитектура и дизайн",
    description: "Архитекторы и клиенты «гуляют» по зданию ещё до начала строительства. IKEA позволяет примерить мебель в своей квартире через AR/VR. Автоконцерны разрабатывают дизайн салонов в виртуальном пространстве.",
    icon: "Building2",
    image: "https://cdn.poehali.dev/projects/a2f24a3f-87d5-4a9a-ab95-0b1e2d28dbf5/files/6345108f-7b67-471e-9f11-f479b25b023e.jpg",
    examples: ["Прогулки по проекту", "Дизайн интерьеров", "Автодизайн"],
    direction: "left",
  },
  {
    title: "Образование",
    description: "Школьники путешествуют в Древний Рим или внутрь клетки на уроке биологии. Google Expeditions уже свозил 1 млн учеников на виртуальные экскурсии. VR снижает стресс перед публичными выступлениями.",
    icon: "GraduationCap",
    image: "https://cdn.poehali.dev/projects/a2f24a3f-87d5-4a9a-ab95-0b1e2d28dbf5/files/eab124a9-5dda-4a56-a555-eeddb59dd33b.jpg",
    examples: ["Виртуальные экскурсии", "Интерактивные уроки", "Тренинги речи"],
    direction: "bottom",
  },
]

export function UsageSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="w-full px-4 pb-16 pt-20 md:px-12 md:pt-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Применение
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Где используют VR-шлемы сегодня</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:gap-10">
          {USAGES.map((item, i) => (
            <UsageCard key={i} item={item} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function UsageCard({
  item,
  index,
  isVisible,
}: {
  item: (typeof USAGES)[0]
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) return "translate-y-8 opacity-0"
    return "translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group flex gap-4 transition-all duration-700 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="h-24 w-28 shrink-0 overflow-hidden rounded-lg sm:w-32 md:h-28 md:w-36">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover opacity-75 transition-all duration-500 group-hover:scale-105 group-hover:opacity-95"
        />
      </div>

      <div className="flex min-w-0 flex-col justify-center">
        <div className="mb-1.5 flex items-center gap-2">
          <Icon name={item.icon as "Heart"} size={13} className="shrink-0 text-foreground/50" />
          <h3 className="font-sans text-base font-light text-foreground md:text-xl">{item.title}</h3>
        </div>
        <p className="mb-2 line-clamp-3 text-xs leading-relaxed text-foreground/60 md:text-sm">{item.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.examples.map((ex, j) => (
            <span key={j} className="rounded-full border border-foreground/15 px-2 py-0.5 font-mono text-xs text-foreground/50">
              {ex}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
