import * as React from 'react'
import { emptyQuoteForm, type QuoteForm, type QuoteProduct } from '@/lib/quote-form'

type QuoteContextValue = {
  isOpen: boolean
  open: (product?: QuoteProduct) => void
  close: () => void
  step: number
  setStep: (n: number) => void
  form: QuoteForm
  setForm: (updater: (prev: QuoteForm) => QuoteForm) => void
  reset: () => void
}

const QuoteContext = React.createContext<QuoteContextValue | null>(null)

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [step, setStep] = React.useState(1)
  const [form, setFormState] = React.useState<QuoteForm>(emptyQuoteForm)

  const open = React.useCallback((product?: QuoteProduct) => {
    if (product) {
      setFormState((prev) => ({ ...prev, product }))
      setStep(2)
    } else {
      setStep(1)
    }
    setIsOpen(true)
  }, [])

  const close = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  const reset = React.useCallback(() => {
    setFormState(emptyQuoteForm)
    setStep(1)
  }, [])

  const setForm = React.useCallback((updater: (prev: QuoteForm) => QuoteForm) => {
    setFormState(updater)
  }, [])

  return (
    <QuoteContext.Provider value={{ isOpen, open, close, step, setStep, form, setForm, reset }}>
      {children}
    </QuoteContext.Provider>
  )
}

export function useQuote(): QuoteContextValue {
  const ctx = React.useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote must be used inside <QuoteProvider>')
  return ctx
}
