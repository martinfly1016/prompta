# SEO 优化快速参考指南

## 优化优先级矩阵

```
优先级          工作量        影响力        建议
─────────────────────────────────────────────────────
🔴 高优先级    
├─ 动态元数据   1-2天        ★★★★★       立即开始
├─ JSON-LD      2-3天        ★★★★☆       立即开始
├─ Image组件    2-3天        ★★★★☆       立即开始
└─ Sitemap优化  1天          ★★★☆☆       本周完成

🟡 中优先级
├─ 404页面      0.5天        ★★☆☆☆       本周完成
├─ robots.txt   0.5天        ★★☆☆☆       本周完成
├─ 相关推荐     2-3天        ★★★☆☆       本月完成
└─ rel=prev/next 1天         ★★☆☆☆       本月完成

🟢 低优先级
├─ 锚文本优化   2天          ★☆☆☆☆       可选
├─ ISR缓存      2-3天        ★★★☆☆       可选
└─ OG图片优化   1天          ★★☆☆☆       可选
```

## 核心检查清单

### 元数据和标题
- [x] 首页标题 - 37字符，包含关键词
- [x] Meta Description - 61字符，包含价值主张
- [x] Open Graph 标签 - 完整配置
- [x] Robots 标签 - 正确配置
- [ ] **动态页面元数据 - 需要实施** 🔴
  - [ ] /prompt/[id] - 使用提示词标题和描述
  - [ ] /category/[slug] - 使用类别信息
  - [ ] /tag/[slug] - 使用标签名称

### 内容和结构
- [x] H1 标题 - 只有一个，合理使用
- [x] 标题层级 - H1 → H2 → H3 正确
- [ ] **结构化数据 - 需要实施** 🔴
  - [ ] Organization Schema
  - [ ] CreativeWork Schema（提示词）
  - [ ] BreadcrumbList Schema
  - [ ] CollectionPage Schema

### 技术 SEO
- [x] robots.txt - 基础配置完整
- [x] Sitemap - 动态生成正确
- [ ] **Sitemap 分割 - 需要优化** 🟡
  - [ ] sitemap-categories.ts
  - [ ] sitemap-tags.ts
  - [ ] 主 sitemap 指向子文件
- [ ] **404 页面 - 需要创建** 🟡
- [x] 移动端响应式 - 完善

### 性能优化
- [x] 延迟加载 - 已实施 loading="lazy"
- [ ] **Next.js Image 组件 - 需要替换** 🔴
  - [ ] /src/app/page.tsx
  - [ ] /src/app/prompt/[id]/page.tsx
  - [ ] /src/app/category/[slug]/page.tsx
  - [ ] /src/app/tag/[slug]/page.tsx
  - [ ] /src/components/ImageGallery.tsx
  - [ ] 添加 priority、sizes、quality 属性
- [x] CSS 压缩 - swcMinify 启用
- [x] JavaScript 压缩 - compress 启用
- [x] 字体优化 - display=swap 配置

### 链接结构
- [x] 内部链接清晰 - 导航结构好
- [x] 没有明显死链
- [ ] **相关推荐链接 - 建议添加** 🟡
- [ ] **rel=prev/next - 分页优化** 🟡
- [ ] **锚文本优化 - 可改进** 🟢

---

## 快速实施路线图

### 第1天 - 最小可行改进
```
时间分配: 2-3小时
任务:
1. 创建 404 页面 (15分钟)
2. 改进 robots.txt (15分钟)
3. 开始动态元数据工作 (1.5小时)

预期效果: +10% 基础 SEO
```

### 第2-3天 - 完成动态元数据
```
时间分配: 4-5小时
任务:
1. /prompt/[id] generateMetadata (1小时)
2. /category/[slug] generateMetadata (45分钟)
3. /tag/[slug] generateMetadata (45分钟)
4. 测试和验证 (1.5小时)

预期效果: +40% 搜索流量提升
```

### 第2周 - 结构化数据和 Sitemap
```
时间分配: 6-7小时
任务:
1. 创建 schema.ts (1.5小时)
2. 在所有页面添加 JSON-LD (2小时)
3. 创建 sitemap-categories.ts (1小时)
4. 创建 sitemap-tags.ts (1小时)
5. 测试 Schema 有效性 (1小时)

预期效果: +20-30% 展示增强
```

### 第3周 - 性能优化
```
时间分配: 6-8小时
任务:
1. Image 组件基础改造 (3小时)
2. 添加 priority 和 sizes (2小时)
3. 性能测试和优化 (2-3小时)

预期效果: +30% 页面加载速度
```

---

## 关键代码片段

### 1. 简单的 generateMetadata 模板

```typescript
import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  
  try {
    const data = await fetch(`${baseUrl}/api/resource/${id}`).then(r => r.json())
    
    return {
      title: `${data.title} | 网站名称`,
      description: data.description,
      openGraph: {
        title: data.title,
        description: data.description,
        type: 'article',
        images: [{ url: data.image, width: 1200, height: 630 }],
      }
    }
  } catch {
    return { title: 'Error' }
  }
}
```

### 2. Schema.org 基础模板

```typescript
// 在 JSX 中添加:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": data.title,
      "description": data.description,
    })
  }}
/>
```

### 3. Image 组件基础迁移

```tsx
// 从:
<img src={url} alt={title} loading="lazy" />

// 改为:
import Image from 'next/image'

<Image
  src={url}
  alt={title}
  width={400}
  height={300}
  priority={index === 0}
  sizes="(max-width: 640px) 100vw, 50vw"
  quality={80}
/>
```

---

## 性能基准

| 指标 | 当前 | 目标 | 改进方法 |
|------|------|------|--------|
| LCP | ~2.5s | <2.0s | Image + ISR |
| FID | ~100ms | <100ms | Code splitting |
| CLS | ~0.1 | <0.1 | Image sizing |
| First Byte | ~800ms | <500ms | ISR |

---

## 验证工具

### 在线工具
1. **Google Search Console** - https://search.google.com/search-console
   - 检查索引状态
   - 监控搜索性能
   - 提交 sitemap

2. **Google PageSpeed Insights** - https://pagespeed.web.dev/
   - 性能审计
   - Core Web Vitals

3. **Schema.org Validator** - https://validator.schema.org/
   - 验证 JSON-LD 有效性

4. **Open Graph Debugger** - https://developers.facebook.com/tools/debug/og/object
   - 预览社交分享效果

### 本地验证
```bash
# 检查元数据
curl -s http://localhost:3000/prompt/[id] | grep -o '<meta[^>]*>'

# 检查 Schema（查看页面源代码中的 script 标签）
curl -s http://localhost:3000/prompt/[id] | grep 'application/ld+json'

# 检查 Sitemap
curl -s http://localhost:3000/sitemap.xml
```

---

## 常见陷阱和解决方案

| 问题 | 症状 | 解决方案 |
|------|------|--------|
| 动态元数据未生成 | 所有页面标题相同 | 检查 generateMetadata 是否正确导出 |
| Image 加载异常 | 图片显示混乱 | 添加 width/height 属性 |
| Schema 验证失败 | JSON-LD 无效 | 检查 JSON 格式，使用验证工具 |
| Sitemap 过大 | 爬虫无法处理 | 分割为多个文件 (<50MB) |
| 性能下降 | LCP 增加 | 首屏图片加 priority 属性 |

---

## 投资回报率 (ROI) 预测

### 实施成本
- 开发时间: 15-20小时
- 成本: ~$300-500 (按 $20-25/小时计)

### 预期收益 (6个月)
- 搜索流量增加: 40-60%
- 点击率提升: +20-30% (Rich snippets)
- 用户停留时间: +15-20% (相关推荐)
- 转化率提升: +10-15% (更好的用户体验)

### 总 ROI
- 流量价值: 按 CPC $1-5 计算，增加流量价值 $5,000-20,000/月
- ROI: 1000-4000% (首月)

---

## 维护清单 (定期检查)

### 每周
- [ ] 检查 Google Search Console 错误
- [ ] 监控核心网页指标

### 每月
- [ ] 审查新增/删除的页面
- [ ] 检查死链
- [ ] 监控排名变化

### 每季度
- [ ] 完整 SEO 审计
- [ ] 竞争对手分析
- [ ] 更新关键词策略

---

## 资源链接

- [Next.js SEO 最佳实践](https://nextjs.org/learn-nextjs/seo)
- [Google 搜索中心](https://developers.google.com/search)
- [Schema.org 文档](https://schema.org)
- [Core Web Vitals 指南](https://web.dev/vitals/)

