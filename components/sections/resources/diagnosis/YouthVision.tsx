const DARK_KEYWORDS = [
  "挫折",
  "ミス",
  "業務過多",
  "残業",
  "休日出勤",
  "無給",
] as const

export function YouthVision() {
  return (
    <section
      id="youth-vision"
      aria-labelledby="youth-vision-heading"
      className="bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-amber">
          Section 08 / Young Engineers
        </p>
        <h2
          id="youth-vision-heading"
          className="mt-3 text-2xl font-bold tracking-tight text-primary sm:text-3xl"
        >
          若手と業界の魅力 ― 3 年目にマネージャー視点を持つ
        </h2>

        {/* 業界の闇 */}
        <div className="mt-8 rounded-xl border border-destructive/30 bg-destructive/5 p-6">
          <h3 className="text-sm font-semibold text-destructive">
            業界の闇 (率直に)
          </h3>
          <p className="mt-3 text-base leading-relaxed text-foreground">
            建設業の若手が直面する現実を、業界として誤魔化さないこと。これが議論の出発点です。
          </p>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {DARK_KEYWORDS.map((kw) => (
              <li
                key={kw}
                className="rounded-full border border-destructive/40 bg-background px-3 py-1 font-medium text-destructive"
              >
                {kw}
              </li>
            ))}
          </ul>
        </div>

        <blockquote className="mt-6 border-l-4 border-destructive/60 bg-secondary p-5 italic text-foreground">
          「挫折、ミス、業務過多、残業、休日出勤、無給」
        </blockquote>

        {/* 業界の魅力 */}
        <h3 className="mt-12 text-lg font-semibold text-primary">
          それでも、業界には魅力がある
        </h3>
        <blockquote className="mt-4 border-l-4 border-brand-amber bg-secondary p-5 italic text-primary">
          「完成した建物などは、携わった人間しか理解できない達成感がある。それはとても素晴らしい」
        </blockquote>
        <p className="mt-5 text-base leading-relaxed text-foreground">
          若手が辞めずに残るかどうかを左右するのは、給与でも残業時間でもなく (もちろんそれらは重要ですが)、この達成感への通路を 3 年以内に開けるかどうかです。「いずれわかる」では遅い。3 年で開かないなら、若手は別の業界を選びます。
        </p>

        {/* 矛盾の指摘 */}
        <h3 className="mt-12 text-lg font-semibold text-primary">
          言葉と現実のズレ
        </h3>
        <blockquote className="mt-4 border-l-4 border-brand-amber bg-secondary p-5 italic text-primary">
          「言葉では理解しても現実として実践出来てるかは疑問」「この時代では絶対にダメな習慣」
        </blockquote>
        <p className="mt-5 text-base leading-relaxed text-foreground">
          「若手育成は大事」とすべての経営者が言います。しかし、現場の運用は「背中で覚えろ」のままで、具体的な習得経路は描けていない ― これが業界の隠れた共通課題です。言葉のレベルではなく、組織の運用としての習慣を変える必要があります。
        </p>

        {/* 3年目の理想像 */}
        <h3 className="mt-12 text-lg font-semibold text-primary">
          3 年目の理想像
        </h3>
        <blockquote className="mt-4 border-l-4 border-brand-amber bg-secondary p-5 italic text-primary">
          「3 年目で自分がマネージャーとして立ち振る舞うイメージを持ってほしい。そうするとどこが足りないかが見えてきて、それをどう解決するかを見える化する」
        </blockquote>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground">
          <p>
            ここで重要なのは、「3 年目でマネージャー」とは肩書きの話ではなく、
            <span className="font-semibold">視点の話</span>
            だということ。自分の業務を俯瞰し、足りない知識・経験を自分で特定し、解決策を見える化する ― この習慣が 3 年目までに身についていれば、5 年目以降の伸び方は別物になります。
          </p>
          <p>
            経験工学の解決策は、ここで効きます。経験はデータ化できる。判断パターンは数パターンで見える化できる。経験そのものは要らなくならない、ただ習得スピードを数倍にできる ― 若手が、現場で背中を見て覚える時間を圧縮し、マネージャー視点を 3 年で持てるようにする。これが MF-AKADEMIA の若手側のミッションです。
          </p>
        </div>

      </div>
    </section>
  )
}
