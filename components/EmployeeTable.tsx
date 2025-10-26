"use client";

import { useState, useMemo } from "react";
import { Employee } from "@/data/employees";

interface EmployeeTableProps {
  employees: Employee[];
  onDragStart: (employee: Employee) => void;
}

type SortKey = "name" | "position" | "department" | "creativity" | "logic" | "empathy" | "leadership" | "flexibility" | "average";
type SortOrder = "asc" | "desc";

export default function EmployeeTable({ employees, onDragStart }: EmployeeTableProps) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDragStart = (e: React.DragEvent, employee: Employee) => {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("application/json", JSON.stringify(employee));
    onDragStart(employee);
  };

  const getAverageScore = (employee: Employee): number => {
    const metrics = employee.metrics;
    const sum = metrics.creativity + metrics.logic + metrics.empathy + metrics.leadership + metrics.flexibility;
    return Math.round(sum / 5);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedAndFilteredEmployees = useMemo(() => {
    let filtered = employees.filter((employee) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        employee.name.toLowerCase().includes(searchLower) ||
        employee.position.toLowerCase().includes(searchLower) ||
        employee.department.toLowerCase().includes(searchLower)
      );
    });

    if (!sortKey) return filtered;

    return [...filtered].sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      if (sortKey === "name") {
        aValue = a.name;
        bValue = b.name;
      } else if (sortKey === "position") {
        aValue = a.position;
        bValue = b.position;
      } else if (sortKey === "department") {
        aValue = a.department;
        bValue = b.department;
      } else if (sortKey === "average") {
        aValue = getAverageScore(a);
        bValue = getAverageScore(b);
      } else {
        aValue = a.metrics[sortKey];
        bValue = b.metrics[sortKey];
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortOrder === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    });
  }, [employees, sortKey, sortOrder, searchTerm]);

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    return sortOrder === "asc" ? (
      <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">社員評価データベース</h2>
          <div className="text-sm text-gray-600">
            {sortedAndFilteredEmployees.length} 件 / {employees.length} 件
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="社員名、役職、部署で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              クリア
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ヘッダーをクリックしてソート | 社員をドラッグして左のシェアページにドロップ
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                onClick={() => handleSort("name")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  社員名
                  <SortIcon columnKey="name" />
                </div>
              </th>
              <th
                onClick={() => handleSort("position")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  役職
                  <SortIcon columnKey="position" />
                </div>
              </th>
              <th
                onClick={() => handleSort("department")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  部署
                  <SortIcon columnKey="department" />
                </div>
              </th>
              <th
                onClick={() => handleSort("creativity")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  創造性
                  <SortIcon columnKey="creativity" />
                </div>
              </th>
              <th
                onClick={() => handleSort("logic")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  論理性
                  <SortIcon columnKey="logic" />
                </div>
              </th>
              <th
                onClick={() => handleSort("empathy")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  共感性
                  <SortIcon columnKey="empathy" />
                </div>
              </th>
              <th
                onClick={() => handleSort("leadership")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  リーダーシップ
                  <SortIcon columnKey="leadership" />
                </div>
              </th>
              <th
                onClick={() => handleSort("flexibility")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  柔軟性
                  <SortIcon columnKey="flexibility" />
                </div>
              </th>
              <th
                onClick={() => handleSort("average")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  平均
                  <SortIcon columnKey="average" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAndFilteredEmployees.map((employee) => (
              <tr
                key={employee.id}
                draggable
                onDragStart={(e) => handleDragStart(e, employee)}
                className="hover:bg-gray-50 cursor-move transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {employee.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {employee.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.metrics.creativity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.metrics.logic}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.metrics.empathy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.metrics.leadership}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.metrics.flexibility}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {getAverageScore(employee)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
