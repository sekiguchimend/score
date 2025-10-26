import { Employee, EmployeeMetrics } from "@/data/employees";

export interface GenerateAnswerParams {
  employee: Employee;
  story: string;
  question: string;
}

// メトリクスに基づいて性格特性を生成
function getPersonalityTraits(metrics: EmployeeMetrics): string[] {
  const traits: string[] = [];

  if (metrics.creativity >= 80) traits.push("創造的で独創的な視点を持ち");
  else if (metrics.creativity >= 60) traits.push("バランスの取れた創造性を持ち");
  else traits.push("実践的で現実的なアプローチを好み");

  if (metrics.logic >= 80) traits.push("論理的で分析的に物事を考え");
  else if (metrics.logic >= 60) traits.push("理性と感情のバランスを取りながら");
  else traits.push("直感を大切にし");

  if (metrics.empathy >= 80) traits.push("他者への深い共感力を持ち");
  else if (metrics.empathy >= 60) traits.push("適度な共感性を持ち");
  else traits.push("客観的な視点を重視し");

  if (metrics.leadership >= 80) traits.push("強いリーダーシップを発揮する");
  else if (metrics.leadership >= 60) traits.push("協調性を大切にする");
  else traits.push("サポート役として貢献する");

  return traits;
}

// 回答のトーンを決定
function getResponseTone(metrics: EmployeeMetrics): string {
  if (metrics.empathy >= 80) return "温かく、思いやりのある";
  if (metrics.logic >= 80) return "理路整然とした、分析的な";
  if (metrics.creativity >= 80) return "独創的で、想像力豊かな";
  if (metrics.leadership >= 80) return "力強く、決断力のある";
  return "バランスの取れた";
}

// メトリクスに基づいて回答を生成
export function generateAnswer({ employee, story, question }: GenerateAnswerParams): string {
  const traits = getPersonalityTraits(employee.metrics);
  const tone = getResponseTone(employee.metrics);

  // 物語のキーワードを抽出（簡易版）
  const storyKeywords = extractKeywords(story);

  // メトリクスベースで回答の構造を決定
  let answer = "";

  // 導入部分
  answer += `${employee.name}の視点から考えると、`;

  // 物語への反応
  if (employee.metrics.empathy >= 70) {
    answer += `この物語は心に深く響きます。${storyKeywords[0] || "登場人物"}の気持ちを考えると、`;
  } else if (employee.metrics.logic >= 70) {
    answer += `この物語を分析すると、${storyKeywords[0] || "状況"}には明確な構造があります。`;
  } else {
    answer += `この物語から、${storyKeywords[0] || "重要な教訓"}を読み取ることができます。`;
  }

  answer += "\n\n";

  // メイン回答
  if (employee.metrics.creativity >= 75) {
    answer += `私なら、この状況をより創造的な視点で捉えます。`;
    answer += `${storyKeywords[1] || "問題"}に対して、従来とは異なるアプローチを試みるでしょう。`;
  } else if (employee.metrics.leadership >= 75) {
    answer += `リーダーとして、私はこの状況で明確な方向性を示すことが重要だと考えます。`;
    answer += `チーム全体を導き、最適な解決策を見出すことに注力します。`;
  } else if (employee.metrics.empathy >= 75) {
    answer += `関係者全員の気持ちを理解し、尊重することが何より大切だと思います。`;
    answer += `対話を通じて、お互いの立場を理解し合うことで、より良い関係を築けるはずです。`;
  } else if (employee.metrics.logic >= 75) {
    answer += `データと事実に基づいて、この状況を冷静に分析することが重要です。`;
    answer += `感情的にならず、論理的なステップで問題解決を図るべきでしょう。`;
  }

  answer += "\n\n";

  // 結論
  if (employee.metrics.flexibility >= 75) {
    answer += `状況に応じて柔軟に対応しながら、`;
  } else {
    answer += `一貫した姿勢を保ちながら、`;
  }

  answer += `最善の結果を目指したいと思います。`;

  // 個人的な感想
  answer += `\n\n私の${employee.position}としての経験から言えば、`;
  answer += `こうした${tone}アプローチが、長期的には最も効果的だと確信しています。`;

  return answer;
}

// 簡易的なキーワード抽出
function extractKeywords(text: string): string[] {
  const keywords: string[] = [];

  if (text.includes("旅人")) keywords.push("旅人との出会い");
  if (text.includes("魔法")) keywords.push("魔法の意味");
  if (text.includes("貝殻")) keywords.push("貝殻の発見");
  if (text.includes("修行")) keywords.push("修行の過程");
  if (text.includes("書店")) keywords.push("本との出会い");
  if (text.includes("星")) keywords.push("星空の下での対話");
  if (text.includes("桜")) keywords.push("桜の開花");
  if (text.includes("橋")) keywords.push("橋を渡る勇気");
  if (text.includes("家族")) keywords.push("家族の絆");

  if (keywords.length === 0) {
    keywords.push("この経験");
    keywords.push("この状況");
  }

  return keywords;
}
