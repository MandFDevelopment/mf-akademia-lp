"use client"

import { AlertTriangle, Compass, Sparkles, Mountain } from "lucide-react"
import type { Zone, ZoneId } from "@/lib/diagnosis/questions"
import { MAX_SCORE } from "@/lib/diagnosis/questions"

type ZoneCopy = {
  header: string
  Icon: typeof Compass
  /** 段落配列。Maakoの肉声は別途 quote で扱うため body は地の文。 */
  body: readonly string[]
  /** Maakoの直言 (引用ブロック)。原文ママ。 */
  maakoQuote: string
  nextStep: string
}

const ZONE_COPY: Record<ZoneId, ZoneCopy> = {
  crisis: {
    header: "業界の罠にはまっています",
    Icon: AlertTriangle,
    body: [
      "貴社は今、業界に古くから残る「いつも忙しい、でも整理できていない」状態に近い位置にあります。これは経営者・管理職の能力の問題ではなく、業界全体に染みついた「カッコをつけて済ませる」文化が、データで現状を見える化することを邪魔している構造です。",
      "若手が「わからない」と言ったとき、「とにかくやれ」「背中で見ろ」で済ませてしまう ― この応答は、短期的には現場が回ったように見えますが、実際は組織の生産性の天井を作っています。属人化した判断が温存され、AI に流せるはずのデータが社外にも社内にも残らない。結果として、新技術への投資判断もできなくなります。",
      "ここから一歩出るために必要なのは、ツールでも研修でもなく、「自分たちが今どこで詰まっているか」を数字で並べる勇気です。「忙しいから整理できない」を、「整理しないから忙しい」に反転させる。",
    ],
    maakoQuote:
      "忙しい理由を整理しない。逆に混乱していることを分析してほしい。そしてそれを見える化してみんなに評価してもらってほしい。そのくらいカッコつけないでほしい",
    nextStep:
      "まずは自社の業務の詰まりをデータで見える化することから始めてください。",
  },
  stagnant: {
    header: "踏み出さない経営者の典型です",
    Icon: Mountain,
    body: [
      "貴社は今、「やらなくていい理由」が言語化されすぎている状態にあります。「予算明細に項目がない」「効果が見えない」「現場が嫌がる」 ― これらは全て本当の理由ではなく、本当の理由を直視しないための言い訳として機能しています。",
      "本当の理由は、「踏み出した先がどうなるか、見えていない」だけです。視界の問題であって、勇気の問題ではありません。視界が開けば判断は自動的に変わります。",
      "停滞ゾーンの企業に共通するのは、業界の話・他社の話を熱心にする一方で、自社固有の数字 (担当件数の偏り・手戻り発生率・新人立ち上がり期間など) を持っていないことです。「全部他人事、自分ごとに回せない」が、踏み出さない経営者の構造そのものです。",
    ],
    maakoQuote:
      "全部他人事。自分ごとに回せない。予算はあるはず",
    nextStep:
      "自社の KPI をデータで見直し、3 年後の絵を描いてください。「見えるようにする」ことが、踏み出すための唯一の前提条件です。",
  },
  awaken: {
    header: "次世代側に踏み出しています",
    Icon: Compass,
    body: [
      "貴社は、業界平均から確実に一歩抜けた位置にいます。少なくとも「自社で何が詰まっているか」「3 年後にどうなりたいか」を経営側で会話できる状態に達しています。これは業界全体の中ではかなり稀な位置です。",
      "ここから「先導ゾーン」に上がるための最大のレバーは、中年代技術者の役割転換です。彼らが現場の手を動かす最強プレイヤーから、データ思考で組織を動かす「省人マネージャ」に役割転換できれば、組織の生産性は階段状に上がります。",
      "もう一つの鍵は、若手とのデータ思考の橋渡しです。経験工学の蓄積を、AI で抽出可能な形に変換する作業を、中年代と若手の協働で進めること。経験は要らなくならない、習得スピードを数倍化する ― この感覚を組織に共有できれば、覚醒ゾーンを抜けます。",
    ],
    maakoQuote:
      "データ思考が体に染みた中年代技術者は、技術者としての研鑽がさらに進む",
    nextStep:
      "経験工学と AI の橋渡しを担う人材育成を加速してください。組織内で「データ思考の通訳」が一人いれば、変化の速度は別物になります。",
  },
  lead: {
    header: "業界を変える側に立っています",
    Icon: Sparkles,
    body: [
      "貴社は、業界全体の「もうダメだ」という諦めの声に、自社の事実で反証できる位置にいます。これは数字で見れば僅かでも、業界の中での意味は決定的です。先導ゾーンの企業が一社出ると、業界の議論の前提が変わるからです。",
      "ここから先は、自社のためだけでなく、業界全体への発信が問われます。実証した事例、変えた数値、若手の育ち方 ― これらを業界に開いて見せること自体が、先導側の責任になります。",
      "MF-AKADEMIA の役割は、貴社の変化のスピードを、もう一段上げることです。経験工学とデータ思考の橋渡しを、社内に閉じず業界全体に広げる装置として機能します。",
    ],
    maakoQuote:
      "日本の建設業でそれができる企業が出てくるかは別問題。でも僕はそう思ってる",
    nextStep:
      "貴社が業界の第一号になるか。MF-AKADEMIA でその速度を上げます。",
  },
}

type DiagnosisResultProps = {
  score: number
  zone: Zone
}

export function DiagnosisResult({ score, zone }: DiagnosisResultProps) {
  const copy = ZONE_COPY[zone.id]
  const { Icon } = copy

  return (
    <div
      role="region"
      aria-labelledby="diagnosis-result-heading"
      className="rounded-2xl border border-brand-amber/30 bg-primary text-primary-foreground shadow-lg print:border-black print:bg-transparent print:text-black print:shadow-none"
    >
      <div className="border-b border-white/10 p-6 sm:p-8 print:border-black/30">
        <div className="flex flex-wrap items-center gap-3 text-sm text-brand-amber print:text-black">
          <Icon className="size-5" aria-hidden />
          <span className="font-semibold uppercase tracking-[0.2em]">
            Diagnosis Result
          </span>
        </div>

        <h3
          id="diagnosis-result-heading"
          className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {copy.header}
        </h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-white/60 print:text-black/70">
              スコア
            </div>
            <div className="mt-1 font-mono text-2xl font-semibold text-brand-amber print:text-black">
              {score}{" "}
              <span className="text-sm text-white/60 print:text-black/60">
                / {MAX_SCORE}
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-white/60 print:text-black/70">
              ゾーン
            </div>
            <div className="mt-1 text-2xl font-semibold">{zone.label}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-white/60 print:text-black/70">
              移行度
            </div>
            <div className="mt-1 font-mono text-2xl font-semibold text-brand-amber print:text-black">
              {zone.pct}%
            </div>
          </div>
        </div>

        {/* 移行度バー */}
        <div className="mt-5">
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-white/10 print:bg-black/10"
            aria-hidden
          >
            <div
              className="h-full rounded-full bg-brand-amber print:bg-black"
              style={{ width: `${zone.pct}%` }}
            />
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-white/50 print:text-black/60">
            <span>20%</span>
            <span>40%</span>
            <span>60%</span>
            <span>80%</span>
            <span className="opacity-50">100% — 意図的に設けない</span>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6 sm:p-8">
        {copy.body.map((p, i) => (
          <p
            key={i}
            className="text-sm leading-relaxed text-white/85 sm:text-base print:text-black"
          >
            {p}
          </p>
        ))}

        <blockquote className="border-l-4 border-brand-amber pl-4 italic text-brand-amber print:border-black print:text-black">
          「{copy.maakoQuote}」
          <footer className="mt-1 text-xs not-italic text-white/50 print:text-black/60">
            — Maako (M&amp;F 創業者) 取材より
          </footer>
        </blockquote>

        <div className="rounded-lg border border-brand-amber/40 bg-brand-amber/10 p-4 text-sm leading-relaxed print:border-black print:bg-transparent">
          <span className="font-semibold text-brand-amber print:text-black">
            次の一手:
          </span>{" "}
          <span className="text-white print:text-black">{copy.nextStep}</span>
        </div>
      </div>
    </div>
  )
}
