# MF-AKADEMIA LP

AI × BIM / CAD リスキリング研修動画 432 本の販売ランディングページ。
Next.js 16 (App Router, Turbopack) + Tailwind v4 + Shadcn (base-nova) + Bun。

## 開発

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # プロダクションビルド
bun run start    # ビルド成果物を起動
```

## アクセス解析 (GA4 + Microsoft Clarity)

定量データ (GA4) と定性データ (Clarity / ヒートマップ・セッションリプレイ) を両軸で計測しています。
環境変数が **未設定の場合はスクリプトが一切読み込まれません** — そのため、ローカル開発や Preview 環境を「クリーンな状態」に保ちたい場合は値を空のままにしてください。

### 必要な環境変数

| 変数 | 例 | 用途 |
| --- | --- | --- |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | GA4 測定 ID |
| `NEXT_PUBLIC_CLARITY_ID` | `xxxxxxxxxx` (10 桁英数) | Microsoft Clarity プロジェクト ID |

### 1. GA4 測定 ID の取得手順

1. <https://analytics.google.com> にログイン
2. 「管理 (歯車アイコン)」→「プロパティを作成」
3. プロパティ名: `MF-AKADEMIA LP` / タイムゾーン: 日本 / 通貨: JPY
4. ビジネスの詳細を入力後、「作成」
5. 「データストリーム」→「ウェブ」→ URL `https://mf-akademia-lp.vercel.app` (本番ドメイン決定後に差し替え) で新規作成
6. 表示された **「測定 ID」(`G-` で始まる文字列)** をコピー

### 2. Microsoft Clarity プロジェクト ID の取得手順

1. <https://clarity.microsoft.com> にログイン (Microsoft アカウント or Google アカウント)
2. 「+ 新しいプロジェクト」
3. 名前: `MF-AKADEMIA LP` / Web サイト URL: `https://mf-akademia-lp.vercel.app` / カテゴリ: `Education`
4. 作成後、「設定 → セットアップ」を開く
5. 「JavaScript タグを手動でインストールする」のスニペット内の **`"xxxxxxxxxx"`(10 桁英数)** がプロジェクト ID

### 3. ローカル `.env.local` への設定

`.env.local` に追記 (このファイルは git 追跡対象外):

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
```

`bun run dev` を再起動して反映。

### 4. Vercel への登録

```bash
echo "G-XXXXXXXXXX" | vercel env add NEXT_PUBLIC_GA_ID production
echo "xxxxxxxxxx"  | vercel env add NEXT_PUBLIC_CLARITY_ID production
vercel --prod
```

`preview` / `development` にも同じ手順で投入可。値を空のままにすると、その環境ではトラッキングが無効になります。

### 5. カスタムイベント

`lib/analytics.ts` の `trackEvent(name, params?)` から GA4 と Clarity の両方に送信しています。LP に埋め込み済みのイベント:

| イベント名 | 発火タイミング |
| --- | --- |
| `cta_click` | Hero / Nav / Pricing / Simulator の主要 CTA クリック (params に `location`, `label`, `plan` 等) |
| `pricing_tier_view` | Starter / Standard / Premium の各カードが画面に 50% 以上表示されたとき (1 回のみ) |
| `subsidy_calculator_used` | シミュレーターでプラン or 受講人数を変更したとき (600 ms デバウンス) |
| `contact_form_submit` | 問い合わせフォーム送信成功時 |

### 6. 動作確認方法

- **GA4 リアルタイム**: 管理画面 →「レポート」→「リアルタイム」で `cta_click` などが流れてくるか確認
- **GA4 DebugView**: Chrome 拡張「Google Analytics Debugger」を有効化 → 同管理画面の「DebugView」
- **Clarity ライブビュー**: Clarity ダッシュボード →「Live」タブで自分のセッションがリアルタイムに記録されるか確認
- **DevTools**: ブラウザの Network タブで `googletagmanager.com/gtag/js`, `clarity.ms/tag/...` のリクエストが飛んでいることを確認

### プライバシー配慮

`<Input>` の `data-clarity-mask="True"` 属性で、Clarity セッションリプレイ上で「会社名・お名前・メール・電話番号」の入力値が `***` でマスクされます。

> Cookie 同意バナー (CMP) は本リリースでは未導入です。GDPR / 改正電気通信事業法に準拠する CMP は別途追加予定。

## デプロイ

Vercel (`hnd1` リージョン)。本番 URL: <https://mf-akademia-lp.vercel.app>

```bash
vercel --prod    # 本番
vercel           # Preview
```

その他の環境変数 (`GOOGLE_CHAT_WEBHOOK_URL` / `RESEND_API_KEY` 等) は `CLAUDE.md` を参照。
