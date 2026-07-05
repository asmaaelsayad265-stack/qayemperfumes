import Card from "../ui/Card";

const testimonials = [
  {
    quote:
      "تجربة فخمة… رائحة ثابتة وتفاصيل تجعل العطر يبدو كأنه قطعة من الفن.",
    name: "سارة — مصر",
  },
  {
    quote:
      "الاختيارات مميزة والواجهة راقية جدًا. حرفيًا إحساس براند عالمية.",
    name: "أحمد — القاهرة",
  },
  {
    quote:
      "المكونات والوصف يساعدوني أختار صح. التصميم أسود وذهبي يجنّن.",
    name: "مريم — الإسكندرية",
  },
];

export default function Testimonials() {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-bold tracking-tight">آراء عملائنا</h2>
        <p className="mt-1 text-sm text-muted">Testimonials — Mock Data</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <Card
            key={t.name}
            className="group relative overflow-hidden transition hover:border-gold-2/40 hover:shadow-luxury"
          >
            <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-gold/10 blur-xl opacity-70 transition group-hover:opacity-100" />
            <div className="relative">
              <div className="text-2xl text-gold">“</div>
              <p className="text-sm leading-7 text-text">{t.quote}</p>
              <div className="mt-4 text-xs font-semibold text-muted">{t.name}</div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

