# HJTI

**HJTI** 是 **Hybrid Jungian Type Indicator** 的缩写，中文可译为 **混合荣格类型指标**。它是一个以荣格八维认知功能为核心的人格测试网站，尝试把八维功能、MBTI 式四字母类型推断、多算法类型排序，以及 Big Five 的弱校准层整合到一个轻量、透明、纯前端的测试工具中。

当前公开版本为：

```text
HJTI-64 Preview
```

Vercel 页面：

[https://hjti8.vercel.app](https://hjti8.vercel.app)

> HJTI 不是官方 MBTI，也不是临床心理测评。它是一个原创的自我探索、讨论和娱乐工具，不应用于医疗、招聘、诊断、筛选或重大人生决策。

## 项目定位

HJTI 想解决的不是“给你贴一个绝对准确的标签”，而是提供一组更可读、更可讨论的认知偏好线索。

传统的四字母类型结果很容易让人只盯着 `INTP`、`ENFP` 这类标签，而忽略背后的功能结构。HJTI 的思路是：先把八个认知功能分别计分，再通过多套算法从不同角度推断类型，最后给出 Top 3 候选、置信度、八维排序、四字母倾向和 Big Five 辅助分数。

也就是说，HJTI 更重视：

- 你的功能强弱排序是什么；
- 为什么某个类型更接近你；
- 第二、第三候选为什么也接近；
- 四字母标签和八维功能之间是否一致；
- 结果边界是否清晰，还是存在混合倾向。

## 核心理念

HJTI 基于五个设计原则：

1. **八维优先**

   测试不直接从四字母开始，而是先计算 `Ne`、`Ni`、`Se`、`Si`、`Te`、`Ti`、`Fe`、`Fi` 八个功能的分数。

2. **多算法输出**

   单一算法很容易过度自信。HJTI 同时使用四字母直接算法、功能栈算法和原型相似度算法，再进行加权融合。

3. **结果不是单点标签**

   结果页显示 Top 3 类型，而不是只显示一个类型。若第一、第二候选差距较小，页面会提醒用户结合八维排序理解，而不是只看四字母。

4. **Big Five 只做弱校准**

   Big Five 不直接替代荣格功能或 MBTI 式类型。它只轻微影响部分边界判断，例如外向性影响 E/I，开放性影响 N/S，尽责性影响 J/P。

5. **隐私优先**

   当前版本没有后端、没有数据库、没有账号系统。所有答案只保存在浏览器本地 `localStorage` 中。

## 当前版本：HJTI-64 Preview

首个版本先做 64 题预览版，而不是一次性扩到 128 题。这样可以先验证完整流程、算法结构、结果展示和部署稳定性。

当前题库结构：

```text
八维功能题：8 个功能 × 6 题 = 48 题
Big Five 辅助题：5 个维度 × 2 题 = 10 题
校准 / 反向 / 一致性题：6 题
总计：64 题
```

未来计划扩展为：

```text
八维功能题：8 × 12 = 96 题
Big Five：5 × 4 = 20 题
校准题：12 题
总计：128 题
```

## 测试内容

HJTI 目前覆盖八个认知功能。

### Ne：外倾直觉

关注可能性扩散、新奇探索、联想跳跃和反常规假设。

### Ni：内倾直觉

关注模式收束、长期预感、象征理解和核心趋势洞察。

### Se：外倾感觉

关注当下感知、身体反应、即兴行动和刺激寻求。

### Si：内倾感觉

关注经验参照、细节记忆、稳定秩序和身体内感。

### Te：外倾思维

关注效率导向、目标管理、外部标准和系统执行。

### Ti：内倾思维

关注概念定义、内在逻辑、原理拆解和分类建模。

### Fe：外倾情感

关注气氛感知、关系协调、外部情绪反馈和社会表达。

### Fi：内倾情感

关注真实感、个人价值、身份边界和内在道德。

## 题型设计

HJTI 当前使用两类题型，所有题目都只使用 1-5 选项。

### 1. Likert 陈述题

用户根据一句陈述选择“非常不像我”到“非常像我”。

示例：

```text
我经常能从一个普通想法联想到许多不同可能性。
```

选项：

```text
1 = 非常不像我
2 = 不太像我
3 = 一般
4 = 比较像我
5 = 非常像我
```

### 2. Bipolar 双选倾向题

用户在 A / B 两种倾向之间选择更接近自己的描述。

示例：

```text
A：我更容易想到很多可能的发展方向。
B：我更容易看出一个最可能的核心趋势。
```

选项：

```text
1 = 明显更像 A
2 = 稍微更像 A
3 = 两者差不多
4 = 稍微更像 B
5 = 明显更像 B
```

双选题主要用于比较功能轴和常见张力，例如：

- `Ne` vs `Ni`
- `Se` vs `Si`
- `Te` vs `Ti`
- `Fe` vs `Fi`
- `Ne` vs `Si`
- `Ni` vs `Se`
- `Te` vs `Fi`
- `Fe` vs `Ti`

## 结果页会显示什么

完成测试后，HJTI 会给出一组组合结果：

- 最可能类型；
- 类型中文名和英文名；
- 置信度；
- 完成度；
- Top 3 类型候选；
- 八维功能雷达图；
- 八维功能排序条形图；
- E/I、N/S、T/F、J/P 四组倾向；
- Big Five 辅助分数；
- 类型解释；
- 动态结果说明；
- 重新测试；
- 复制结果摘要。

结果页不会把类型当成绝对诊断。比如当第一和第二候选很接近时，页面会提示：

```text
第一候选和第二候选差距较小，建议结合八维排序理解边界，而不是只看四字母标签。
```

## 算法结构

HJTI 的算法主要分为四层。

### 1. 八维原始分

每道题会根据目标维度、方向和权重贡献分数。

Likert 题：

```ts
delta = answer - 3
score[target.key] += delta * polarity * weight
```

Bipolar 题：

```ts
leftDelta = 3 - answer
rightDelta = answer - 3

score[left.key] += leftDelta * left.weight
score[right.key] += rightDelta * right.weight
```

### 2. 自动归一化

每个功能最终输出 `0-100` 分。

HJTI 不假设每个功能题目数量和权重完全相同，而是根据题库自动计算每个维度的理论最低分和最高分，再将原始分映射到 `0-100`。

这让题库未来扩展到 128 题时，不需要重写算法。

### 3. 三套类型算法

HJTI 使用三套类型推断算法：

```text
四字母直接算法
功能栈算法
原型相似度算法
```

四字母直接算法会把八维功能合并为：

```text
E = Ne + Se + Te + Fe
I = Ni + Si + Ti + Fi

N = Ne + Ni
S = Se + Si

T = Te + Ti
F = Fe + Fi

J = Te + Fe
P = Ne + Se
```

功能栈算法会比较用户分数与 16 型的功能栈结构是否接近。

原型相似度算法会为 16 型建立八维原型向量，并使用 cosine similarity 计算接近程度。

### 4. 最终融合

最终类型分数使用加权融合：

```ts
finalScore =
  0.40 * prototypeScore
+ 0.30 * stackScore
+ 0.20 * letterCompatibilityScore
+ 0.10 * bigFivePrior
```

置信度主要受以下因素影响：

- Top 1 与 Top 2 的分数差距；
- 完成度；
- 校准题和反向题的一致性。

## 隐私说明

HJTI 当前版本不收集用户数据。

它不会：

- 上传答案；
- 创建账号；
- 写入数据库；
- 追踪个人身份；
- 把结果发送给服务器。

答案只保存在当前浏览器的 localStorage：

```text
hjti_answers_v1
hjti_current_index_v1
```

如果你清除浏览器站点数据，或者点击应用内“重新测试”，本地答案就会被删除。

## 适合谁使用

HJTI 适合：

- 对荣格八维、MBTI 式类型或认知功能感兴趣的人；
- 想比较自己 Top 3 类型候选的人；
- 想看八维功能排序，而不是只看四字母标签的人；
- 想用结果进行自我观察、朋友讨论或创作设定的人；
- 想研究人格测试网站前端实现和评分结构的开发者。

HJTI 不适合：

- 临床诊断；
- 招聘筛选；
- 医疗评估；
- 亲密关系裁判；
- 重大人生决策；
- 任何需要严肃心理测量信效度保证的场景。

## 项目现状

当前已经完成：

- 首页；
- 测试页；
- 结果页；
- 方法论页；
- 隐私页；
- 64 题原创中文题库；
- 八维评分；
- Big Five 辅助评分；
- 四字母直接算法；
- 功能栈算法；
- 原型相似度算法；
- Top 3 类型输出；
- 结果图表；
- localStorage 保存进度；
- Vercel 部署。

## 路线图

后续可以继续扩展：

- 将题库扩展到 128 题；
- 增加更细的功能 facet 报告；
- 增加一致性/冲突提示；
- 增加英文版本；
- 增加结果分享图；
- 增加移动端交互细节优化；
- 增加题库版本号和结果版本追踪；
- 增加可选的本地导出 JSON。

## 技术实现

项目使用：

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Recharts
- lucide-react
- localStorage

核心代码位置：

```text
src/data/questions.ts          原创题库
src/data/stacks.ts             16 型功能栈
src/data/prototypes.ts         16 型八维原型向量
src/data/typeDescriptions.ts   类型解释
src/lib/scoring.ts             核心评分算法
src/lib/storage.ts             localStorage 读写
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

## Vercel 部署注意事项

Vercel 项目设置应为：

```text
Framework Preset: Next.js
Build Command: npm run build
Output Directory: Next.js default
Install Command: npm install
Root Directory: .
Production Branch: main
```

如果 Vercel 显示部署 `Ready`，但访问页面是 404，优先检查 `Framework Preset` 是否误设为 `Other`。

## 免责声明

HJTI 是一个原创的非官方人格模型实验项目。它不隶属于 MBTI、The Myers-Briggs Company、Sakinorva、Totypes 或 16Personalities，也不使用这些网站的商业题库原题。

HJTI 不是临床心理评估，不具备医疗、诊断、招聘或筛选用途。请把结果视为一种自我理解和讨论材料，而不是对个人能力、性格或人生方向的最终判定。
