import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  iconColor: string;
}

export default function StatCard({ label, value, subValue, icon: Icon, iconColor }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600">{label}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {subValue && <p className="text-sm text-gray-500">{subValue}</p>}
        </div>
        <div className={`p-3 rounded-full ${iconColor}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}