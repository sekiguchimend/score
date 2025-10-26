"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TasksMain from "@/components/TasksMain";
import SharePageView from "@/components/SharePageView";
import CreateSharePageModal from "@/components/CreateSharePageModal";
import EmployeeAnswerDataView from "@/components/EmployeeAnswerDataView";
import { sharePages, SharePage } from "@/data/sharePages";
import { Employee } from "@/data/employees";

export default function Home() {
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [customPages, setCustomPages] = useState<SharePage[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // 元のページとカスタムページを結合
  const allPages = [...sharePages, ...customPages];

  const selectedPage = selectedPageId
    ? allPages.find((page) => page.id === selectedPageId)
    : null;

  const handleCreatePage = (pageData: Omit<SharePage, "id">) => {
    const newPage: SharePage = {
      ...pageData,
      id: `custom-${Date.now()}`, // ユニークなIDを生成
    };
    setCustomPages([...customPages, newPage]);
    setSelectedPageId(newPage.id); // 作成したページを自動的に選択
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleGoHome = () => {
    setSelectedPageId(null);
    setSelectedEmployee(null);
  };

  const handleEmployeeDrop = (pageId: string, employeeData: string) => {
    try {
      const employee: Employee = JSON.parse(employeeData);
      setSelectedPageId(pageId);
      setSelectedEmployee(employee);
    } catch (error) {
      console.error("Failed to parse employee data:", error);
    }
  };

  const handleBackToPage = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar
        selectedPageId={selectedPageId}
        onSelectPage={setSelectedPageId}
        onCreateNewPage={handleOpenCreateModal}
        allPages={allPages}
        onGoHome={handleGoHome}
        onEmployeeDrop={handleEmployeeDrop}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedPage && selectedEmployee ? (
          <EmployeeAnswerDataView
            page={selectedPage}
            employee={selectedEmployee}
            onBack={handleBackToPage}
          />
        ) : selectedPage ? (
          <SharePageView page={selectedPage} />
        ) : (
          <TasksMain />
        )}
      </div>
      <CreateSharePageModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePage={handleCreatePage}
      />
    </div>
  );
}
