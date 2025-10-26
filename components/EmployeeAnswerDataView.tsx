"use client";

import { SharePage } from "@/data/sharePages";
import { Employee } from "@/data/employees";
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
  const answer = getEmployeeAnswer(employee.id, page.id);

  const getAverageScore = (): number => {
    const metrics = employee.metrics;
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
          <div className="flex items-center mb-4">
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

          {/* メトリクス表示 */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{employee.metrics.creativity}</div>
              <div className="text-xs text-gray-600">創造性</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{employee.metrics.logic}</div>
              <div className="text-xs text-gray-600">論理性</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{employee.metrics.empathy}</div>
              <div className="text-xs text-gray-600">共感性</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {employee.metrics.leadership}
              </div>
              <div className="text-xs text-gray-600">リーダーシップ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {employee.metrics.flexibility}
              </div>
              <div className="text-xs text-gray-600">柔軟性</div>
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

        {/* 回答セクション */}
        {answer ? (
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
                {employee.name}さんの回答
              </h2>
            </div>
            <div className="text-gray-800 leading-relaxed whitespace-pre-line bg-white p-4 rounded-lg border border-purple-100">
              {answer}
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-yellow-900">回答データがありません</h2>
            </div>
            <p className="text-yellow-800">
              {employee.name}さんは、この質問にまだ回答していません。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
