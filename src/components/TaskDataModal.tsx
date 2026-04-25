import { X, TrendingUp, Users, Award, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface TaskDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

// Mock chart data
const CHART_DATA = [
  { day: '周一', value: 45 },
  { day: '周二', value: 52 },
  { day: '周三', value: 48 },
  { day: '周四', value: 70 },
  { day: '周五', value: 65 },
  { day: '周六', value: 85 },
  { day: '周日', value: 92 },
];

export default function TaskDataModal({ isOpen, onClose, task }: TaskDataModalProps) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-medical-brand/10 rounded-xl flex items-center justify-center text-medical-brand">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">任务数据分析</h3>
              <p className="text-xs text-slate-400">正在查看: {task.name}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            {[
              { label: '参与人数', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: '发放医豆', value: (1284 * task.points).toLocaleString(), icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: '完成率', value: `${task.progress}%`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                <div className={`${stat.bg} ${stat.color} w-8 h-8 rounded-lg flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                <h4 className="text-xl font-bold text-slate-900 mt-1">{stat.value}</h4>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">参与活跃度趋势 (近7天)</h4>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-medical-brand"></span>
                  完成次数
                </span>
              </div>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                      fontSize: '12px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-slate-900/10"
          >
            关闭详情
          </button>
        </div>
      </motion.div>
    </div>
  );
}
