"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowDown, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics"
import {
  ANSWER_LABELS,
  QUESTIONS,
  type AnswerLevel,
  isComplete,
  totalScore,
  zoneFor,
} from "@/lib/diagnosis/questions"
import { DiagnosisResult } from "./DiagnosisResult"

const initialAnswers = (): (AnswerLevel | null)[] =>
  QUESTIONS.map(() => null)

export function DiagnosisQuestions() {
  const [answers, setAnswers] = useState<(AnswerLevel | null)[]>(initialAnswers)
  const [submitted, setSubmitted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const questionRefs = useRef<(HTMLLIElement | null)[]>([])

  const answeredCount = useMemo(
    () => answers.filter((a) => a !== null && a !== undefined).length,
    [answers],
  )

  const complete = useMemo(() => isComplete(answers), [answers])

  // diagnosis_view (mount時に1回)
  const viewSentRef = useRef(false)
  useEffect(() => {
    if (viewSentRef.current) return
    viewSentRef.current = true
    trackEvent("diagnosis_view", { name: "diagnosis" })
  }, [])

  const onChooseAnswer = (qIndex: number, level: AnswerLevel) => {
    if (!hasStarted) {
      setHasStarted(true)
      trackEvent("diagnosis_started", {})
    }
    setAnswers((prev) => {
      const next = prev.slice()
      next[qIndex] = level
      return next
    })

    // 次の未回答質問へ自動スクロール (reduced-motion 尊重)
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const nextUnansweredIdx = (() => {
      for (let i = qIndex + 1; i < QUESTIONS.length; i++) {
        if (answers[i] === null || answers[i] === undefined) return i
      }
      // 既に全部埋まっていれば結果ボタン位置にフォーカス
      return -1
    })()
    if (nextUnansweredIdx >= 0) {
      window.setTimeout(() => {
        questionRefs.current[nextUnansweredIdx]?.scrollIntoView({
          behavior: prefersReduced ? "auto" : "smooth",
          block: "center",
        })
      }, 80)
    }
  }

  const onShowResult = () => {
    if (!complete) return
    const score = totalScore(answers)
    const zone = zoneFor(score)
    setSubmitted(true)
    trackEvent("diagnosis_completed", { score, zone: zone.id })
    window.setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 80)
  }

  const onReset = () => {
    setAnswers(initialAnswers())
    setSubmitted(false)
    setHasStarted(false)
    viewSentRef.current = true // 再マウント扱いせず view を二重発火させない
  }

  const score = useMemo(() => totalScore(answers), [answers])
  const currentZone = useMemo(() => zoneFor(score), [score])

  return (
    <div className="space-y-8">
      {/* 進捗バー (sticky) */}
      <div className="sticky top-16 z-10 -mx-4 rounded-xl border border-border bg-background/90 p-4 shadow-sm backdrop-blur sm:mx-0 sm:p-5 print:hidden">
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="font-semibold text-primary">
            回答状況: {answeredCount} / {QUESTIONS.length}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            目安所要時間 約 3 分
          </span>
        </div>
        <div
          className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border"
          aria-hidden
        >
          <div
            className="h-full rounded-full bg-brand-amber transition-[width] duration-300"
            style={{
              width: `${(answeredCount / QUESTIONS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 印刷時の代替表示 (未回答 or スコアサマリ) */}
      <div className="hidden print:block">
        {submitted ? (
          <p className="text-sm">
            印刷時点のスコア: {score} / {QUESTIONS.length * 4} (
            {currentZone.label} / 移行度 {currentZone.pct}%)
          </p>
        ) : (
          <p className="text-sm font-semibold">未回答</p>
        )}
      </div>

      {/* 15 問 */}
      <ol className="space-y-6 print:space-y-3">
        {QUESTIONS.map((q, i) => {
          const selected = answers[i]
          return (
            <li
              key={q.id}
              ref={(el) => {
                questionRefs.current[i] = el
              }}
              className="rounded-xl border border-border bg-background p-5 sm:p-6 print:break-inside-avoid print:border-black print:p-3"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/5 font-mono text-xs font-semibold text-primary print:bg-transparent print:border print:border-black"
                >
                  {i + 1}
                </span>
                <p className="flex-1 text-sm font-medium leading-relaxed text-foreground sm:text-base">
                  {q.text}
                </p>
              </div>

              {/* 選択肢 (画面表示) */}
              <fieldset className="mt-4 print:hidden">
                <legend className="sr-only">{q.text} の回答</legend>
                <div
                  role="radiogroup"
                  aria-label={`設問 ${i + 1} の回答`}
                  className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                >
                  {ANSWER_LABELS.map((label, level) => {
                    const isSelected = selected === level
                    const inputId = `${q.id}-a${level}`
                    return (
                      <label
                        key={inputId}
                        htmlFor={inputId}
                        className={[
                          "flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-center text-xs transition-colors sm:text-sm",
                          isSelected
                            ? "border-primary bg-primary/5 font-semibold text-primary"
                            : "border-border bg-background text-foreground hover:border-primary",
                        ].join(" ")}
                      >
                        <input
                          id={inputId}
                          type="radio"
                          name={q.id}
                          value={level}
                          checked={isSelected}
                          onChange={() =>
                            onChooseAnswer(i, level as AnswerLevel)
                          }
                          className="sr-only"
                        />
                        <span
                          aria-hidden
                          className={[
                            "inline-block size-3 rounded-full border",
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-muted-foreground/40",
                          ].join(" ")}
                        />
                        <span>{label}</span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              {/* 印刷時の選択値表示 */}
              <div className="mt-3 hidden text-sm print:block">
                {selected !== null && selected !== undefined ? (
                  <span>
                    回答: <span className="font-semibold">●</span>{" "}
                    {ANSWER_LABELS[selected]}
                  </span>
                ) : (
                  <span className="text-black/60">未回答</span>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      {/* アクション + 結果 */}
      <div ref={resultRef} className="space-y-6">
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-secondary p-5 sm:flex-row sm:items-center sm:justify-between print:hidden">
          <p className="text-sm text-muted-foreground">
            {complete
              ? "全問の回答が揃いました。結果を確認できます。"
              : `あと ${QUESTIONS.length - answeredCount} 問で結果が表示されます。`}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              onClick={onReset}
              disabled={answeredCount === 0 && !submitted}
              render={<button type="button" />}
            >
              <RotateCcw className="mr-2 size-4" />
              最初からやり直す
            </Button>
            <Button
              size="lg"
              nativeButton={false}
              onClick={onShowResult}
              disabled={!complete}
              render={<button type="button" />}
              className="bg-brand-amber text-primary hover:bg-brand-amber/90 disabled:opacity-50"
            >
              結果を見る
              <ArrowDown className="ml-2 size-4" />
            </Button>
          </div>
        </div>

        {submitted && complete && (
          <DiagnosisResult score={score} zone={currentZone} />
        )}
      </div>
    </div>
  )
}
