import { about } from '@/data/site';
import { Badge } from '@/components/ui/badge';

export function About() {
  return (
    <section id="empresa" className="section-anchor bg-brand-deep px-5 py-20 text-white md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_.85fr] lg:items-center">
        <div>
          <Badge variant="light" className="mb-5">
            <span className="size-2 rounded-full bg-signal" />
            Paulim Tanques
          </Badge>
          <h2 className="text-balance text-4xl font-extrabold leading-[0.98] md:text-6xl">
            {about.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">{about.description}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {about.values.map((value) => (
              <span
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
                key={value}
              >
                {value}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <img
            className="aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-2xl shadow-black/25"
            src="/assets/cold-vapor-service.png"
            alt="Serviço de vapor a frio em caminhão-tanque."
          />
          <span className="pointer-events-none absolute -bottom-6 left-0 select-none text-7xl font-extrabold leading-none text-white/[0.07] md:-bottom-8 md:text-8xl">
            Paulim
          </span>
        </div>
      </div>
    </section>
  );
}
