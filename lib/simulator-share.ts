import type { PlanId } from "@/lib/pricing/types"

export type SeriesId = "v1" | "v3"

export const SIMULATOR_SHARE_KEYS: Record<SeriesId, string> = {
  v1: "mf-akademia.simulator.v1",
  v3: "mf-akademia.simulator.v3",
}

export type SimulatorShare = {
  plan: PlanId
  headcount: number
  series: SeriesId
}

export function writeSimulatorShare(data: SimulatorShare) {
  if (typeof window === "undefined") return
  try {
    window.sessionStorage.setItem(
      SIMULATOR_SHARE_KEYS[data.series],
      JSON.stringify(data),
    )
  } catch {
    // sessionStorage may be unavailable (private mode) — handoff simply won't happen
  }
}

/**
 * Reads the simulator handoff for a specific series. Returns `null` when
 * absent or malformed. Pages that show a unified contact form (e.g. the
 * series top page) can call this once per series and pick the most recent.
 */
export function readSimulatorShare(series: SeriesId): SimulatorShare | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.sessionStorage.getItem(SIMULATOR_SHARE_KEYS[series])
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
      const candidate = parsed as SimulatorShare
      // Older clients (pre-series-split) may have written payloads without
      // `series`. Backfill it from the storage key we just read so callers
      // always get a fully-typed value. New writers always include it.
      return candidate.series ? candidate : { ...candidate, series }
    }
    return null
  } catch {
    return null
  }
}
