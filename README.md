# HJTI

**HJTI** stands for **Hybrid Jungian Type Indicator**.

中文名可以理解为：**混合荣格类型指标**。

它是一个人格测试网站，核心目标是把“荣格八维认知功能”讲清楚、测出来，并用多套算法辅助推断 MBTI 风格的类型结果。当前线上版本是 **HJTI-64 Preview**，也就是 64 题预览版。

Vercel 页面：

[https://hjti8.vercel.app](https://hjti8.vercel.app)

## HJTI 是什么

HJTI 是一个原创的人格类型测试项目。它不是官方 MBTI，也不是 16Personalities、Sakinorva 或 Totypes 的复刻版本。

这个项目试图回答一个更细的问题：

> 如果不只看四个字母，而是先观察一个人的八个认知功能强弱，会得到怎样的类型画像？

因此，HJTI 不只是输出一个 `INTP`、`ENFP` 或 `INFJ` 这样的标签。它会同时展示：

- 八维功能分数；
- 八维功能排序；
- MBTI 风格四字母倾向；
- Top 3 类型候选；
- 类型置信度；
- Big Five 辅助分数；
- 动态解释文本。

换句话说，HJTI 更像是一个“认知偏好画像工具”，而不是一个只给单一答案的性格标签生成器。

## HJTI 这个名字是什么意思

HJTI 的全称是：

```text
Hybrid Jungian Type Indicator
```

其中：

- **Hybrid** 表示混合模型。项目不是只依赖一种算法，而是融合八维功能、四字母倾向、功能栈、原型相似度和 Big Five 弱校准。
- **Jungian** 表示荣格取向。项目以荣格认知功能理论为核心，而不是只从外向/内向这类表层维度开始。
- **Type** 表示类型推断。最终结果仍然会映射到 16 种 MBTI 风格类型，方便理解和讨论。
- **Indicator** 表示指标。结果是一组偏好指标，不是诊断结论，也不是固定身份。

所以，HJTI 的含义可以概括为：

> 一个基于荣格八维、使用混合算法推断人格类型倾向的指标系统。

## 为什么做这个项目

很多人格测试会直接给出一个四字母类型，但用户很难知道：

- 这个类型是怎么来的；
- 自己的主导功能和辅助功能是什么；
- 第二候选类型为什么也接近；
- 结果到底稳定不稳定；
- 四字母和八维功能是否一致；
- 这个结果应该如何解释，而不是如何迷信。

HJTI 的设计目标是让结果更透明。

它不会只告诉你“你是某某类型”，而是尽量展示推断过程中的中间层：

```text
题目回答
→ 八维功能分数
→ 四字母倾向
→ 功能栈匹配
→ 原型相似度
→ Big Five 弱校准
→ Top 3 类型候选
→ 置信度和解释
```

这样用户可以看到自己的结果为什么会落到某个类型，也能看见结果边界是否模糊。

## 当前版本：HJTI-64 Preview

当前版本是一个 64 题 MVP / Preview 版本。

题库结构：

```text
八维功能题：48 题
Big Five 辅助题：10 题
校准 / 反向 / 一致性题：6 题
总计：64 题
```

后续目标是扩展为 128 题标准版：

```text
八维功能题：96 题
Big Five 辅助题：20 题
校准题：12 题
总计：128 题
```

首版先做 64 题，是为了优先跑通完整网站流程、评分算法、结果展示和部署，而不是一开始把时间全部花在题库规模上。

## 测试测什么

HJTI 主要测八个荣格认知功能。

### Ne：外倾直觉

关注可能性、联想、新奇方向、开放式探索。

### Ni：内倾直觉

关注趋势、象征、长期图景、核心洞察。

### Se：外倾感觉

关注当下现实、身体反应、现场行动、即时体验。

### Si：内倾感觉

关注经验参照、细节记忆、稳定秩序、身体内感。

### Te：外倾思维

关注目标、效率、外部标准、系统执行。

### Ti：内倾思维

关注定义、原理、逻辑一致性、分类建模。

### Fe：外倾情感

关注群体气氛、关系协调、外部情绪反馈、社会表达。

### Fi：内倾情感

关注真实感、个人价值、身份边界、内在道德。

## 结果怎么看

HJTI 的结果页不只显示一个类型。

它会显示：

- 你的主类型；
- Top 3 候选类型；
- 每个候选类型的相对分数；
- 置信度；
- 八维雷达图；
- 八维排序条形图；
- E/I、N/S、T/F、J/P 倾向；
- Big Five 辅助分数；
- 类型说明、优势、风险和发展建议。

如果第一和第二候选差距很小，HJTI 会提示用户不要过度相信单一四字母标签，而应该结合八维排序理解自己的类型边界。

## 算法思路

HJTI 使用多层算法，而不是单一打分。

### 1. 八维原始分

每道题会对某个功能或 Big Five 维度产生贡献。

Likert 题使用：

```ts
delta = answer - 3
score[target.key] += delta * polarity * weight
```

Bipolar 题使用：

```ts
leftDelta = 3 - answer
rightDelta = answer - 3

score[left.key] += leftDelta * left.weight
score[right.key] += rightDelta * right.weight
```

### 2. 自动归一化

每个功能最终输出 `0-100`。

归一化不是简单假设每个功能满分相同，而是根据题库自动计算每个维度的理论最低分和最高分。这样题库以后扩展到 128 题时，算法仍然可以继续使用。

### 3. 四字母直接算法

根据八维分数推导：

```text
E / I
N / S
T / F
J / P
```

例如：

```text
E = Ne + Se + Te + Fe
I = Ni + Si + Ti + Fi
```

### 4. 功能栈算法

项目内置 16 型功能栈，例如：

```text
INTP = Ti - Ne - Si - Fe
ENFP = Ne - Fi - Te - Si
INTJ = Ni - Te - Fi - Se
```

算法会比较用户八维分数与各类型功能栈结构的贴合程度。

### 5. 原型相似度算法

每个类型都有一组八维原型向量。系统会计算用户八维向量与 16 型原型向量之间的 cosine similarity。

### 6. 最终融合

最终类型分数由四部分组成：

```ts
finalScore =
  0.40 * prototypeScore
+ 0.30 * stackScore
+ 0.20 * letterCompatibilityScore
+ 0.10 * bigFivePrior
```

Big Five 只作为弱校准，不会直接决定 MBTI 风格类型。

## 隐私与数据

HJTI 是纯前端应用。

当前版本不会：

- 上传答案；
- 保存服务器记录；
- 创建账号；
- 使用数据库；
- 把测试结果发送给第三方。

答案只保存在当前浏览器的 localStorage 中：

```text
hjti_answers_v1
hjti_current_index_v1
```

清除浏览器站点数据，或点击“重新测试”，即可清除本地答案。

## 适合谁

HJTI 适合：

- 对 MBTI、荣格八维、认知功能感兴趣的人；
- 想理解自己功能排序的人；
- 想比较 Top 3 类型候选的人；
- 想把人格类型作为自我观察材料的人；
- 想研究人格测试网站如何实现的开发者。

HJTI 不适合：

- 临床心理评估；
- 招聘筛选；
- 医疗诊断；
- 重大人生决策；
- 用类型给他人下定论。

## 当前项目状态

已完成：

- 首页；
- 测试页；
- 结果页；
- 方法论页；
- 隐私页；
- 64 题原创中文题库；
- 八维评分；
- Big Five 辅助评分；
- Top 3 类型输出；
- 结果图表；
- localStorage 自动保存；
- Vercel 部署。

## 技术栈

项目使用：

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Recharts
- lucide-react
- localStorage
- Vercel

核心文件：

```text
src/data/questions.ts          题库
src/data/stacks.ts             16 型功能栈
src/data/prototypes.ts         16 型原型向量
src/data/typeDescriptions.ts   类型描述
src/lib/scoring.ts             评分算法
src/lib/storage.ts             本地存储
src/lib/types.ts               类型定义
```

## 本地运行

```bash
npm install
npm run dev
```

打开：

```text
http://localhost:3000
```

检查：

```bash
npm run lint
npm run build
```

## Vercel 部署

推荐设置：

```text
Framework Preset: Next.js
Build Command: npm run build
Output Directory: Next.js default
Install Command: npm install
Root Directory: .
Production Branch: main
```

如果 Vercel 显示部署成功但访问是 404，优先检查 `Framework Preset` 是否被误设为 `Other`。

## 免责声明

HJTI 是原创的非官方人格模型实验项目。它不隶属于 MBTI、The Myers-Briggs Company、Sakinorva、Totypes 或 16Personalities，也不使用这些网站的商业题库原题。

HJTI 不是临床心理评估，不具备医疗、诊断、招聘或筛选用途。请把结果视为一种自我理解和讨论材料，而不是对个人能力、性格或人生方向的最终判定。
