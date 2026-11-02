import { useEffect, type ReactNode } from "react"
import { Icon } from "./icons"

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description: string
  children: ReactNode
}

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && onClose()
    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-[#272727]/55 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-black/10 bg-[#f8f6f2] shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-black/[.08] px-6 py-5">
          <div>
            <h2
              id="modal-title"
              className="text-lg font-bold tracking-[-.02em]"
            >
              {title}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-black/48">
              {description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-black/45 transition hover:bg-black/[.06] hover:text-black"
            aria-label="Close dialog"
          >
            <Icon name="close" size={17} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
