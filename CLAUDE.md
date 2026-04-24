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
| `GOOGLE_CHAT_WEBHOOK_URL` | 問い合わせフォーム → Google Chat スペース通知 |
| `RESEND_API_KEY` | 問い合わせフォーム → Resend 経由のメール送信 |
| `RESEND_FROM_EMAIL` | 送信元 (例: `MF-AKADEMIA <onboarding@resend.dev>`) |
| `CONTACT_NOTIFY_TO` | 社内通知メールの宛先 (例: `m.moriya@m-and-f.jp`) |
| `NEXT_PUBLIC_SITE_URL` | OGP の絶対 URL + Origin check の許可ドメイン |

`.env.example` をテンプレとして利用。実値は Vercel Dashboard / CLI 経由でのみ設定し、リポには残さない。

## メール送信 (Resend)

問い合わせフォーム送信時に、Google Chat 通知と並行して 2 通送信:
- **お客様への自動返信**: `送信先 = data.email` / `Subject = 【MF-AKADEMIA】お問い合わせありがとうございます` / プレーンテキスト
- **社内通知**: `送信先 = CONTACT_NOTIFY_TO` / `Reply-To = data.email` / `Subject = 【MF-AKADEMIA 新規問い合わせ】{会社名} / {お名前}`

実装: `lib/mailer.ts` (テンプレ + Resend クライアント) / `app/api/contact/route.ts` (fan-out)。各送信は `Promise.allSettled` で独立。失敗しても他 2 ルートの成否に影響しない。API レスポンス `{ok:true, delivered:{chat, autoReply, notify}}`。

### DNS 認証完了後の切替手順

暫定は `onboarding@resend.dev` から送信。`m-and-f.jp` の DNS (SPF / DKIM / DMARC) 認証完了後:

```bash
vercel env rm RESEND_FROM_EMAIL production --yes
echo "MF-AKADEMIA <noreply@m-and-f.jp>" | vercel env add RESEND_FROM_EMAIL production
vercel --prod
```

コード変更は不要。Resend ダッシュボードでドメイン verified になってから切り替えること。

### 環境変数設定の注意

- `RESEND_API_KEY` などの秘密値は **必ず stdin 経由** (`echo "..." | vercel env add ...`) で Vercel に投入する
- 秘密値をローカルファイル (`.env.local` / `CLAUDE.md` / コミットメッセージ / ターミナル履歴) に残さない
- ローカル開発でメール送信を試す場合は `vercel env pull .env.local` で取得し、検証後に削除

## 残タスク

- 本番ドメイン接続 (`akademia.m-and-f.jp` など): 決まり次第 `NEXT_PUBLIC_SITE_URL` を更新
- `m-and-f.jp` の DNS 認証完了後、`RESEND_FROM_EMAIL` を `noreply@m-and-f.jp` に切替
- OG 画像 / favicon の正式デザイン差し替え (暫定は `scripts/generate-brand-images.ts` で自動生成中)
- プライバシーポリシー / 特定商取引法表記の本文 (販売開始前必須)
- Google Analytics / Search Console / sitemap
- レート制限のグローバル化 (公開後 2 週間で Upstash Redis 検討)

## 注意

- `tailwind.config.ts` を手動で書かない (Tailwind v4 は `globals.css` の `@theme` 管理)
- shadcn のスタイルは **base-nova**。`components.json` を書き換えない
- 販売主体の表記は必ず **「株式会社 M&F」**
