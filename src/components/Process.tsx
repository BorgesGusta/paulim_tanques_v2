import { processSteps } from '@/data/site';
import { BrandIcon } from '@/components/BrandIcon';
import { SectionHeading } from '@/components/SectionHeading';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function Process() {
  return (
    <section id="processo" className="section-anchor bg-background px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Nosso processo"
          title="Por que a Paulim Tanques?"
          align="center"
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Left: numbered accordion */}
          <div>
            <Accordion type="single" collapsible defaultValue="step-0">
              {processSteps.map((step, index) => (
                <AccordionItem
                  key={step.title}
                  value={`step-${index}`}
                  className="border-b border-border py-1"
                >
                  <AccordionTrigger className="gap-4 text-left">
                    <div className="flex flex-1 items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                          <BrandIcon name={step.icon} size={18} />
                        </span>
                        <span className="text-base font-extrabold text-brand-dark">{step.title}</span>
                      </div>
                      <span className="mr-3 text-sm font-bold text-muted-foreground">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pl-[52px] text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right: image with floating card */}
          <div className="relative">
            <img
              className="w-full rounded-[1.75rem] object-cover shadow-2xl shadow-brand-deep/10"
              src="/assets/cold-vapor-service.png"
              alt="Serviço de vapor a frio em caminhão-tanque."
            />
            <Card className="absolute bottom-5 left-5 right-5 border-white/60 bg-white/94 p-4 shadow-xl shadow-brand-deep/10 backdrop-blur-sm md:left-auto md:right-5 md:max-w-72">
              <Badge variant="brand" className="mb-2">
                <span className="size-2 rounded-full bg-signal" />
                Fluxo técnico
              </Badge>
              <p className="text-sm font-bold leading-6 text-brand-dark">
                Diagnóstico, execução e conferência em um fluxo integrado e controlado.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
