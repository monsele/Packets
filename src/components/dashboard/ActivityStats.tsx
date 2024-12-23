interface ActivityStat {
  label: string;
  value: string;
  icon: string;
}

export default function ActivityStats({ stats }: { stats: ActivityStat[] }) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-lg flex items-center gap-4">
          <div className={`${stat.icon} w-8 h-8 rounded-full flex items-center justify-center`} />
          <div>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="font-semibold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}