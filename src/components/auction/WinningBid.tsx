interface WinningBidProps {
  user: {
    avatar: string;
    name: string;
  };
  amount: number;
}

export default function WinningBid({ user, amount }: WinningBidProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">Winning bid</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
          <span className="text-sm">{user.name}</span>
        </div>
        <span className="text-blue-500">{amount.toLocaleString()}USD</span>
      </div>
    </div>
  );
}