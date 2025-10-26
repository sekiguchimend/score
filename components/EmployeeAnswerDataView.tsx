"use client";

import { useState } from "react";
import { SharePage } from "@/data/sharePages";
import { Employee, EmployeeMetrics } from "@/data/employees";
import { getEmployeeAnswer } from "@/data/employeeAnswers";

interface EmployeeAnswerDataViewProps {
  page: SharePage;
  employee: Employee;
  onBack: () => void;
}

export default function EmployeeAnswerDataView({
  page,
  employee,
  onBack,
}: EmployeeAnswerDataViewProps) {
  const [metrics, setMetrics] = useState<EmployeeMetrics>(employee.metrics);
  const [displayedAnswer, setDisplayedAnswer] = useState<string | null>(
    getEmployeeAnswer(employee.id, page.id)
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const handleMetricChange = (key: keyof EmployeeMetrics, value: number) => {
    setMetrics({
      ...metrics,
      [key]: value,
    });
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

  const handleGenerateAnswer = () => {
    setIsGenerating(true);

    // デモ用: 全社員のIDリスト
    const allEmployeeIds = ["emp-1", "emp-2", "emp-3", "emp-4", "emp-5", "emp-6"];

    // 現在の社員以外のランダムな社員の回答を取得
    const otherEmployeeIds = allEmployeeIds.filter(id => id !== employee.id);
    const randomEmployeeId = otherEmployeeIds[Math.floor(Math.random() * otherEmployeeIds.length)];

    // ランダムな社員の回答を取得
    const randomAnswer = getEmployeeAnswer(randomEmployeeId, page.id);

    // 0.5秒後に回答を表示（生成している感じを演出）
    setTimeout(() => {
      setDisplayedAnswer(randomAnswer);
      setIsGenerating(false);
    }, 500);
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

        {/* 社員情報テーブル */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">社員情報</h2>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium text-gray-700 border-r border-gray-200">氏名</th>
                <th className="px-4 py-2.5 text-left font-medium text-gray-700 border-r border-gray-200">役職</th>
                <th className="px-4 py-2.5 text-left font-medium text-gray-700 border-r border-gray-200">部署</th>
                <th className="px-4 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200">創造性</th>
                <th className="px-4 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200">論理性</th>
                <th className="px-4 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200">共感性</th>
                <th className="px-4 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200">リーダーシップ</th>
                <th className="px-4 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200">柔軟性</th>
                <th className="px-4 py-2.5 text-center font-medium text-gray-700">総合評価</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b border-gray-200">
                <td className="px-4 py-2.5 font-medium text-gray-900 border-r border-gray-200">{employee.name}</td>
                <td className="px-4 py-2.5 text-gray-700 border-r border-gray-200">{employee.position}</td>
                <td className="px-4 py-2.5 text-gray-700 border-r border-gray-200">{employee.department}</td>
                <td className="px-4 py-2.5 text-center border-r border-gray-200">
                  <input
                    type="number"
                    value={metrics.creativity}
                    onChange={(e) => handleMetricChange('creativity', parseInt(e.target.value) || 0)}
                    min="0"
                    max="100"
                    className="w-16 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="px-4 py-2.5 text-center border-r border-gray-200">
                  <input
                    type="number"
                    value={metrics.logic}
                    onChange={(e) => handleMetricChange('logic', parseInt(e.target.value) || 0)}
                    min="0"
                    max="100"
                    className="w-16 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="px-4 py-2.5 text-center border-r border-gray-200">
                  <input
                    type="number"
                    value={metrics.empathy}
                    onChange={(e) => handleMetricChange('empathy', parseInt(e.target.value) || 0)}
                    min="0"
                    max="100"
                    className="w-16 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="px-4 py-2.5 text-center border-r border-gray-200">
                  <input
                    type="number"
                    value={metrics.leadership}
                    onChange={(e) => handleMetricChange('leadership', parseInt(e.target.value) || 0)}
                    min="0"
                    max="100"
                    className="w-16 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="px-4 py-2.5 text-center border-r border-gray-200">
                  <input
                    type="number"
                    value={metrics.flexibility}
                    onChange={(e) => handleMetricChange('flexibility', parseInt(e.target.value) || 0)}
                    min="0"
                    max="100"
                    className="w-16 text-center border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="px-4 py-2.5 text-center font-medium text-purple-600">{getAverageScore()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 回答生成ボタン */}
        <div className="mb-6">
          <button
            onClick={handleGenerateAnswer}
            disabled={isGenerating}
            className={`w-full px-6 py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${
              isGenerating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg"
            }`}
          >
            {isGenerating ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                回答を生成中...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                現在の数値で回答を生成
              </>
            )}
          </button>
        </div>

        {/* 物語セクション */}
        <div className="bg-gray-50 p-6 mb-6 rounded-lg">
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
        <div className="bg-gray-50 p-6 mb-6 rounded-lg">
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

        {/* 回答セクション */}
        {displayedAnswer ? (
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
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">
                生成された回答
              </h2>
            </div>
            <div className="text-gray-800 leading-relaxed whitespace-pre-line bg-white p-4 rounded-lg border border-purple-100">
              {displayedAnswer}
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-yellow-900">回答がまだ生成されていません</h2>
            </div>
            <p className="text-yellow-800">
              上記の「現在の数値で回答を生成」ボタンをクリックして、回答を生成してください。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
