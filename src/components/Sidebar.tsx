import { LayoutDashboard, Users, BookOpen, CheckSquare, Coins, Activity, UserCircle, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: '首页', key: 'home' },
  { icon: Users, label: '用户管理', key: 'users' },
  { icon: CheckSquare, label: '任务管理', key: 'tasks' },
  { icon: BookOpen, label: '课程管理', key: 'courses' },
  { icon: Coins, label: '系统设置', key: 'settings' },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (key: any) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <div className="w-64 bg-sidebar-bg h-screen flex flex-col fixed left-0 top-0 shadow-xl z-20">
      <div className="p-6 flex items-center gap-3">
        <Activity className="w-8 h-8 text-medical-brand" />
        <span className="text-white font-bold text-base tracking-wider">华医网后台管理</span>
      </div>

      <nav className="mt-4 flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.key}
            onClick={() => onTabChange(item.key)}
            className={`flex items-center px-4 py-3 cursor-pointer transition-all duration-200 group rounded-xl ${
              activeTab === item.key 
                ? 'bg-medical-brand/10 text-white font-medium' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <item.icon className={`w-5 h-5 mr-4 ${activeTab === item.key ? 'text-medical-brand' : ''}`} />
            <span className="text-sm">{item.label}</span>
            {activeTab === item.key && (
              <motion.div
                layoutId="active-nav"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-medical-brand"
              />
            )}
          </div>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-700 relative" ref={profileRef}>
        <AnimatePresence>
          {showProfileMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-20 left-4 right-4 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden py-2 z-30"
            >
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm">
                <UserCircle className="w-4 h-4" />
                <span>切换账户</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors text-sm">
                <LogOut className="w-4 h-4" />
                <span>退出登录</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-3 text-slate-400 group cursor-pointer hover:text-white transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-slate-600 overflow-hidden ring-2 ring-transparent group-hover:ring-medical-brand/50 transition-all">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100" 
              alt="Profile" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
            />
          </div>
          <span className="text-xs">管理员 ID: 8821</span>
        </div>
      </div>
    </div>
  );
}
