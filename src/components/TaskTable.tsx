import { useState, useEffect } from 'react';
import { Task } from '../types';
import { X, Shield, Trash2, Inbox, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskTableProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onMoveToDraft: (id: string) => void;
  onEdit: (task: Task) => void;
  onViewData: (task: Task) => void;
}

const StatusBadge = ({ status }: { status: Task['status'] }) => {
  const styles = {
    active: 'text-emerald-700 font-semibold',
    completed: 'text-slate-500',
    draft: 'text-orange-600',
    expired: 'text-slate-400',
  };

  const dotColors = {
    active: 'bg-medical-brand',
    completed: 'bg-slate-400',
    draft: 'bg-orange-500',
    expired: 'bg-slate-300',
  };

  const labels = {
    active: '进行中',
    completed: '已截止',
    draft: '待开始',
    expired: '已失效',
  };

  return (
    <span className={`flex items-center gap-1.5 text-sm ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status]}`}></span>
      {labels[status]}
    </span>
  );
};

const TypeBadge = ({ type }: { type: string }) => {
  const getStyle = (t: string) => {
    if (t === '视频学习') return 'bg-green-50 text-green-700 border-green-200';
    if (t === '线上考试') return 'bg-slate-100 text-slate-600 border-slate-200';
    if (t === '问卷调查') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  };

  return (
    <span className={`px-2 py-1 text-sm font-bold rounded border uppercase tracking-tight ${getStyle(type)}`}>
      {type}
    </span>
  );
};

export default function TaskTable({ tasks, onDelete, onMoveToDraft, onEdit, onViewData }: TaskTableProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTasks = tasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    // Reset to first page if tasks change and current page is out of bounds
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [tasks.length, totalPages, currentPage]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleDeleteClick = (id: string) => {
    setConfirmDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (confirmDeleteId) {
      onDelete(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  const handleConfirmMoveToDraft = () => {
    if (confirmDeleteId) {
      onMoveToDraft(confirmDeleteId);
      setConfirmDeleteId(null);
      setToast('已经存入草稿箱');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">任务名称</th>
              <th className="px-4 py-4 text-center">奖励医豆</th>
              <th className="px-4 py-4">任务类型</th>
              <th className="px-4 py-4">受众群体</th>
              <th className="px-4 py-4">有效期</th>
              <th className="px-4 py-4">完成进度</th>
              <th className="pl-12 pr-4 py-4">状态</th>
              <th className="pl-12 pr-4 py-4 text-left">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedTasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-6 py-5">
                  <span className="text-sm font-medium text-slate-900 line-clamp-1">{task.name}</span>
                </td>
                <td className="px-4 py-5 text-center">
                  <span className={`text-sm font-bold ${task.points >= 100 ? 'text-medical-brand' : task.points >= 50 ? 'text-emerald-600' : 'text-orange-600'}`}>
                    +{task.points}
                  </span>
                </td>
                <td className="px-4 py-5">
                  <TypeBadge type={task.type} />
                </td>
                <td className="px-4 py-5 text-sm text-slate-600">
                  {task.audience}
                </td>
                <td className="px-4 py-5 text-sm text-slate-500">
                  {task.validity.split(' 至 ')[1]}
                </td>
                <td className="px-4 py-5 w-32">
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${task.progress}%` }}
                      className={`h-1.5 rounded-full ${task.progress === 100 ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                    />
                  </div>
                  <span className="text-sm text-slate-400 mt-1 block">{task.progress}%</span>
                </td>
                <td className="px-2 py-5 pl-12 pr-4">
                  <StatusBadge status={task.status} />
                </td>
                <td className="px-2 py-5 pl-12 pr-4">
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <button 
                      onClick={() => onEdit(task)}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      编辑
                    </button>
                    <button 
                      onClick={() => onViewData(task)}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      数据
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(task.id)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-auto border-t border-slate-100 px-6 py-4 flex justify-between items-center bg-slate-50/30 font-sans">
        <span className="text-sm text-slate-500">
          显示第 {tasks.length === 0 ? 0 : startIndex + 1} 至 {Math.min(startIndex + ITEMS_PER_PAGE, tasks.length)} 条任务，共 {tasks.length} 条
        </span>
        <div className="flex gap-1">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded border border-transparent transition-all text-slate-400 ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:border-slate-200'}`}
          >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button 
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 text-sm font-bold rounded transition-all border ${
                  currentPage === pageNum 
                    ? 'bg-medical-brand text-white border-medical-brand' 
                    : 'bg-transparent text-slate-600 border-transparent hover:bg-white hover:border-slate-200'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-2 rounded border border-transparent transition-all text-slate-400 ${currentPage === totalPages || totalPages === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:border-slate-200'}`}
          >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {confirmDeleteId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">提示</h3>
                <button 
                  onClick={() => setConfirmDeleteId(null)}
                  className="p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-slate-600 font-medium leading-relaxed">确定删除此任务？</p>
                <p className="text-xs text-slate-400 mt-1">删除后将无法恢复，建议先存入草稿箱</p>
              </div>
              <div className="p-6 bg-white flex gap-3">
                <button
                  onClick={handleConfirmMoveToDraft}
                  className="flex-1 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  存入草稿箱
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/10"
                >
                  确定删除
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[70] bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-medium text-sm">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
