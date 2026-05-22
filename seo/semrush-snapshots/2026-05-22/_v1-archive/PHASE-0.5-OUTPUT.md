# Phase 0.5 — ROI 優先度分析 (2026-05-22)

`/collect-content` Phase 0.5.3 consume の出力（手動トリガー / 月度初回）。
本ファイルは snapshot 同梱 — 将来の会話 / 監査 / diff 用にバージョン管理。

## Source

- **Snapshot**: `seo/semrush-snapshots/2026-05-22/`
- **Input**: 148 keywords (50 GSC top 28d + 37 watch + 76 seed combinatorial)
- **Agent reality**: SEMrush proxy rate-limited → 6 pages scraped → 11/148 keyword universe metrics, 4×30 = 120 gaps, 11 topic clusters, 34 prompta organic kw
- **Schema fix applied**: `domain-rankings.json` unwrapped from `data[0]` to flat root（agent 笔误修正、brief 通り）

## 解读 TL;DR

prompta は SD 系プロンプト集として **現在 top 5-14 で 7 ページ rank in、月 traffic 152**。
SEMrush content-gap / topic-clusters の両方が「Stable Diffusion プロンプト」cluster
（vol 38.6K, KD 20, 4 競品全占）を **prompta 未取得の最大機会** として一致指摘。
低リスク × 既存 asset 拡張で取れる。

## P0 — 即時実行候補（次 2 週間）

| # | アクション | 信号 | Vol | KD | prompta 現状 | 推定工数 |
|---|---|---|---|---|---|---|
| 1 | **扩 `/guides/stable-diffusion-prompt-guide`** | content-gap × 5 + cluster none × 4 競品 | 18.5K | 11-31 | 未 top100 | 2h |
| 2 | **新建 `/guides/lora-explainer`** | content-gap #2 | 14.8K | 30 | 完全無し | 3h |
| 3 | **扩 `/guides/what-is-prompt`** | universe + rankings | 60.5K（プロンプト）| 39 | pos 53 → 20 余地 | 2h |

## P1 — 中期計画（次 4-8 週間）

| # | アクション | 信号 | Vol | KD | prompta 現状 |
|---|---|---|---|---|---|
| 4 | 扩 Midjourney guide（thin → 3500字+）| cluster thin | 1.3K | 23 | pos 33 |
| 5 | 新建 AI 画像生成 アニメ guide | cluster partial × 3 競品 | 32.6K | 24 | partial |
| 6 | "pixai vs main tools" 比較 guide | content-gap #1 | 246K | 44 | None |

## P2 — 既存強み守護（traffic source 保護）

prompta の現在 **152 月 traffic** の主因。意外な変更で失うリスクを避ける：

| URL | pos | Vol | Traffic/月 |
|---|---|---|---|
| /prompts/anime | 4 | 110 | 7 |
| /guides/body-type-prompt-guide | 5 | 720 | 36 |
| /guides/cosplay-prompt-guide | 5 | 590 | 29 |
| /prompts/cosplay | 7 | 720 | 18 |
| /prompts/body-type | 7 | 390 | 15 |
| /prompts/color | 9 | 390 | 11 |
| /prompts/clothing | 14 | 1300 | 3 |

## 🚫 SEMrush 推奨だが行わない理由

- **NSFW**（エロ / アダルト / 立ちバック / 服を脱がす ...）→ Brand risk
- **ゲーム特化**（ff11 装備 / キャラクターコード）→ Off-strategy
- **単一ブランド直撃**（pixai / kling ai / playground アプリ）→ ranking 不可、迂回コンテンツのみ可

## `/collect-content` への具体提案

**Next run の推奨設定**:

```bash
/collect-content --source=lexica --target=15
# 期待される主題重点:
#   stable-diffusion × {hairstyle, clothing, body-type, color, cosplay}
```

理由:
- SEMrush は SD 系プロンプト需要が突出と検出（cluster 4 競品全占）
- 上記 5 category は既に prompta pos 5-14 で実績あり、追加プロンプトで「コンテンツ深度」シグナル
- ❌ photo-edit / programming / business / education は **今回の snapshot で強い信号なし**、後回し

## Anomaly / Warnings

- ⚠️ keyword-universe.json: **148 中 11 件のみ metrics**（7.4%）。agent 自陳の rate-limit が原因
  - 改善案: 来月 snapshot 時は agent に「per-keyword API（phrase_kdi / phrase_this）を 30 件ずつバッチで」と明示
- ⚠️ domain-rankings.json: brief 通りの flat schema ではなく `data[0]` ラップで届いた。本ファイル commit 時に修正済み
  - 改善案: brief セクション 5 にスキーマ例の具体形を 1 行追記する手も
- ✅ content-gap.json + topic-clusters.json: 期待通り、品質高

## Diff vs 前回 snapshot

なし（初回 snapshot）。次月以降は前回フォルダと自動 diff し新規/消失/順位変動を本セクションに記載。

---

> **次回 Phase 0.5 自動トリガー予定**: 30 日後（2026-06-21 頃）の `/collect-content` 起動時。
> ただし P0 作業前に `/collect-content` を回す予定なら本 snapshot で十分（age=0d）。
