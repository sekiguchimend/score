# 職場改善スコア予測システム 設計書

## 1. プロジェクト概要

### 1.1 目的
職場改善に関する各能力スコアに基づいて、ケース問題に対する回答を予測・表示するデモシステム。
スコアを動的に変更することで、回答内容がどのように変化するかをリアルタイムで確認できる。

### 1.2 対象スコア項目
- 問題把握力 (Problem Identification)
- 分析力 (Analysis)
- 解決策立案力 (Solution Design)
- 実行力 (Execution)
- コミュニケーション力 (Communication)

各スコア: 1.0 ～ 5.0 (0.5刻み)

---

## 2. システムアーキテクチャ

### 2.1 技術スタック
- **フレームワーク**: Next.js 14+ (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: React Hooks (useState, useEffect)
- **データ形式**: JSON
- **デプロイ**: Vercel (推奨)

### 2.2 ディレクトリ構造
```
score/
├── app/
│   ├── page.tsx                    # メインページ
│   ├── layout.tsx                  # レイアウト
│   └── globals.css                 # グローバルCSS
├── components/
│   ├── ScoreSlider.tsx             # スコア調整スライダー
│   ├── CaseSelector.tsx            # ケース選択UI
│   ├── ResponsePredictor.tsx       # 回答予測表示
│   ├── ScoreRadarChart.tsx         # レーダーチャート (オプション)
│   └── ComparisonView.tsx          # スコア変更前後比較
├── data/
│   ├── cases.json                  # ケース問題データ
│   ├── responsePatterns.json       # 回答パターンデータ
│   └── scoreMappings.json          # スコアと回答の紐付けルール
├── lib/
│   ├── responsePredictor.ts        # 回答予測ロジック
│   ├── scoreCalculator.ts          # スコア計算ロジック
│   └── types.ts                    # 型定義
└── public/
    └── examples/                   # サンプル画像など
```

---

## 3. データ構造設計

### 3.1 cases.json (ケース問題データ)
```json
{
  "cases": [
    {
      "id": "case-001",
      "title": "生産ライン効率低下の問題",
      "category": "製造現場",
      "description": "製造ラインAの生産性が先月比で15%低下している。作業員からは「設備の調子が悪い」という声が上がっているが、明確な原因は不明。",
      "context": {
        "urgency": "high",
        "complexity": "medium",
        "stakeholders": ["製造部門", "保守部門", "品質管理部門"]
      },
      "requiredSkills": {
        "problemIdentification": 4.0,
        "analysis": 4.5,
        "solutionDesign": 3.5,
        "execution": 3.0,
        "communication": 4.0
      }
    },
    {
      "id": "case-002",
      "title": "チーム内コミュニケーション不全",
      "category": "組織・人材",
      "description": "新しいプロジェクトチームが発足したが、メンバー間の情報共有が不足しており、タスクの重複や漏れが発生している。",
      "context": {
        "urgency": "medium",
        "complexity": "low",
        "stakeholders": ["プロジェクトメンバー", "マネージャー"]
      },
      "requiredSkills": {
        "problemIdentification": 3.0,
        "analysis": 2.5,
        "solutionDesign": 3.5,
        "execution": 4.0,
        "communication": 5.0
      }
    },
    {
      "id": "case-003",
      "title": "顧客クレームの急増",
      "category": "品質管理",
      "description": "特定製品に関する顧客クレームが先月の3倍に増加。内容は「仕様通りだが使いにくい」というもの。",
      "context": {
        "urgency": "high",
        "complexity": "high",
        "stakeholders": ["顧客", "営業部門", "開発部門", "品質管理部門"]
      },
      "requiredSkills": {
        "problemIdentification": 4.5,
        "analysis": 5.0,
        "solutionDesign": 4.5,
        "execution": 3.5,
        "communication": 4.5
      }
    }
  ]
}
```

### 3.2 responsePatterns.json (回答パターン)
```json
{
  "responsePatterns": {
    "problemIdentification": {
      "1.0-2.0": {
        "approach": "表面的な問題認識",
        "example": "設備が壊れているようなので、修理を依頼します。",
        "characteristics": ["現象のみに着目", "根本原因を探らない", "関係者へのヒアリング不足"]
      },
      "2.5-3.5": {
        "approach": "基本的な問題分析",
        "example": "生産性低下の原因として、設備トラブルの可能性を確認します。保守部門にログデータの提供を依頼し、故障履歴を確認します。",
        "characteristics": ["基本的なデータ収集", "一次的な原因分析", "限定的な視点"]
      },
      "4.0-5.0": {
        "approach": "多角的な問題把握",
        "example": "生産性低下を多角的に分析します。(1)設備稼働データの時系列分析、(2)作業員へのヒアリング(定量・定性)、(3)工程フロー全体の点検、(4)原材料・環境要因の変化確認を実施し、真因を特定します。",
        "characteristics": ["データドリブン", "多様な視点", "構造的アプローチ", "ステークホルダー巻き込み"]
      }
    },
    "analysis": {
      "1.0-2.0": {
        "approach": "分析なし・直感的判断",
        "example": "多分、設備が古いからだと思います。",
        "characteristics": ["データ活用なし", "仮説検証なし", "経験則のみ"]
      },
      "2.5-3.5": {
        "approach": "基礎的な分析",
        "example": "過去3ヶ月の生産データを比較し、低下時期を特定。設備メンテナンス記録との相関を確認します。",
        "characteristics": ["基本的なデータ比較", "時系列分析", "単一視点の分析"]
      },
      "4.0-5.0": {
        "approach": "体系的・深掘り分析",
        "example": "4M分析(Man/Machine/Material/Method)を実施。統計的手法(管理図、パレート図)で異常値を検出。工程能力指数(Cp/Cpk)の算出により、真因を定量的に特定します。",
        "characteristics": ["フレームワーク活用", "統計的手法", "根本原因分析", "定量・定性両面"]
      }
    },
    "solutionDesign": {
      "1.0-2.0": {
        "approach": "単発的な対症療法",
        "example": "新しい設備を購入します。",
        "characteristics": ["短期的視点", "コスト・リスク考慮不足", "代替案なし"]
      },
      "2.5-3.5": {
        "approach": "実現可能な解決策",
        "example": "設備更新(予算300万円)と、予防保全体制の構築(月次点検導入)の2段階で対応。ROIは1年半を想定。",
        "characteristics": ["具体的なプラン", "コスト意識", "段階的アプローチ"]
      },
      "4.0-5.0": {
        "approach": "戦略的・創造的ソリューション",
        "example": "短期(設備改修)、中期(IoTセンサー導入による予知保全)、長期(生産ライン全体の最適化)の3層で解決策を設計。各案のコスト・効果・リスクを評価し、優先順位を決定。パイロット導入後、PDCAで改善します。",
        "characteristics": ["多層的アプローチ", "イノベーティブ", "リスク評価", "PDCAサイクル"]
      }
    },
    "execution": {
      "1.0-2.0": {
        "approach": "計画性のない実行",
        "example": "とりあえず始めます。",
        "characteristics": ["スケジュール不明確", "進捗管理なし", "リソース計画なし"]
      },
      "2.5-3.5": {
        "approach": "基本的な実行管理",
        "example": "3ヶ月のスケジュールを作成し、週次で進捗確認。担当者を明確化し、必要なリソースを事前に確保します。",
        "characteristics": ["スケジュール策定", "役割分担", "基本的な進捗管理"]
      },
      "4.0-5.0": {
        "approach": "高度なプロジェクト遂行",
        "example": "WBS作成、クリティカルパス分析でマイルストーン設定。リスクレジスタで事前対策を準備。週次ステアリング会議で進捗・課題を共有し、迅速な意思決定を実現します。",
        "characteristics": ["プロジェクト管理手法", "リスク管理", "ステークホルダー調整", "アジャイル対応"]
      }
    },
    "communication": {
      "1.0-2.0": {
        "approach": "最小限の情報共有",
        "example": "関係部署にメールで報告します。",
        "characteristics": ["一方通行", "情報不足", "タイミング不適切"]
      },
      "2.5-3.5": {
        "approach": "適切な報連相",
        "example": "週次で関係部署に進捗報告。課題発生時は即座にエスカレーション。質問には24時間以内に回答します。",
        "characteristics": ["定期報告", "双方向", "基本的なステークホルダー対応"]
      },
      "4.0-5.0": {
        "approach": "戦略的コミュニケーション",
        "example": "ステークホルダー分析で各関係者の関心・影響度を評価。経営層には成果・ROI、現場には具体的手順を、各層に最適化した情報提供。可視化ダッシュボードで透明性確保。定期的なタウンホールで双方向対話を促進します。",
        "characteristics": ["対象別最適化", "可視化", "巻き込み力", "信頼構築"]
      }
    }
  }
}
```

### 3.3 scoreMappings.json (スコアマッピングルール)
```json
{
  "scoreMappings": {
    "ranges": [
      {"min": 1.0, "max": 2.0, "level": "low"},
      {"min": 2.5, "max": 3.5, "level": "medium"},
      {"min": 4.0, "max": 5.0, "level": "high"}
    ],
    "weights": {
      "directMatch": 1.0,
      "relatedSkill": 0.3
    }
  }
}
```

---

## 4. ロジック設計

### 4.1 回答予測アルゴリズム (lib/responsePredictor.ts)

```typescript
/**
 * 回答予測ロジック
 *
 * 1. ユーザーの5つのスコアを入力として受け取る
 * 2. 選択されたケースの requiredSkills と比較
 * 3. 各スキルのスコアレンジ(low/medium/high)を判定
 * 4. responsePatterns から対応する回答テンプレートを取得
 * 5. ケースの context を考慮して最終回答を生成
 */

interface ScoreSet {
  problemIdentification: number;
  analysis: number;
  solutionDesign: number;
  execution: number;
  communication: number;
}

interface PredictedResponse {
  overall: string;  // 総合的な回答
  breakdown: {
    skill: string;
    level: 'low' | 'medium' | 'high';
    approach: string;
    example: string;
  }[];
  scoreMatch: number;  // ケース要求スキルとの適合度 (0-100%)
}

function predictResponse(
  userScores: ScoreSet,
  caseId: string
): PredictedResponse {
  // 1. ケースデータ取得
  // 2. 各スキルのレベル判定
  // 3. 回答パターンマッチング
  // 4. 総合回答生成
  // 5. 適合度計算
}
```

### 4.2 適合度計算ロジック

```typescript
/**
 * ケース要求スキルとユーザースコアの適合度を計算
 *
 * 計算式:
 * scoreMatch = Σ(min(userScore, requiredScore) / requiredScore) / 5 * 100
 */
function calculateScoreMatch(
  userScores: ScoreSet,
  requiredSkills: ScoreSet
): number {
  const skills = Object.keys(userScores) as (keyof ScoreSet)[];
  const matchRatios = skills.map(skill =>
    Math.min(userScores[skill], requiredSkills[skill]) / requiredSkills[skill]
  );
  return (matchRatios.reduce((a, b) => a + b, 0) / skills.length) * 100;
}
```

---

## 5. UI/UX デザイン

### 5.1 デザイン参考
- **全体**: [Vercel Dashboard](https://vercel.com/dashboard) - クリーンでモダンなダッシュボード
- **スライダー**: [Material-UI Slider](https://mui.com/material-ui/react-slider/) - 直感的な操作感
- **比較表示**: [GitHub Diff View](https://github.com) - 変更前後の比較UI
- **レーダーチャート**: [Chart.js](https://www.chartjs.org/) または [Recharts](https://recharts.org/)

### 5.2 カラーパレット
```css
:root {
  /* Base Colors */
  --background: #ffffff;         /* 背景 */
  --primary: #1565C0;           /* メインカラー(ボタン、強調、ヘッダー) */
  --primary-light: #E3F2FD;     /* プライマリの薄い色(ホバー、セクション背景) */
  --primary-dark: #0D47A1;      /* プライマリの濃い色(アクティブ状態) */

  /* Score Level Colors */
  --score-low: #ef4444;          /* 1.0-2.0 (赤) */
  --score-medium: #f59e0b;       /* 2.5-3.5 (オレンジ) */
  --score-high: #10b981;         /* 4.0-5.0 (緑) */

  /* Neutral Colors */
  --text-primary: #212121;       /* 主要テキスト */
  --text-secondary: #757575;     /* 補助テキスト */
  --border: #E0E0E0;            /* ボーダー */
  --shadow: rgba(21, 101, 192, 0.08);  /* シャドウ */
}
```

**カラー使用ガイドライン**:
- **#ffffff**: 全体背景、カードの背景
- **#1565C0**: ヘッダー、ボタン、アクティブ要素、スライダーのつまみ
- **グラデーション**: 控えめに使用（例: `linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)`）
  - 背景に非常に微細な変化のみ
  - 違和感のない、ほんのりとした質感

### 5.3 レイアウト構成

```
┌─────────────────────────────────────────────────────────┐
│  職場改善スコア予測システム                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [ケース選択ドロップダウン]  ケース: 生産ライン効率低下の問題   │
│                                                         │
├──────────────────┬──────────────────────────────────────┤
│  スコア調整      │  予測回答                              │
│                  │                                      │
│  問題把握力      │  【あなたの回答予測】                    │
│  ━━━●━━━ 4.0    │                                      │
│                  │  ■ 問題把握アプローチ                  │
│  分析力          │  生産性低下を多角的に分析します...       │
│  ━━━━●━━ 3.5    │                                      │
│                  │  ■ 分析手法                           │
│  解決策立案力     │  過去3ヶ月の生産データを比較し...       │
│  ━━━━●━━ 3.5    │                                      │
│                  │  ■ 解決策                            │
│  実行力          │  設備更新と予防保全体制の構築...        │
│  ━━●━━━━ 3.0    │                                      │
│                  │  ■ 実行計画                          │
│  コミュニケーション力│  3ヶ月のスケジュールを作成し...        │
│  ━━━●━━━ 4.0    │                                      │
│                  │  ■ コミュニケーション                  │
│  [比較モード切替]  │  週次で関係部署に進捗報告...           │
│                  │                                      │
│                  │  適合度: 85% ████████░░              │
│                  │                                      │
└──────────────────┴──────────────────────────────────────┘
```

### 5.4 比較モード UI

```
┌─────────────────────────────────────────────────────────┐
│  スコア変更比較                                           │
├──────────────────┬──────────────────────────────────────┤
│  変更前           │  変更後                               │
├──────────────────┼──────────────────────────────────────┤
│  問題把握力: 4.0  │  問題把握力: 3.5                      │
│                  │                                      │
│  【回答】         │  【回答】                              │
│  生産性低下を     │  生産性低下の原因として、              │
│  多角的に分析...  │  設備トラブルの可能性を...             │
│                  │                                      │
│  適合度: 92%     │  適合度: 78% ↓14%                    │
└──────────────────┴──────────────────────────────────────┘
```

---

## 6. コンポーネント設計

### 6.1 ScoreSlider.tsx
```typescript
interface ScoreSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

// スコアに応じて色を変更 (1.0-2.0: 赤, 2.5-3.5: 黄, 4.0-5.0: 緑)
// 現在値を大きく表示
// スムーズなアニメーション
```

### 6.2 CaseSelector.tsx
```typescript
interface CaseSelectorProps {
  cases: Case[];
  selectedCaseId: string;
  onSelect: (caseId: string) => void;
}

// ケースをカテゴリ別にグループ化
// 各ケースの難易度・緊急度をアイコンで表示
```

### 6.3 ResponsePredictor.tsx
```typescript
interface ResponsePredictorProps {
  userScores: ScoreSet;
  caseId: string;
  comparisonMode?: boolean;
  previousScores?: ScoreSet;
}

// 予測回答を構造的に表示
// 各スキルの回答を折りたたみ可能に
// 適合度をプログレスバーで表示
// 比較モード時は diff 形式で表示
```

### 6.4 ComparisonView.tsx
```typescript
interface ComparisonViewProps {
  beforeScores: ScoreSet;
  afterScores: ScoreSet;
  caseId: string;
}

// サイドバイサイド比較
// 変更されたスコアをハイライト
// 回答の差分を色分け表示
```

---

## 7. 実装フェーズ

### Phase 1: 基盤構築
- [ ] データファイル作成 (cases.json, responsePatterns.json, scoreMappings.json)
- [ ] 型定義 (lib/types.ts)
- [ ] 回答予測ロジック実装 (lib/responsePredictor.ts)

### Phase 2: 基本UI
- [ ] ScoreSlider コンポーネント
- [ ] CaseSelector コンポーネント
- [ ] ResponsePredictor コンポーネント (基本版)
- [ ] メインページ統合

### Phase 3: 高度な機能
- [ ] 比較モード実装
- [ ] レーダーチャート追加
- [ ] アニメーション・トランジション
- [ ] レスポンシブ対応

### Phase 4: 改善・最適化
- [ ] パフォーマンス最適化
- [ ] アクセシビリティ対応
- [ ] テストケース追加
- [ ] ドキュメント整備

---

## 8. 今後の拡張可能性

### 8.1 機能拡張
- **履歴管理**: ユーザーのスコア変更履歴を保存・分析
- **推奨トレーニング**: スコア向上のための学習コンテンツ提案
- **チーム分析**: 複数メンバーのスコアを比較・可視化
- **PDFエクスポート**: 分析結果をPDFで出力

### 8.2 データ拡張
- ケース数の増加 (10+ cases)
- 業界別ケース (製造/IT/サービス/医療など)
- より細かいスコア刻み (0.1刻み)

---

## 9. 参考資料

### 9.1 技術ドキュメント
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### 9.2 デザインインスピレーション
- [Dribbble - Dashboard Designs](https://dribbble.com/tags/dashboard)
- [Behance - Analytics UI](https://www.behance.net/search/projects?search=analytics%20ui)

### 9.3 ビジネスロジック参考
- コンピテンシー評価モデル (Spencer & Spencer)
- 職業能力評価基準 (厚生労働省)
- 問題解決フレームワーク (PDCA, MECE, ロジックツリー)

---

## 付録: サンプルユースケース

### ユースケース1: 新人育成担当者
**シナリオ**: 新入社員の現在のスキルレベルを評価し、どのような判断・行動をするか予測

**操作フロー**:
1. 各スコアを 2.0-2.5 に設定
2. 「生産ライン効率低下」ケースを選択
3. 予測回答を確認 → 表面的なアプローチが表示される
4. 目標スコア (4.0) に変更
5. 比較モードで成長後の回答を確認
6. 育成計画に活用

### ユースケース2: 採用面接官
**シナリオ**: 候補者の実力を評価し、実務での対応力を予測

**操作フロー**:
1. 面接での回答から各スコアを推定
2. 実務に近いケースを選択
3. 予測回答と実際の面接回答を比較
4. 適合度を参考に採用判断

### ユースケース3: 自己啓発
**シナリオ**: 自分のスキルを客観視し、改善ポイントを発見

**操作フロー**:
1. 自己評価でスコア設定
2. 複数ケースで予測回答を確認
3. 特定スキルを上げた場合の変化を確認
4. 優先的に伸ばすべきスキルを特定

---

**設計書バージョン**: 1.0
**最終更新日**: 2025-10-26
**作成者**: Claude Code
