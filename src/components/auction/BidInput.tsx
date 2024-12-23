interface BidInputProps {
  value: string;
  onChange: (value: string) => void;
  currency?: string;
}

export default function BidInput({ value, onChange, currency = 'USDT' }: BidInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
        placeholder="Enter your offer"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-50 px-3 py-1 rounded text-gray-600">
        {currency}
      </div>
    </div>
  );
}