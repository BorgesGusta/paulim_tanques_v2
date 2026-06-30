import { useQuote } from '@/context/QuoteContext'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Step1Product } from './Step1Product'
import { Step2WaterTank } from './Step2WaterTank'
import { Step2Tank } from './Step2Tank'
import { Step2Equipment } from './Step2Equipment'
import { Step3Location } from './Step3Location'
import { Step4Client } from './Step4Client'
import { StepConfirm } from './StepConfirm'

function Step2Router() {
  const { form } = useQuote()
  if (form.product === 'caixa-dagua') return <Step2WaterTank />
  if (form.product === 'tanque-estacionario') return <Step2Tank />
  if (form.product === 'equipamentos') return <Step2Equipment />
  return null
}

const stepComponents: Record<number, React.ComponentType> = {
  1: Step1Product,
  2: Step2Router,
  3: Step3Location,
  4: Step4Client,
  5: StepConfirm,
}

export function QuoteWizard() {
  const { isOpen, close, step } = useQuote()
  const StepComponent = stepComponents[step]

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) close() }}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto"
        showCloseButton
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Solicitar orçamento</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 p-6">
          {StepComponent && <StepComponent />}
        </div>
      </SheetContent>
    </Sheet>
  )
}
