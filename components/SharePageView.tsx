"use client";

import { SharePage } from "@/data/sharePages";
import { useState } from "react";

interface SharePageViewProps {
  page: SharePage;
}

export default function SharePageView({ page }: SharePageViewProps) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 回答を保存する処理を実装
    console.log("回答:", answer);
    alert("回答を送信しました！");
    setAnswer("");
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto p-8">
        {/* ページタイトル */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{page.title}</h1>

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
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {page.story}
          </div>
        </div>

        {/* 質問と回答セクション */}
        <div className="bg-gray-50 p-6">
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
          
          <div className="space-y-4 mb-6">
            {page.questions.map((question, index) => (
              <div key={index} className="text-gray-700">
                <span className="font-medium text-purple-600">質問 {index + 1}:</span> {question}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              あなたの回答
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
              placeholder="ここにあなたの考えを入力してください..."
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={!answer.trim()}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                回答を送信
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
