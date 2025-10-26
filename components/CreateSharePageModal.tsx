"use client";

import { useState } from "react";
import { SharePage } from "@/data/sharePages";

interface CreateSharePageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePage: (page: Omit<SharePage, "id">) => void;
}

export default function CreateSharePageModal({
  isOpen,
  onClose,
  onCreatePage,
}: CreateSharePageModalProps) {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [questions, setQuestions] = useState<string[]>([""]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 空でない質問のみをフィルタリング
    const validQuestions = questions.filter(q => q.trim());

    if (!title.trim() || !story.trim() || validQuestions.length === 0) {
      alert("タイトル、物語、および少なくとも1つの質問を入力してください");
      return;
    }

    onCreatePage({
      title: title.trim(),
      story: story.trim(),
      questions: validQuestions.map(q => q.trim()),
    });

    // フォームをリセット
    setTitle("");
    setStory("");
    setQuestions([""]);
    onClose();
  };

  const handleCancel = () => {
    setTitle("");
    setStory("");
    setQuestions([""]);
    onClose();
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    }
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900">新しい質問を作成</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* タイトル */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              タイトル <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="例: 友情について"
              maxLength={50}
            />
            <p className="mt-1 text-xs text-gray-500">
              {title.length}/50文字
            </p>
          </div>

          {/* 物語 */}
          <div>
            <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-2">
              物語 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full min-h-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
              placeholder="物語を入力してください（5行程度を推奨）&#10;例：&#10;ある日、小さな村に旅人がやってきました。&#10;旅人は村人たちに不思議な石を見せました。&#10;その石は月の光を浴びると淡く光るのです。&#10;村人たちは驚き、旅人を歓迎しました。&#10;旅人は笑顔で「この石は友情の証です」と言いました。"
            />
            <p className="mt-1 text-xs text-gray-500">
              改行して5行程度の物語を書いてください
            </p>
          </div>

          {/* 質問 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                質問 <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                + 質問を追加
              </button>
            </div>
            <div className="space-y-3">
              {questions.map((question, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1">
                    <textarea
                      value={question}
                      onChange={(e) => handleQuestionChange(index, e.target.value)}
                      className="w-full min-h-[80px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
                      placeholder={`質問 ${index + 1}: 例: これに対してあなたはどう思いますか？`}
                    />
                  </div>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors self-start"
                      title="削除"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              読者に問いかける質問を入力してください（複数可）
            </p>
          </div>

          {/* ボタン */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
