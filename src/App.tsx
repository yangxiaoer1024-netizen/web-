/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TaskTable from './components/TaskTable';
import TaskModal from './components/TaskModal';
import TaskDataModal from './components/TaskDataModal';
import { Plus, Inbox, ArrowLeft, LayoutDashboard, Users, GraduationCap, Shield, Award, Calendar, BarChart3, TrendingUp, Settings } from 'lucide-react';
import { Task } from './types';
import { AnimatePresence, motion } from 'framer-motion';

const INITIAL_TASKS: Task[] = [
// ... existing tasks ...
  {
    id: '1',
    name: '看医疗科普视频赚医豆',
    points: 50,
    type: '视频学习',
    audience: '全院人员',
    validity: '2024-01-01 至 2024-12-31',
    progress: 0,
    status: 'active',
  },
  {
    id: '2',
    name: '浏览传染病防治指南',
    points: 20,
    type: '资料查阅',
    audience: '全院人员',
    validity: '2024-01-01 至 2024-12-31',
    progress: 0,
    status: 'active',
  },
  {
    id: '3',
    name: '每日科室管理签到',
    points: 10,
    type: '每日打卡',
    audience: '全院人员',
    validity: '2024-04-01 至 2024-06-30',
    progress: 0,
    status: 'active',
  },
  {
    id: '4',
    name: '使用华医AI进行临床查询',
    points: 30,
    type: 'AI工具',
    audience: '全院医生',
    validity: '2024-01-01 至 2024-12-31',
    progress: 0,
    status: 'active',
  },
  {
    id: '5',
    name: '完善个人职称信息',
    points: 50,
    type: '资料完善',
    audience: '全院人员',
    validity: '2024-01-01 至 2024-12-31',
    progress: 100,
    status: 'completed',
  },
  {
    id: '6',
    name: '完成一节继续教育课程',
    points: 100,
    type: '视频学习',
    audience: '专业技术人员',
    validity: '2024-03-01 至 2024-12-31',
    progress: 0,
    status: 'active',
  },
  {
    id: '7',
    name: '向同事推荐学术资源',
    points: 20,
    type: '学术分享',
    audience: '全院人员',
    validity: '2024-01-01 至 2024-12-31',
    progress: 0,
    status: 'draft',
  },
  {
    id: '8',
    name: '参与医生职业发展调研',
    points: 40,
    type: '问卷调查',
    audience: '全院医生',
    validity: '2024-05-01 至 2024-05-31',
    progress: 0,
    status: 'active',
  },
  {
    id: '9',
    name: '完成科室安全知识测试',
    points: 60,
    type: '线上考试',
    audience: '全院人员',
    validity: '2024-06-01 至 2024-06-30',
    progress: 0,
    status: 'draft',
  },
  {
    id: '10',
    name: '心肺复苏(CPR)技能实操模拟',
    points: 200,
    type: '技能实操',
    audience: '全院临床人员',
    validity: '2024-05-01 至 2024-10-31',
    progress: 0,
    status: 'active',
  },
  {
    id: '11',
    name: '观看“微创手术最新进展”讲座',
    points: 80,
    type: '视频学习',
    audience: '外科医生',
    validity: '2024-06-01 至 2024-06-30',
    progress: 0,
    status: 'active',
  },
  {
    id: '12',
    name: '急诊预检分诊流程优化建议',
    points: 150,
    type: '意见征集',
    audience: '急诊科人员',
    validity: '2024-05-15 至 2024-06-15',
    progress: 0,
    status: 'draft',
  },
  {
    id: '13',
    name: '每日手卫生依从性打卡',
    points: 5,
    type: '感控督导',
    audience: '全院医护',
    validity: '2024-01-01 至 2024-12-31',
    progress: 0,
    status: 'active',
  },
  {
    id: '14',
    name: '住院医师规范化培训月考',
    points: 300,
    type: '阶段考核',
    audience: '规培生',
    validity: '2024-05-25 至 2024-05-28',
    progress: 0,
    status: 'active',
  },
  {
    id: '15',
    name: '参与“人文关怀与医患沟通”工作坊',
    points: 120,
    type: '线下培训',
    audience: '全院医护',
    validity: '2024-07-10 至 2024-07-12',
    progress: 0,
    status: 'active',
  },
  {
    id: '16',
    name: '医疗废物分类处置专项检查',
    points: 100,
    type: '现场审核',
    audience: '感控小组',
    validity: '2024-06-01 至 2024-06-07',
    progress: 0,
    status: 'draft',
  },
  {
    id: '17',
    name: '智慧医院信息系统操作反馈',
    points: 50,
    type: '用户体验',
    audience: '全院人员',
    validity: '2024-05-01 至 2024-05-31',
    progress: 100,
    status: 'completed',
  },
  {
    id: '18',
    name: '罕见病多学科联合会诊(MDT)观摩',
    points: 90,
    type: '临床教学',
    audience: '相关专科医生',
    validity: '2024-06-01 至 2024-08-31',
    progress: 0,
    status: 'active',
  },
  {
    id: '19',
    name: '2024年度高级职称评审材料初审',
    points: 200,
    type: '行政事务',
    audience: '高职申报者',
    validity: '2024-08-01 至 2024-08-31',
    progress: 0,
    status: 'active',
  },
  {
    id: '20',
    name: '科室季度满意度综合调研',
    points: 40,
    type: '管理测评',
    audience: '全院人员',
    validity: '2024-06-15 至 2024-06-30',
    progress: 0,
    status: 'active',
  },
  {
    id: '21',
    name: '参与“科研道德与学术诚信”线上答题',
    points: 60,
    type: '线上考核',
    audience: '全院科研人员',
    validity: '2024-06-01 至 2024-06-30',
    progress: 0,
    status: 'active',
  },
  {
    id: '22',
    name: '医保支付改革（DRG/DIP）系统培训',
    points: 120,
    type: '业务培训',
    audience: '行政与临床医护',
    validity: '2024-05-20 至 2024-06-20',
    progress: 0,
    status: 'active',
  },
  {
    id: '23',
    name: '儿科急诊危重症识别与处理视频课',
    points: 90,
    type: '视频学习',
    audience: '儿科医护人员',
    validity: '2024-07-01 至 2024-08-31',
    progress: 0,
    status: 'active',
  },
  {
    id: '24',
    name: '医疗纠纷预防及法律风险防范讲座',
    points: 150,
    type: '法律法规',
    audience: '全院临床医生',
    validity: '2024-06-10 至 2024-06-12',
    progress: 0,
    status: 'active',
  },
  {
    id: '25',
    name: '住院病历书写规范专项互审',
    points: 100,
    type: '质量分析',
    audience: '临床医护人员',
    validity: '2024-05-01 至 2024-05-15',
    progress: 0,
    status: 'completed',
  },
  {
    id: '26',
    name: '实验室安全防护及生物安全培训',
    points: 80,
    type: '实验安全',
    audience: '检验科人员',
    validity: '2024-06-01 至 2024-12-31',
    progress: 0,
    status: 'active',
  },
  {
    id: '27',
    name: '关注“华医网”服务号获取最新课讯',
    points: 10,
    type: '联动互动',
    audience: '全院人员',
    validity: '2024-01-01 至 2024-12-31',
    progress: 100,
    status: 'completed',
  },
  {
    id: '28',
    name: '推荐一名同行医生加入华医研习社',
    points: 30,
    type: '生态扩充',
    audience: '全院人员',
    validity: '2024-04-01 至 2024-12-31',
    progress: 0,
    status: 'active',
  },
  {
    id: '29',
    name: '“我的从医故事”微征文投稿',
    points: 200,
    type: '文化建设',
    audience: '全院人员',
    validity: '2024-05-01 至 2024-07-31',
    progress: 0,
    status: 'active',
  },
  {
    id: '30',
    name: '手术室无菌技术操作考核月度抽查',
    points: 150,
    type: '技能抽检',
    audience: '手术室护士',
    validity: '2024-06-01 至 2024-06-30',
    progress: 0,
    status: 'active',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'users' | 'courses' | 'tasks' | 'settings'>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [dataViewingTask, setDataViewingTask] = useState<Task | null>(null);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [currentView, setCurrentView] = useState<'all' | 'drafts'>('all');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filteredTasks = currentView === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === 'draft');

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'progress' | 'status'> & { id?: string; status: Task['status'] }) => {
    if (taskData.id) {
      // Edit existing task
      setTasks(prev => prev.map(t => 
        t.id === taskData.id 
          ? { ...t, ...taskData } as Task
          : t
      ));
      setSuccessMessage('任务已成功更新');
    } else {
      // Create new task
      const newTask: Task = {
        ...taskData,
        id: Math.random().toString(36).substr(2, 9),
        progress: 0,
      };
      setTasks(prev => [newTask, ...prev]);
      setSuccessMessage('已成功创建任务');
    }
    
    // Clear message after 0.5 seconds
    setTimeout(() => setSuccessMessage(null), 500);

    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleViewData = (task: Task) => {
    setDataViewingTask(task);
    setIsDataModalOpen(true);
  };

  const handleCloseDataModal = () => {
    setIsDataModalOpen(false);
    setDataViewingTask(null);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleMoveToDraft = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status: 'draft' as const } : t
    ));
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Navigation Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'tasks' ? (
            <motion.div
              key="tasks"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.2 }}
            >
              <header className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  {currentView === 'drafts' && (
                    <button 
                      onClick={() => setCurrentView('all')}
                      className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                  )}
                  <div>
                    <h1 className="text-base font-bold text-slate-900 tracking-tight">
                      {currentView === 'all' ? '医豆任务列表' : '草稿箱'}
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                      {currentView === 'all' 
                        ? '管理医疗培训与日常考核的医豆激励任务' 
                        : '管理尚未发布的医豆任务草稿'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {currentView === 'all' && (
                    <button 
                      onClick={() => setCurrentView('drafts')}
                      className="px-4 py-2 text-slate-600 rounded-lg hover:text-medical-brand transition-all flex items-center gap-2 active:scale-95 group font-medium text-sm"
                    >
                      <Inbox className="w-5 h-5 text-slate-400 group-hover:text-medical-brand" />
                      草稿箱
                      {tasks.filter(t => t.status === 'draft').length > 0 && (
                        <span className="ml-1 px-1.5 py-0.5 bg-red-50 text-red-600 text-xs rounded-full border border-red-100 flex items-center justify-center min-w-[18px]">
                          {tasks.filter(t => t.status === 'draft').length}
                        </span>
                      )}
                    </button>
                  )}
                  <button 
                    onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
                    className="px-6 py-2.5 bg-medical-brand text-white rounded-lg shadow-lg shadow-emerald-900/10 hover:opacity-90 font-medium transition-all flex items-center gap-2 active:scale-95 text-sm"
                  >
                    <Plus className="w-5 h-5" />
                    新建任务
                  </button>
                </div>
              </header>

              <div className="flex-1 flex flex-col min-h-0">
                <TaskTable 
                  tasks={filteredTasks} 
                  onDelete={handleDeleteTask}
                  onMoveToDraft={handleMoveToDraft}
                  onEdit={handleEditClick}
                  onViewData={handleViewData}
                />
              </div>
            </motion.div>
          ) : activeTab === 'home' ? (
            <motion.div
              key="home"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <header>
                <h1 className="text-base font-bold text-slate-900 tracking-tight">首页总览</h1>
                <p className="text-sm text-slate-500 mt-1">实时观测医疗平台运行核心指标与数据动态</p>
              </header>

              <div className="grid grid-cols-4 gap-6">
                {[
                  { label: '注册人员', value: '2,480', sub: '+124 本月', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
                  { label: '获得医豆', value: '45.2w', sub: '+5.4k 本日', icon: Award, color: 'text-amber-600', bg: 'bg-amber-100' },
                  { label: '活跃课程', value: '86', sub: '12 门新课', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                  { label: '任务活跃度', value: '92%', sub: '同比稳定', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                        <h3 className="text-base font-bold text-slate-900">{stat.value}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400">{stat.sub}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-8 h-80 flex items-center justify-center text-slate-300 font-medium text-sm">
                  数据趋势图表 (占位)
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h4 className="font-bold text-slate-900 mb-4 text-sm">最近动态</h4>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-medical-brand mt-1.5 shrink-0" />
                        <div>
                          <p className="text-slate-700 text-sm">心内科 <strong>张医生</strong> 完成了《高血压临床防治指南》</p>
                          <p className="text-sm text-slate-400 mt-0.5">10分钟前</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="fallback"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col items-center justify-center text-center pb-20"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6">
                {activeTab === 'users' && <Users className="w-10 h-10 text-slate-400" />}
                {activeTab === 'courses' && <GraduationCap className="w-10 h-10 text-slate-400" />}
                {activeTab === 'settings' && <Settings className="w-10 h-10 text-slate-400" />}
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {activeTab === 'users' ? '用户管理系统' : activeTab === 'courses' ? '课程管理广场' : '系统设置'}
              </h2>
              <p className="text-sm text-slate-500 mt-2 max-w-sm">
                该模块正在建设中。您可以在此管理医院{activeTab === 'users' ? '医生及其权限' : activeTab === 'courses' ? '的继续教育课程流' : '的基础运行参数'}。
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Create/Edit Task Modal */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          task={editingTask}
        />

        <TaskDataModal
          isOpen={isDataModalOpen}
          onClose={handleCloseDataModal}
          task={dataViewingTask}
        />

        <footer className="mt-auto pt-8 text-center text-slate-400 text-sm tracking-wide">
          <p>© 2024 华医网后台管理平台. All Rights Reserved.</p>
        </footer>
      </main>

      {/* Floating Success Notification */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
            className="fixed top-1/2 left-1/2 z-50 px-6 py-3 bg-emerald-600 text-white rounded-2xl shadow-xl shadow-emerald-900/30 flex items-center gap-3 font-medium border border-white/20"
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="tracking-wide text-sm">{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

