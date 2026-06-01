import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

function Sheet({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />;
}

const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="sheet-overlay"
    className={cn('fixed inset-0 z-50 bg-black/45 backdrop-blur-sm data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out', className)}
    {...props}
  />
));
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    side?: 'top' | 'right' | 'bottom' | 'left';
  }
>(({ className, children, side = 'right', ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-slot="sheet-content"
      className={cn(
        'fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-lg transition ease-in-out focus:outline-none',
        side === 'right' && 'inset-y-0 right-0 h-full w-80 max-w-[calc(100vw-2rem)] border-l data-[state=open]:animate-sheet-in-right data-[state=closed]:animate-sheet-out-right',
        side === 'left' && 'inset-y-0 left-0 h-full w-80 max-w-[calc(100vw-2rem)] border-r data-[state=open]:animate-sheet-in-left data-[state=closed]:animate-sheet-out-left',
        side === 'top' && 'inset-x-0 top-0 h-auto border-b data-[state=open]:animate-sheet-in-top data-[state=closed]:animate-sheet-out-top',
        side === 'bottom' && 'inset-x-0 bottom-0 h-auto border-t data-[state=open]:animate-sheet-in-bottom data-[state=closed]:animate-sheet-out-bottom',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-4 right-4 rounded-full opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-ring focus-visible:ring-2">
        <X className="size-4" />
        <span className="sr-only">Fechar</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = DialogPrimitive.Content.displayName;

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sheet-header" className={cn('grid gap-1.5 text-left', className)} {...props} />;
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-lg font-bold text-foreground', className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
