type EventParams = Record<string, unknown>

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      targetIdOrEventName: string,
      params?: EventParams,
    ) => void
    clarity?: {
      (command: "event", eventName: string): void
      (command: "set", key: string, value: string): void
      (command: string, ...args: unknown[]): void
      q?: unknown[]
    }
  }
}

export function trackEvent(name: string, params?: EventParams): void {
  if (typeof window === "undefined") return

  try {
    window.gtag?.("event", name, params)
  } catch {
    // GA failures must never break the UI.
  }

  try {
    window.clarity?.("event", name)
  } catch {
    // Clarity failures must never break the UI.
  }
}
