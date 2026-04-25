import { X, Calendar, Target, Users, Award, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent, useEffect } from 'react';
import { Task } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'progress' | 'status'> & { id?: string; status: Task['status'] }) => void;
  task?: Task | null;
}

export default function TaskModal({ isOpen, onClose, onSave, task }: TaskModalProps) {
  const [name, setName] = useState('');
  const [points, setPoints] = useState('50');
  const [type, setType] = useState('视频学习');
  const [audience, setAudience] = useState('全院人员');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState<Task['status']>('draft');

  useEffect(() => {
    if (task) {
      setName(task.name);
      setPoints(task.points.toString());
      setType(task.type);
      setAudience(task.audience);
      const [start, end] = task.validity.split(' 至 ');
      setStartDate(start || '');
      setEndDate(end || '');
      setStatus(task.status);
    } else if (isOpen) {
      // Reset only if opening for new task
      setName('');
      setPoints('50');
      setType('视频学习');
      setAudience('全院人员');
      setStartDate('');
      setEndDate('');
      setStatus('draft');
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('请输入任务名称');
      return;
    }

    if (!points) {
      alert('请输入奖励医豆');
      return;
    }

    if (!startDate || !endDate) {
      alert('请设置有效期');
      return;
    }

    onSave({
      id: task?.id,
      name,
      points: parseInt(points),
      type,
      audience,
      validity: `${startDate} 至 ${endDate}`,
      status,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-medical-brand/10 rounded-xl text-medical-brand">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">{task ? '编辑任务' : '新建任务'}</h2>
                <p className="text-xs text-slate-500">配置医疗培训任务与激励参数</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="overflow-hidden flex flex-col">
          <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Task Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Target className="w-4 h-4 text-medical-brand" /> 任务名称
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如：观看中医基础视频30分钟"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-brand/20 focus:border-medical-brand transition-all font-sans"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Reward Points */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Award className="w-4 h-4 text-medical-brand" /> 奖励医豆
                </label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  placeholder="50"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-brand/20 focus:border-medical-brand transition-all"
                />
              </div>

              {/* Task Type */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-medical-brand" /> 任务类型
                </label>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-brand/20 focus:border-medical-brand transition-all appearance-none cursor-pointer"
                >
                  <option>视频学习</option>
                  <option>线上考试</option>
                  <option>问卷调查</option>
                  <option>科室分享</option>
                </select>
              </div>
            </div>

            {/* Audience */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Users className="w-4 h-4 text-medical-brand" /> 受众群体
              </label>
              <select 
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-brand/20 focus:border-medical-brand transition-all"
              >
                <option>全院人员</option>
                <option>全院医生</option>
                <option>主治医师</option>
                <option>注册护士</option>
                <option>行政人员</option>
              </select>
            </div>

            {/* Validity Period */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-medical-brand" /> 有效期设置
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-brand/20 focus:border-medical-brand transition-all"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-brand/20 focus:border-medical-brand transition-all"
                />
              </div>
            </div>

            {/* Status */}
            <div className="p-4 bg-medical-brand/5 rounded-2xl border border-medical-brand/10">
              <label className="text-sm font-semibold text-medical-brand block mb-3">立即发布任务？</label>
              <div className="flex gap-4">
                <label className="flex-1 flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl cursor-pointer hover:border-medical-brand transition-all">
                  <input 
                    type="radio" 
                    name="status" 
                    checked={status === 'draft'} 
                    onChange={() => setStatus('draft')}
                    className="w-4 h-4 accent-medical-brand" 
                  />
                  <span className="text-sm font-medium text-slate-700">保存为草稿</span>
                </label>
                <label className="flex-1 flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl cursor-pointer hover:border-medical-brand transition-all">
                  <input 
                    type="radio" 
                    name="status" 
                    checked={status === 'active'} 
                    onChange={() => setStatus('active')}
                    className="w-4 h-4 accent-medical-brand" 
                  />
                  <span className="text-sm font-medium text-slate-700">立即上线</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-xl transition-all"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-medical-brand text-white font-bold rounded-xl shadow-lg shadow-emerald-900/10 hover:opacity-90 active:scale-95 transition-all"
            >
              {task ? '保存更改' : '创建任务'}
            </button>
          </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
