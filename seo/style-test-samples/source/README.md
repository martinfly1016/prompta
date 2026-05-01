# style-test-live 源照片库

放置 photo-edit prompt 真实渲染测试需要的人像源照片。所有照片**仅在本机使用**，不入库不上线。

## 推荐照片清单

| 文件名 | 用途 | 推荐来源 |
|---|---|---|
| `portrait-default.jpg` | 通用 fallback | Unsplash CC0 portrait |
| `vintage-bw.jpg` | colorize 类（黑白上色） | Unsplash 历史照片 / 自家老照片 |
| `group-photo.jpg` | bystanders 类（不要物除去） | 多人合影 |
| `casual-portrait.jpg` | passport / linkedin 类 | 半身正面照 |
| `portrait-cluttered-bg.jpg` | background-removal / background-replace 类 | 室内杂乱背景的人像 |
| `portrait-casual-outfit.jpg` | outfit-swap 类 | 便装半身照 |
| `portrait-long-hair.jpg` | hairstyle 类 | 长发人像 |
| `portrait-neutral-face.jpg` | expression 类 | 无表情正面照 |
| `portrait-skin-detail.jpg` | skin-retouching 类 | 近脸特写、有真实毛孔/瑕疵 |

## 注意

- 推荐尺寸 ≥ 1024×1024，JPEG/PNG/WebP 均可
- 避免商业肖像 / 第三方版权 — 用 Unsplash / Pexels / 自有照片
- `seo/style-test-samples/source/*.jpg` 已在 `.gitignore` 行为内（仅 `*.md` 入版本控制）

## 添加新映射

1. 把照片丢到 `seo/style-test-samples/source/` 下
2. 编辑 `seo/style-test-samples/source-manifest.json`：
   - 新 useCase 关键词 → 加到 `byUseCase`
   - 特定 slug 单独映射 → 加到 `bySlug`
