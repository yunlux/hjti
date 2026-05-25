# HJTI

HJTI, Hybrid Jungian Type Indicator, is a browser-only personality test app that combines Jungian cognitive functions, MBTI-style type inference, Sakinorva-inspired multi-algorithm output, Totypes-inspired function-axis comparison, and a light Big Five calibration layer.

Current public release: **HJTI-64 Preview**

Live site: [https://hjti8.vercel.app](https://hjti8.vercel.app)

> HJTI is not official MBTI, not a clinical psychological assessment, and not suitable for hiring, diagnosis, medical decisions, or major life decisions. It is an original self-exploration and discussion tool.

## Features

- 64 original Chinese questions for the MVP release.
- Two question types:
  - Likert statements, scored from 1 to 5.
  - Bipolar preference questions, also scored from 1 to 5.
- Eight Jungian function scores:
  - `Ne`, `Ni`, `Se`, `Si`, `Te`, `Ti`, `Fe`, `Fi`
- Big Five auxiliary scores:
  - `O`, `C`, `E`, `A`, `N`
- Multiple type inference layers:
  - direct four-letter preference algorithm
  - function stack algorithm
  - prototype similarity algorithm
  - final weighted fusion
- Top 3 type ranking with confidence level.
- Radar chart and bar chart for eight-function results.
- localStorage persistence for answers and test progress.
- Privacy-first: no backend, no database, no uploaded answers.

## Tech Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- Recharts
- lucide-react
- Vercel

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Run checks:

```bash
npm run lint
npm run build
```

## Project Structure

```text
src/
  app/
    page.tsx
    test/page.tsx
    result/page.tsx
    methodology/page.tsx
    privacy/page.tsx
    layout.tsx
    globals.css

  components/
    QuestionCard.tsx
    OptionScale.tsx
    ProgressBar.tsx
    ResultHeader.tsx
    TypeRanking.tsx
    FunctionRadarChart.tsx
    FunctionBarChart.tsx
    LetterPreferenceBars.tsx
    BigFivePanel.tsx

  data/
    questions.ts
    stacks.ts
    prototypes.ts
    typeDescriptions.ts
    functionDescriptions.ts

  lib/
    types.ts
    scoring.ts
    storage.ts
    format.ts
```

## Scoring Overview

The scoring logic lives in `src/lib/scoring.ts`.

### Raw Scores

Likert questions use:

```ts
delta = answer - 3
score[target.key] += delta * polarity * weight
```

Bipolar questions use:

```ts
leftDelta = 3 - answer
rightDelta = answer - 3

score[left.key] += leftDelta * left.weight
score[right.key] += rightDelta * right.weight
```

### Normalization

Each function and Big Five dimension is normalized to `0-100` using the theoretical min and max range calculated from the question bank. This avoids assuming that every dimension has the same number of questions or total weight.

### Type Algorithms

HJTI combines four scoring layers:

```ts
finalScore =
  0.40 * prototypeScore
+ 0.30 * stackScore
+ 0.20 * letterCompatibilityScore
+ 0.10 * bigFivePrior
```

The final result returns:

- primary type
- Top 3 type candidates
- confidence label
- completion percentage
- eight-function ranking
- four-letter preference bars
- Big Five auxiliary scores
- dynamic explanation text

## Data Privacy

HJTI does not collect answers or user data.

Answers are saved only in the browser:

```ts
hjti_answers_v1
hjti_current_index_v1
```

Clearing browser site data or clicking the app's restart action removes the saved answers.

## Deployment

The app is intended for Vercel.

Important Vercel settings:

```text
Framework Preset: Next.js
Build Command: npm run build
Output Directory: Next.js default
Install Command: npm install
Root Directory: .
Production Branch: main
```

If Vercel shows the deployment as `Ready` but the site returns 404, check that the Framework Preset is not set to `Other`. A Next.js App Router project needs the Next.js preset so Vercel publishes the correct build output.

Deploy manually:

```bash
npx vercel@latest deploy --prod
```

## Roadmap

- Expand from 64 questions to the full 128-question edition.
- Add deeper result interpretation by function pairs and stack tension.
- Add optional share image or printable summary.
- Add a lightweight test consistency report.
- Add English localization after the Chinese MVP stabilizes.

## Disclaimer

HJTI is an unofficial, original, entertainment and self-reflection model. It is not affiliated with the Myers-Briggs Type Indicator, The Myers-Briggs Company, Sakinorva, Totypes, or 16Personalities. It must not be used for clinical assessment, hiring, medical evaluation, diagnosis, or major life decisions.
