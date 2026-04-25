export interface Task {
  id: string;
  name: string;
  points: number;
  type: string;
  audience: string;
  validity: string;
  progress: number;
  status: 'active' | 'completed' | 'draft' | 'expired';
}

export interface NavItem {
  key: string;
  label: string;
  icon: string; // will map to Lucide icons
}
