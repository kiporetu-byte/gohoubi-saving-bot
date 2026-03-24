type BalanceCardProps = {
  total: number;
};

export default function BalanceCard({ total }: BalanceCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">現在の残高</p>
      <h2 className="mt-2 text-3xl font-bold text-green-600">
        {total.toLocaleString()}円
      </h2>
    </div>
  );
}