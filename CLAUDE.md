@AGENTS.md

# MF-AKADEMIA LP

AI × BIM / CAD リスキリング研修動画 432 本の販売ランディングページ。

## 販売主体・商品情報

- **販売主体**: 株式会社 M&F (Ltd.) — 「M&F tecnica」ではないので注意
- **商品**: AI × BIM / CAD 研修動画 432 本 (収録済み実体は `../../_video/`, `../../AI_BIM_CAD研修動画_432本/` にある)
- **対象**: 建設業 (ゼネコン、設計事務所、BIM/CAD オペレータの育成部門 など)

### プラン

| プラン | 価格 (税別) | 対象人数 / 内容 |
| --- | --- | --- |
| Starter | 48 万円 | 小規模 (3 トラック / 11.4 時間) |
| Standard | 96 万円 | 標準 (9 トラック / 34 時間) |
| Premium | 102 万円 | フル (18 トラック / 68 時間) |

助成金後の 1 人あたり実質負担 (中小企業 3/4 + 上限 72 万円適用):
- Starter: 12 万円
- Standard: 24 万円
- Premium: 30 万円 (定価 102 万 → 助成額は上限の 72 万円でキャップ)

### 助成金

- **人材開発支援助成金 / 事業展開等リスキリング支援コース**
- 中小企業 経費助成率 **3/4**、1 人あたり上限 **72 万円**、事業所年間上限 **1 億円**
- 1 人あたり実質負担 **12 万円** から (Starter 下限)

## 配置

```
/Volumes/Extreme Pro/0000_MFWorkspace/MF-AKADEMIApre/
├── _video/                       ← 動画本体 (触らない)
├── _build/                       ← ビルド成果物 (触らない)
├── AI_BIM_CAD研修動画_432本/    ← カリキュラム (触らない)
└── LP/
    └── mf-akademia-lp/           ← このプロジェクト
```

**禁止**: 親ディレクトリ `MF-AKADEMIApre/` 配下の `_video`, `_build`, `AI_BIM_CAD研修動画_432本` などを LP 開発中に触らない。

## 技術スタック

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4 (設定は `app/globals.css` の `@theme` で管理 — `tailwind.config.ts` は使わない)
- Shadcn/ui (style: base-nova)
- Lucide Icons
- Framer Motion (スクロールアニメ)
- React Hook Form + Zod (問い合わせフォーム)
- Resend (メール送信 — `RESEND_API_KEY` は Vercel env に後から設定)
- Bun (パッケージマネージャ & ランタイム)

## ブランドカラー (Midnight Executive)

| トークン | 値 |
| --- | --- |
| `--brand-navy` / `--primary` | `#0F1B3C` |
| `--brand-amber` / `--accent` | `#F59E0B` |
| `--background` | `#FFFFFF` |
| `--foreground` | `#0F1B3C` |

フォント: Noto Sans JP (`next/font/google` 経由で `--font-noto-sans-jp` CSS 変数)。

## 開発

```bash
bun install
bun run dev         # http://localhost:3000 (Turbopack)
bun run build       # プロダクションビルド
bun run start       # ビルド成果物を起動
```

## デプロイ

Vercel (Tokyo / hnd1 リージョン)。

```bash
vercel --prod       # 本番デプロイ
vercel              # Preview デプロイ
```

本番 URL: https://mf-akademia-lp.vercel.app

### 環境変数 (Vercel Dashboard で設定)

| 変数 | 用途 |
| --- | --- |
| `RESEND_API_KEY` | 問い合わせフォーム → メール送信 |
| `CONTACT_MAIL_TO` | 問い合わせ通知の宛先 |
| `NEXT_PUBLIC_SITE_URL` | OGP の絶対 URL (デフォルト: Vercel 自動 URL) |

## 残タスク (セッション 2 以降)

- Hero / Problem / Solution / Curriculum / Pricing / Grant / FAQ / Contact セクション実装
- 問い合わせフォーム → Resend API 接続
- OG 画像 (1200×630) 作成
- favicon 差し替え (現状は Next.js デフォルト)
- Google Analytics / Search Console 設定
- 本番ドメイン接続 (決まり次第)

## 注意

- `tailwind.config.ts` を手動で書かない (Tailwind v4 は `globals.css` の `@theme` 管理)
- shadcn のスタイルは **base-nova**。`components.json` を書き換えない
- 販売主体の表記は必ず **「株式会社 M&F」**
