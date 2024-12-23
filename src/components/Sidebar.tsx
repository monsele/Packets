import { LayoutDashboard, Building2, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  
  const links = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Building2, label: 'My Properties', path: '/dashboard/properties' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen p-6">
      <Link to="/" className="text-blue-600 text-2xl font-bold flex items-center mb-8">
        <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded mr-2">
          <span className="transform -rotate-45">⬚</span>
        </div>
        Packets
      </Link>

      <div className="space-y-2">
        {links.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
              location.pathname === path
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon size={20} />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}