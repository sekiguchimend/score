export interface EmployeeMetrics {
  creativity: number; // 創造性 (0-100)
  logic: number; // 論理性 (0-100)
  empathy: number; // 共感性 (0-100)
  leadership: number; // リーダーシップ (0-100)
  flexibility: number; // 柔軟性 (0-100)
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  metrics: EmployeeMetrics;
  avatar?: string;
}

export const employees: Employee[] = [
  {
    id: "emp-1",
    name: "田中 太郎",
    position: "シニアエンジニア",
    department: "開発部",
    metrics: {
      creativity: 85,
      logic: 90,
      empathy: 70,
      leadership: 65,
      flexibility: 75,
    },
  },
  {
    id: "emp-2",
    name: "佐藤 花子",
    position: "プロジェクトマネージャー",
    department: "企画部",
    metrics: {
      creativity: 75,
      logic: 80,
      empathy: 95,
      leadership: 90,
      flexibility: 85,
    },
  },
  {
    id: "emp-3",
    name: "鈴木 一郎",
    position: "デザイナー",
    department: "デザイン部",
    metrics: {
      creativity: 95,
      logic: 60,
      empathy: 85,
      leadership: 50,
      flexibility: 90,
    },
  },
  {
    id: "emp-4",
    name: "高橋 美咲",
    position: "アナリスト",
    department: "データ分析部",
    metrics: {
      creativity: 65,
      logic: 95,
      empathy: 70,
      leadership: 60,
      flexibility: 70,
    },
  },
  {
    id: "emp-5",
    name: "伊藤 健太",
    position: "営業部長",
    department: "営業部",
    metrics: {
      creativity: 70,
      logic: 75,
      empathy: 90,
      leadership: 95,
      flexibility: 80,
    },
  },
  {
    id: "emp-6",
    name: "渡辺 真理",
    position: "人事マネージャー",
    department: "人事部",
    metrics: {
      creativity: 75,
      logic: 70,
      empathy: 95,
      leadership: 85,
      flexibility: 90,
    },
  },
];
