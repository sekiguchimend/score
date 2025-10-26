"use client";

import { useState, useEffect } from "react";
import { SharePage } from "@/data/sharePages";
import { Employee, EmployeeMetrics } from "@/data/employees";
import { generateAnswer } from "@/lib/generateAnswer";

interface EmployeeAnswerViewProps {
  page: SharePage;
  employee: Employee;
  onBack: () => void;
}

export default function EmployeeAnswerView({ page, employee, onBack }: EmployeeAnswerViewProps) {
  const [metrics, setMetrics] = useState<EmployeeMetrics>(employee.metrics);
  const [answer, setAnswer] = useState("");

  // メトリクスが変更されたら回答を再生成
  useEffect(() => {
    const updatedEmployee: Employee = {
      ...employee,
      metrics: metrics,
    };

    const generatedAnswer = generateAnswer({
      employee: updatedEmployee,
      story: page.story,
      question: page.questions[0] || "", // 最初の質問を使用
    });

    setAnswer(generatedAnswer);
  }, [metrics, employee, page]);

  const handleMetricChange = (metric: keyof EmployeeMetrics, value: number) => {
    setMetrics((prev) => ({
      ...prev,
      [metric]: value,
    }));
  };

  const getAverageScore = (): number => {
    const sum =
      metrics.creativity +
      metrics.logic +
      metrics.empathy +
      metrics.leadership +
      metrics.flexibility;
    return Math.round(sum / 5);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-5xl mx-auto p-8">
        {/* 戻るボタン */}
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          元のページに戻る
        </button>

        {/* 社員情報カード */}
        <div className="bg-gray-50 p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
              {employee.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{employee.name}</h2>
              <p className="text-gray-600">
                {employee.position} | {employee.department}
              </p>
              <p className="text-lg font-semibold text-purple-600 mt-1">
                総合評価: {getAverageScore()} / 100
              </p>
            </div>
          </div>

          {/* メトリクス調整 */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              評価指標を調整 (回答がリアルタイムで変化します)
            </h3>

            {/* 創造性 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">創造性</label>
                <span className="text-sm font-bold text-purple-600">{metrics.creativity}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={metrics.creativity}
                onChange={(e) => handleMetricChange("creativity", parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>

            {/* 論理性 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">論理性</label>
                <span className="text-sm font-bold text-blue-600">{metrics.logic}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={metrics.logic}
                onChange={(e) => handleMetricChange("logic", parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            {/* 共感性 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">共感性</label>
                <span className="text-sm font-bold text-pink-600">{metrics.empathy}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={metrics.empathy}
                onChange={(e) => handleMetricChange("empathy", parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
              />
            </div>

            {/* リーダーシップ */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">リーダーシップ</label>
                <span className="text-sm font-bold text-green-600">{metrics.leadership}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={metrics.leadership}
                onChange={(e) => handleMetricChange("leadership", parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>

            {/* 柔軟性 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">柔軟性</label>
                <span className="text-sm font-bold text-orange-600">{metrics.flexibility}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={metrics.flexibility}
                onChange={(e) => handleMetricChange("flexibility", parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
            </div>
          </div>
        </div>

        {/* 物語セクション */}
        <div className="bg-gray-50 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            物語
          </h2>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">{page.story}</div>
        </div>

        {/* 質問セクション */}
        <div className="bg-gray-50 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            質問
          </h2>
          <div className="space-y-4">
            {page.questions.map((question, index) => (
              <div key={index} className="text-gray-700">
                <span className="font-medium text-purple-600">質問 {index + 1}:</span> {question}
              </div>
            ))}
          </div>
        </div>

        {/* AI生成回答 */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">
              {employee.name}さんのAI生成回答
            </h2>
          </div>
          <div className="text-gray-800 leading-relaxed whitespace-pre-line bg-white p-4 rounded-lg border border-purple-100">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
