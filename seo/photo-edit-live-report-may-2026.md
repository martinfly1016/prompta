# Style-Test-Live 报告 — photo-edit 真实渲染（2026-05 ロット）

> 渲染日期：2026-05-04
> 模型：gemini-2.5-flash-image (Nano Banana)
> 输出目录：seo/style-test-samples/output/photo-edit-may-2026
> 渲染条数：5（API 成功 5 / API 失败 0）
> 视觉评估：3 PASS / 1 PARTIAL / 1 FAIL

## 渲染結果（API レイヤー）

| Slug | 工具 | 源照片 | 输出 | 耗时 | API |
|---|---|---|---|---:|---|
| `photo-auto-enhance-vivid` | gemini | `seo/style-test-samples/source/portrait-default.jpg` | [photo-auto-enhance-vivid.png](style-test-samples/output/photo-edit-may-2026/photo-auto-enhance-vivid.png) | 11544ms | OK |
| `hairstyle-grid-9-variations` | gemini | `seo/style-test-samples/source/portrait-long-hair.jpg` | [hairstyle-grid-9-variations.png](style-test-samples/output/photo-edit-may-2026/hairstyle-grid-9-variations.png) | 13173ms | OK |
| `pose-correct-face-forward` | gemini | `seo/style-test-samples/source/portrait-casual-outfit.jpg` | [pose-correct-face-forward.png](style-test-samples/output/photo-edit-may-2026/pose-correct-face-forward.png) | 10145ms | OK |
| `id-photo-asia-2-inch-blue` | gemini | `seo/style-test-samples/source/casual-portrait.jpg` | [id-photo-asia-2-inch-blue.png](style-test-samples/output/photo-edit-may-2026/id-photo-asia-2-inch-blue.png) | 11637ms | OK |
| `era-transform-1970s-classic` | gemini | `seo/style-test-samples/source/portrait-default.jpg` | [era-transform-1970s-classic.png](style-test-samples/output/photo-edit-may-2026/era-transform-1970s-classic.png) | 10837ms | OK |

## 三軸ビジュアル評価

判定基準：
- **意図達成度**：プロンプトが要求した編集が実際に発生したか
- **R2 保持**：identity / pose / 既存属性（性別・年齢・服装の主要要素）は維持されたか
- **R5 防呆**：過剰加工・偽情報・人工的アーティファクトを回避したか

| Slug | 意図達成度 | R2 保持 | R5 防呆 | 判定 |
|---|---|---|---|---|
| `photo-auto-enhance-vivid` | ◎ | ◎ | ◎ | **PASS** |
| `hairstyle-grid-9-variations` | ◎ | ○ | ◎ | **PASS** |
| `pose-correct-face-forward` | ◎ | ○ | ○ | **PASS** |
| `id-photo-asia-2-inch-blue` | ◎ | ○ | ◎ | **PASS** |
| `era-transform-1970s-classic` | ◎ | ✕ | ○ | **FAIL** |

凡例：◎=完全達成 / ○=概ね達成（軽微な副作用あり）/ △=部分的 / ✕=失敗

---

## Before / After 対照 + 詳細評価

### photo-auto-enhance-vivid — **PASS**

**Title**：AI 写真自動補正 - コントラスト+発色強化

| Before | After |
|---|---|
| ![before](style-test-samples/source/portrait-default.jpg) | ![after](style-test-samples/output/photo-edit-may-2026/photo-auto-enhance-vivid.png) |

- **意図達成度（◎）**：コントラスト・彩度が控えめに引き上がり、肌のツヤと髪の艶感が向上。「自然な発色強化」のレンジに収まっている。
- **R2 保持（◎）**：顔立ち・髪型・服装・構図・背景（白壁＋光のグラデ）すべて維持。identity 完全保持。
- **R5 防呆（◎）**：過度な彩度上げ・白とび・プラスチック肌は無し。SNS で「加工しました」と分かるレベルではなく自然増強。

### hairstyle-grid-9-variations — **PASS**

**Title**：髪型バリエーション 9マスグリッド - AI 試着シミュレーター

| Before | After |
|---|---|
| ![before](style-test-samples/source/portrait-long-hair.jpg) | ![after](style-test-samples/output/photo-edit-may-2026/hairstyle-grid-9-variations.png) |

- **意図達成度（◎）**：3×3 = 9マスのグリッドが正確に出力。9種類の異なる髪型（前髪ボブ／カール／ストレートロング／編み込み／ミディ前髪／ストレート／ベリーショート／お団子／ロング）が判別可能。
- **R2 保持（○）**：白T＋灰背景は全マス共通でフォーマット OK。顔は概ね同一人物だが、左上のボブと右下のロングは輪郭・年齢感がやや別人寄り（7/9 が安全）。
- **R5 防呆（◎）**：合成感・コラージュ感は薄く、グリッド枠も自然。各カットで照明一貫。

### pose-correct-face-forward — **PASS**

**Title**：顔写真ポーズ修正 - 正面向き調整プロンプト

| Before | After |
|---|---|
| ![before](style-test-samples/source/portrait-casual-outfit.jpg) | ![after](style-test-samples/output/photo-edit-may-2026/pose-correct-face-forward.png) |

- **意図達成度（◎）**：3/4 斜め立ちから真正面・両肩水平・両腕自然降ろしに完全修正。証明写真や プロフィール写真として使える品質。
- **R2 保持（○）**：パーカー（オフホワイト）・ジーンズ・髪型・顔立ち維持。背景は白からニュートラルグレーに変化したが、ポーズ修正の副作用として許容範囲。
- **R5 防呆（○）**：手・指の破綻なし。服のシワや影も自然。輪郭の縫い目感も無し。

### id-photo-asia-2-inch-blue — **PASS**

**Title**：アジア 2インチ証明写真 - 青背景 AI プロンプト

| Before | After |
|---|---|
| ![before](style-test-samples/source/casual-portrait.jpg) | ![after](style-test-samples/output/photo-edit-may-2026/id-photo-asia-2-inch-blue.png) |

- **意図達成度（◎）**：背景は仕様通りの単色ブルー（中明度のセイフティブルー帯）、灰Tから黒スーツ＋白シャツへ着替え、正面・左右対称、頭部位置・余白も中国式 2 寸証明写真の規格相当。
- **R2 保持（○）**：顔立ち・髪型・性別・年齢感を維持。服装変更は証明写真用途で必要な改変であり、規約上想定内。
- **R5 防呆（◎）**：耳・襟・髪のエッジに切り抜き痕や白フリンジ無し。肌のレタッチも控えめで写真館品質。

### era-transform-1970s-classic — **FAIL**

**Title**：1970年代変身 AI 写真 - レトロ風自分プロンプト

| Before | After |
|---|---|
| ![before](style-test-samples/source/portrait-default.jpg) | ![after](style-test-samples/output/photo-edit-may-2026/era-transform-1970s-classic.png) |

- **意図達成度（◎）**：1970s シグネチャ要素（フェザーカール／口髭／デニムジャケット＋ハイネック／カリフォルニア・パームツリー／フィルム調アンバートーン）が完璧に再現。スタイル指示は強く効いている。
- **R2 保持（✕）**：**重大な identity 喪失**。Before は短〜セミロングのアジア人女性、After は口髭のある男性に変換されており、性別が反転。年齢・骨格も別人。「自分の 1970s 版」プロンプトが「別人化」に転落。
- **R5 防呆（○）**：画像自体の質感（フィルムグレイン・色温度・粒子）は時代再現として自然で過剰加工感は無い。
- **対応案**：プロンプトに「**性別・骨格・人種を厳格に保持**」「only swap clothing, hair texture and background — keep facial geometry intact」を強制する R2 加筆が必要。SKILL.md の era-transform 系テンプレに reverse-bumper（"do not change gender / age / face shape"）を必須化する。

---

## 失敗・課題の集約

| 課題 | 該当 slug | 推奨アクション |
|---|---|---|
| 大幅スタイル変換時の性別変更 | `era-transform-1970s-classic` | プロンプトに性別保持の強制句を追加し再渲染 |
| グリッド内 2 マスで顔のばらつき | `hairstyle-grid-9-variations` | 「すべてのマスで同一人物の顔」を明示する文言を追加（軽微） |
| 背景の意図しない変更 | `pose-correct-face-forward` | 「背景はそのまま保持」明記で抑制可能（軽微） |

## 総合サマリー

**API 成功率：5/5（100%）**
**ビジュアル評価：4/5 PASS（うち 3 件は ◎ 級、1 件は軽微な副作用付き PASS）/ 1 FAIL**

- ✅ **PASS**：`photo-auto-enhance-vivid` / `hairstyle-grid-9-variations` / `pose-correct-face-forward` / `id-photo-asia-2-inch-blue`
  → 詳細ページの「効果サンプル」セクションに即時掲載候補
- ❌ **FAIL**：`era-transform-1970s-classic`
  → プロンプト本文に性別・骨格保持の reverse-bumper 句を追加し再渲染。修正前は本番掲載しないこと

## 下一步建议

1. 4 件の PASS 条目を `Prompt.sampleBeforeUrl` / `sampleAfterUrl` に登録（Vercel Blob 経由）し、詳細页「効果サンプル」セクションを公開
2. `era-transform-1970s-classic` のプロンプト改修：R2 セクションに「保持：被写体の性別・年齢・骨格・人種は厳格に維持。服装・髪型・髪質・背景・色調のみ変更可」を明示
3. SKILL.md（photo-edit）の R2 ルールに「era-transform / decade-shift / age-progression 系では性別保持を必須化」を追記
4. 改修後の `era-transform-1970s-classic` を style-test-live で再走、PASS 確認後に本番掲載
