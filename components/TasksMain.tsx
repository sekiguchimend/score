'use client';

import { useState } from "react";
import { Employee as ImportedEmployee } from "@/data/employees";

interface Employee {
  id: number;
  number: string;
  name: string;
  rank: number;
  problemGraspStatus: string;
  problemGraspScore: string;
  problemGraspMaintenance: string;
  problemGraspMember: string;
  problemGraspImprovement: string;
  problemGraspImprovementMember: string;
  solutionProposalNetwork: string;
  solutionProposalPlanning: string;
  solutionProposalMaintenance: string;
  solutionProposalMember: string;
  solutionProposalImprovement: string;
  solutionProposalImprovementMember: string;
  roleUnderstandingUnderstanding: string;
  roleUnderstandingLeader: string;
  roleUnderstandingSupport: string;
  roleUnderstandingSupervisor: string;
  roleUnderstandingWorkplace: string;
  roleUnderstandingMember: string;
  achievement: number;
}

type SortKey = 'name' | 'rank' | 'achievement';
type SortOrder = 'asc' | 'desc';

interface TasksMainProps {
  onDragStart?: (employee: ImportedEmployee) => void;
}

export default function TasksMain({ onDragStart }: TasksMainProps = {}) {
  const [activeTab, setActiveTab] = useState<'table' | 'board' | 'calendar'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [filterSymbol, setFilterSymbol] = useState<string>('');
  const [filterRankMin, setFilterRankMin] = useState<string>('');
  const [filterRankMax, setFilterRankMax] = useState<string>('');
  const [sortKey, setSortKey] = useState<SortKey>('rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  // 30名分のサンプルデータ
  const [employees] = useState<Employee[]>([
    { id: 1, number: "1", name: "能登 一郎", rank: 5, problemGraspStatus: "○", problemGraspScore: "△", problemGraspMaintenance: "○", problemGraspMember: "×", problemGraspImprovement: "△", problemGraspImprovementMember: "△", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "×", solutionProposalImprovement: "○", solutionProposalImprovementMember: "△", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "×", roleUnderstandingWorkplace: "△", roleUnderstandingMember: "○", achievement: 2.0 },
    { id: 2, number: "2", name: "能登 二郎", rank: 2, problemGraspStatus: "◎", problemGraspScore: "◎", problemGraspMaintenance: "○", problemGraspMember: "◎", problemGraspImprovement: "○", problemGraspImprovementMember: "◎", solutionProposalNetwork: "◎", solutionProposalPlanning: "◎", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "△", solutionProposalImprovementMember: "△", roleUnderstandingUnderstanding: "◎", roleUnderstandingLeader: "◎", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "△", roleUnderstandingMember: "△", achievement: 2.5 },
    { id: 3, number: "3", name: "富山 太郎", rank: 1, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "△", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "△", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.8 },
    { id: 4, number: "4", name: "石川 花子", rank: 3, problemGraspStatus: "△", problemGraspScore: "○", problemGraspMaintenance: "△", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "△", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "△", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "△", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "△", achievement: 2.3 },
    { id: 5, number: "5", name: "福井 次郎", rank: 4, problemGraspStatus: "○", problemGraspScore: "△", problemGraspMaintenance: "○", problemGraspMember: "△", problemGraspImprovement: "△", problemGraspImprovementMember: "○", solutionProposalNetwork: "△", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "△", solutionProposalImprovement: "△", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "△", roleUnderstandingLeader: "○", roleUnderstandingSupport: "△", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.1 },
    { id: 6, number: "6", name: "金沢 美咲", rank: 6, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.6 },
    { id: 7, number: "7", name: "新潟 健一", rank: 7, problemGraspStatus: "△", problemGraspScore: "△", problemGraspMaintenance: "△", problemGraspMember: "△", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "△", solutionProposalPlanning: "△", solutionProposalMaintenance: "△", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "△", roleUnderstandingLeader: "△", roleUnderstandingSupport: "△", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 1.9 },
    { id: 8, number: "8", name: "長野 和彦", rank: 8, problemGraspStatus: "◎", problemGraspScore: "○", problemGraspMaintenance: "◎", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "△", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "◎", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "△", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "◎", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "△", achievement: 2.4 },
    { id: 9, number: "9", name: "山梨 さくら", rank: 9, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.7 },
    { id: 10, number: "10", name: "岐阜 俊介", rank: 10, problemGraspStatus: "△", problemGraspScore: "○", problemGraspMaintenance: "△", problemGraspMember: "×", problemGraspImprovement: "○", problemGraspImprovementMember: "△", solutionProposalNetwork: "○", solutionProposalPlanning: "△", solutionProposalMaintenance: "○", solutionProposalMember: "×", solutionProposalImprovement: "△", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "△", roleUnderstandingLeader: "○", roleUnderstandingSupport: "△", roleUnderstandingSupervisor: "×", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "△", achievement: 1.8 },
    { id: 11, number: "11", name: "静岡 まりこ", rank: 11, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "△", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "△", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "△", roleUnderstandingMember: "○", achievement: 2.5 },
    { id: 12, number: "12", name: "愛知 大輔", rank: 12, problemGraspStatus: "○", problemGraspScore: "△", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "△", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "△", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.2 },
    { id: 13, number: "13", name: "三重 ゆうこ", rank: 13, problemGraspStatus: "◎", problemGraspScore: "◎", problemGraspMaintenance: "○", problemGraspMember: "◎", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "◎", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "◎", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "◎", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "◎", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.9 },
    { id: 14, number: "14", name: "滋賀 正樹", rank: 14, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.6 },
    { id: 15, number: "15", name: "京都 あい", rank: 15, problemGraspStatus: "△", problemGraspScore: "○", problemGraspMaintenance: "△", problemGraspMember: "○", problemGraspImprovement: "△", problemGraspImprovementMember: "△", solutionProposalNetwork: "○", solutionProposalPlanning: "△", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "△", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "△", roleUnderstandingLeader: "○", roleUnderstandingSupport: "△", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "△", achievement: 2.0 },
    { id: 16, number: "16", name: "大阪 雄一", rank: 16, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.7 },
    { id: 17, number: "17", name: "兵庫 真理子", rank: 17, problemGraspStatus: "○", problemGraspScore: "△", problemGraspMaintenance: "○", problemGraspMember: "△", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "△", solutionProposalPlanning: "○", solutionProposalMaintenance: "△", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "△", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "△", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.2 },
    { id: 18, number: "18", name: "奈良 孝弘", rank: 18, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.6 },
    { id: 19, number: "19", name: "和歌山 恵子", rank: 19, problemGraspStatus: "△", problemGraspScore: "△", problemGraspMaintenance: "△", problemGraspMember: "○", problemGraspImprovement: "△", problemGraspImprovementMember: "○", solutionProposalNetwork: "△", solutionProposalPlanning: "△", solutionProposalMaintenance: "△", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "△", roleUnderstandingUnderstanding: "△", roleUnderstandingLeader: "△", roleUnderstandingSupport: "△", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 1.9 },
    { id: 20, number: "20", name: "鳥取 修二", rank: 20, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.6 },
    { id: 21, number: "21", name: "島根 幸子", rank: 21, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.5 },
    { id: 22, number: "22", name: "岡山 浩", rank: 22, problemGraspStatus: "△", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "△", problemGraspImprovement: "○", problemGraspImprovementMember: "△", solutionProposalNetwork: "○", solutionProposalPlanning: "△", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "△", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "△", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "△", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.1 },
    { id: 23, number: "23", name: "広島 美和", rank: 23, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.7 },
    { id: 24, number: "24", name: "山口 賢治", rank: 24, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.6 },
    { id: 25, number: "25", name: "徳島 由美", rank: 25, problemGraspStatus: "△", problemGraspScore: "○", problemGraspMaintenance: "△", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "△", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "△", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "△", roleUnderstandingUnderstanding: "△", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "△", roleUnderstandingMember: "○", achievement: 2.2 },
    { id: 26, number: "26", name: "香川 哲也", rank: 26, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.6 },
    { id: 27, number: "27", name: "愛媛 明美", rank: 27, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.5 },
    { id: 28, number: "28", name: "高知 信夫", rank: 28, problemGraspStatus: "△", problemGraspScore: "△", problemGraspMaintenance: "○", problemGraspMember: "△", problemGraspImprovement: "△", problemGraspImprovementMember: "○", solutionProposalNetwork: "△", solutionProposalPlanning: "△", solutionProposalMaintenance: "○", solutionProposalMember: "△", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "△", roleUnderstandingLeader: "△", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "△", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.0 },
    { id: 29, number: "29", name: "福岡 春子", rank: 29, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.7 },
    { id: 30, number: "30", name: "佐賀 直樹", rank: 30, problemGraspStatus: "○", problemGraspScore: "○", problemGraspMaintenance: "○", problemGraspMember: "○", problemGraspImprovement: "○", problemGraspImprovementMember: "○", solutionProposalNetwork: "○", solutionProposalPlanning: "○", solutionProposalMaintenance: "○", solutionProposalMember: "○", solutionProposalImprovement: "○", solutionProposalImprovementMember: "○", roleUnderstandingUnderstanding: "○", roleUnderstandingLeader: "○", roleUnderstandingSupport: "○", roleUnderstandingSupervisor: "○", roleUnderstandingWorkplace: "○", roleUnderstandingMember: "○", achievement: 2.6 },
  ]);

  const tabs = [
    { key: 'table' as const, label: 'テーブル', icon: '≡' },
    { key: 'board' as const, label: 'ボード', icon: '▦' },
    { key: 'calendar' as const, label: 'カレンダー', icon: '◫' },
  ];

  // 検索・フィルター・ソート処理
  const filteredAndSortedEmployees = employees
    .filter(employee => {
      // 検索フィルター
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!employee.name.toLowerCase().includes(query) && 
            !employee.number.includes(query)) {
          return false;
        }
      }

      // 評価記号フィルター
      if (filterSymbol) {
        const allValues = [
          employee.problemGraspStatus,
          employee.problemGraspScore,
          employee.problemGraspMaintenance,
          employee.problemGraspMember,
          employee.problemGraspImprovement,
          employee.problemGraspImprovementMember,
          employee.solutionProposalNetwork,
          employee.solutionProposalPlanning,
          employee.solutionProposalMaintenance,
          employee.solutionProposalMember,
          employee.solutionProposalImprovement,
          employee.solutionProposalImprovementMember,
          employee.roleUnderstandingUnderstanding,
          employee.roleUnderstandingLeader,
          employee.roleUnderstandingSupport,
          employee.roleUnderstandingSupervisor,
          employee.roleUnderstandingWorkplace,
          employee.roleUnderstandingMember
        ];
        if (!allValues.includes(filterSymbol)) {
          return false;
        }
      }

      // 順位フィルター
      if (filterRankMin && employee.rank < parseInt(filterRankMin)) {
        return false;
      }
      if (filterRankMax && employee.rank > parseInt(filterRankMax)) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortKey === 'name') {
        comparison = a.name.localeCompare(b.name, 'ja');
      } else if (sortKey === 'rank') {
        comparison = a.rank - b.rank;
      } else if (sortKey === 'achievement') {
        comparison = a.achievement - b.achievement;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
    setShowSortMenu(false);
  };

  const clearFilters = () => {
    setFilterSymbol('');
    setFilterRankMin('');
    setFilterRankMax('');
  };

  const handleDragStart = (e: React.DragEvent, employee: Employee) => {
    // Convert TasksMain's Employee to ImportedEmployee format
    const importedEmployee: ImportedEmployee = {
      id: String(employee.id),
      name: employee.name,
      position: `順位 ${employee.rank}`,
      department: '評価部門',
      metrics: {
        creativity: Math.round(employee.achievement * 30),
        logic: Math.round(employee.achievement * 25),
        empathy: Math.round(employee.achievement * 20),
        leadership: Math.round(employee.achievement * 15),
        flexibility: Math.round(employee.achievement * 10),
      }
    };

    e.dataTransfer.setData("application/json", JSON.stringify(importedEmployee));
    if (onDragStart) {
      onDragStart(importedEmployee);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-screen overflow-hidden w-full">
      <div className="p-8 pb-0 flex-shrink-0">
        {/* ヘッダー */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-sm">
              📊
            </div>
            <h1 className="text-3xl font-bold text-gray-900">社員評価データベース</h1>
          </div>
        </div>

        {/* タブとツールバー */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1.5 font-medium transition-all rounded text-sm flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="氏名または番号で検索..."
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setShowSearchInput(false);
                      setSearchQuery('');
                    }}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowSearchInput(true)}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded flex items-center gap-1.5"
                >
                  <span>🔍</span>
                  検索
                </button>
              )}
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`px-3 py-1.5 text-sm rounded flex items-center gap-1.5 ${
                  filterSymbol || filterRankMin || filterRankMax 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>⋮⋮</span>
                フィルター
              </button>
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">フィルター</h3>
                    <button
                      onClick={() => setShowFilterMenu(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">評価記号</label>
                      <select
                        value={filterSymbol}
                        onChange={(e) => setFilterSymbol(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">すべて</option>
                        <option value="◎">◎ 優秀</option>
                        <option value="○">○ 良好</option>
                        <option value="△">△ 要改善</option>
                        <option value="×">× 不足</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">順位範囲</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={filterRankMin}
                          onChange={(e) => setFilterRankMin(e.target.value)}
                          placeholder="最小"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1"
                          max="30"
                        />
                        <span className="text-gray-500">〜</span>
                        <input
                          type="number"
                          value={filterRankMax}
                          onChange={(e) => setFilterRankMax(e.target.value)}
                          placeholder="最大"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="1"
                          max="30"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={clearFilters}
                        className="flex-1 px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded"
                      >
                        クリア
                      </button>
                      <button
                        onClick={() => setShowFilterMenu(false)}
                        className="flex-1 px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
                      >
                        適用
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded flex items-center gap-1.5"
              >
                <span>↕</span>
                並べ替え
              </button>
              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-2">
                  <button
                    onClick={() => handleSort('name')}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${
                      sortKey === 'name' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                  >
                    <span>氏名順</span>
                    {sortKey === 'name' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                  </button>
                  <button
                    onClick={() => handleSort('rank')}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${
                      sortKey === 'rank' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                  >
                    <span>順位順</span>
                    {sortKey === 'rank' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                  </button>
                  <button
                    onClick={() => handleSort('achievement')}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${
                      sortKey === 'achievement' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                  >
                    <span>育成スコア順</span>
                    {sortKey === 'achievement' && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                  </button>
                </div>
              )}
            </div>
            <button className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded flex items-center gap-1.5">
              <span>+</span>
              新規
            </button>
          </div>
        </div>
      </div>

      {/* テーブル - スクロール可能エリア */}
      <div className="flex-1 px-8 overflow-hidden">
        <div className="h-full overflow-x-auto overflow-y-auto border border-gray-200 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium text-gray-700 border-r border-gray-200 sticky left-0 bg-gray-50 z-10 min-w-[60px]">番号</th>
                <th className="px-4 py-2.5 text-left font-medium text-gray-700 border-r border-gray-200 sticky left-[60px] bg-gray-50 z-10 min-w-[120px]">氏名</th>
                <th className="px-4 py-2.5 text-left font-medium text-gray-700 border-r border-gray-200 min-w-[60px]">順位</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-blue-50 min-w-[70px]">状況把握</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-blue-50 min-w-[70px]">本質把握</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-blue-50 min-w-[90px]">維持管理業務</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-blue-50 min-w-[60px]">人</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-blue-50 min-w-[90px]">改善業務</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-blue-50 min-w-[60px]">人</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-green-50 min-w-[70px]">網羅性</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-green-50 min-w-[70px]">計画性</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-green-50 min-w-[90px]">維持管理業務</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-green-50 min-w-[60px]">人</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-green-50 min-w-[90px]">改善業務</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-green-50 min-w-[60px]">人</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-yellow-50 min-w-[70px]">主導</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-yellow-50 min-w-[70px]">連携</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-yellow-50 min-w-[80px]">連携先上司</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-yellow-50 min-w-[100px]">連携先職場外</th>
                <th className="px-3 py-2.5 text-center font-medium text-gray-700 border-r border-gray-200 bg-yellow-50 min-w-[90px]">連携先メンバー</th>
                <th className="px-4 py-2.5 text-center font-medium text-gray-700 min-w-[70px]">育成</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredAndSortedEmployees.map((employee, index) => (
                <tr
                  key={employee.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, employee)}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-grab active:cursor-grabbing ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  }`}
                >
                  <td className="px-4 py-2.5 border-r border-gray-200 sticky left-0 bg-inherit z-10">{employee.number}</td>
                  <td className="px-4 py-2.5 font-medium text-gray-900 border-r border-gray-200 sticky left-[60px] bg-inherit z-10">{employee.name}</td>
                  <td className="px-4 py-2.5 text-center border-r border-gray-200">{employee.rank}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.problemGraspStatus}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.problemGraspScore}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.problemGraspMaintenance}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.problemGraspMember}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.problemGraspImprovement}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.problemGraspImprovementMember}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.solutionProposalNetwork}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.solutionProposalPlanning}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.solutionProposalMaintenance}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.solutionProposalMember}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.solutionProposalImprovement}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.solutionProposalImprovementMember}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.roleUnderstandingUnderstanding}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.roleUnderstandingLeader}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.roleUnderstandingSupport}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.roleUnderstandingSupervisor}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.roleUnderstandingWorkplace}</td>
                  <td className="px-3 py-2.5 text-center border-r border-gray-200">{employee.roleUnderstandingMember}</td>
                  <td className="px-4 py-2.5 text-center font-medium">{employee.achievement.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* フッター情報 - 固定 */}
      <div className="px-8 py-4 border-t border-gray-200 bg-white flex-shrink-0">
        <div className="text-sm text-gray-500 flex items-center justify-between">
          <div>
            {filteredAndSortedEmployees.length !== employees.length 
              ? `全 ${employees.length} 件中 ${filteredAndSortedEmployees.length} 件を表示`
              : `全 ${employees.length} 件`}
          </div>
          <div className="flex items-center gap-2">
            <span>凡例:</span>
            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">◎ 優秀</span>
            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">○ 良好</span>
            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">△ 要改善</span>
            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">× 不足</span>
          </div>
        </div>
      </div>
    </div>
  );
}

