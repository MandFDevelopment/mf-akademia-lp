import type { PlanId } from "@/lib/pricing"

export const SIMULATOR_SHARE_KEY = "mf-akademia.simulator.v1"

export type SimulatorShare = {
  plan: PlanId
  headcount: number
}

export function writeSimulatorShare(data: SimulatorShare) {
  if (typeof window === "undefined") return
  try {
    window.sessionStorage.setItem(SIMULATOR_SHARE_KEY, JSON.stringify(data))
  } catch {
    // sessionStorage may be unavailable (private mode) — handoff simply won't happen
  }
}

export function readSimulatorShare(): SimulatorShare | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.sessionStorage.getItem(SIMULATOR_SHARE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "plan" in parsed &&
      "headcount" in parsed &&
      typeof (parsed as SimulatorShare).plan === "string" &&
      typeof (parsed as SimulatorShare).headcount === "number"
    ) {
      return parsed as SimulatorShare
    }
    return null
  } catch {
    return null
  }
}
