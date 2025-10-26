"use client";

import { SharePage } from "@/data/sharePages";
import { useState } from "react";

interface SidebarProps {
  selectedPageId: string | null;
  onSelectPage: (pageId: string) => void;
  onCreateNewPage: () => void;
  allPages: SharePage[];
  onGoHome: () => void;
  onEmployeeDrop: (pageId: string, employeeData: string) => void;
}

export default function Sidebar({ selectedPageId, onSelectPage, onCreateNewPage, allPages, onGoHome, onEmployeeDrop }: SidebarProps) {
  const [dragOverPageId, setDragOverPageId] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleDragOver = (e: React.DragEvent, pageId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverPageId(pageId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverPageId(null);
  };

  const handleDrop = (e: React.DragEvent, pageId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverPageId(null);

    const employeeData = e.dataTransfer.getData("application/json");
    if (employeeData) {
      onEmployeeDrop(pageId, employeeData);
    }
  };
  return (
    <div
      className={`bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-200 ${
        isCollapsed ? "w-16" : "w-60"
      }`}
    >
      {/* ユーザーヘッダー */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 cursor-pointer">
          <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold shrink-0">
            T
          </div>
          {!isCollapsed && (
            <span className="text-sm font-medium text-gray-800 flex-1 truncate">testuserさんのNotio...</span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="shrink-0 hover:bg-gray-200 rounded p-1 transition-colors"
          >
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isCollapsed ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 検索 */}
      {!isCollapsed && (
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-white border border-gray-200 text-gray-500 text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>検索</span>
          </div>
        </div>
      )}

      {/* メインメニュー */}
      <div className="px-2 py-2">
        <div
          onClick={onGoHome}
          className={`px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer flex items-center gap-2 ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "ホーム" : ""}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          {!isCollapsed && <span>ホーム</span>}
        </div>
        <div
          className={`px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer flex items-center gap-2 ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "受信トレイ" : ""}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          {!isCollapsed && (
            <>
              <span>受信トレイ</span>
              <span className="ml-auto text-xs bg-gray-200 px-1.5 rounded">99+</span>
            </>
          )}
        </div>
      </div>

      {/* 質問 */}
      <div className="px-2 py-2 border-t border-gray-200 flex-1 overflow-y-auto">
        {!isCollapsed && (
          <div className="px-3 py-1 text-xs text-gray-500 font-medium flex items-center justify-between">
            <span>質問</span>
            <button
              onClick={onCreateNewPage}
              className="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
              title="新しい質問を作成"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        )}
        {allPages.map((page) => (
          <div
            key={page.id}
            onClick={() => onSelectPage(page.id)}
            onDragOver={(e) => handleDragOver(e, page.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, page.id)}
            className={`px-3 py-1.5 text-sm rounded cursor-pointer flex items-center gap-2 transition-all ${
              isCollapsed ? "justify-center" : ""
            } ${
              dragOverPageId === page.id
                ? "bg-green-100 border-2 border-green-500 border-dashed"
                : selectedPageId === page.id
                ? "bg-purple-100 text-purple-900 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            title={isCollapsed ? page.title : ""}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {!isCollapsed && <span className="flex-1 truncate">{page.title}</span>}
          </div>
        ))}
      </div>

      {/* フッター */}
      <div className="px-2 py-3 border-t border-gray-200 space-y-1">
        <div
          className={`px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer flex items-center gap-2 ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "設定" : ""}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {!isCollapsed && <span>設定</span>}
        </div>
        <div
          className={`px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer flex items-center gap-2 ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "マーケットプレイス" : ""}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {!isCollapsed && <span>マーケットプレイス</span>}
        </div>
        <div
          className={`px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer flex items-center gap-2 ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "ゴミ箱" : ""}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {!isCollapsed && <span>ゴミ箱</span>}
        </div>
      </div>
    </div>
  );
}

