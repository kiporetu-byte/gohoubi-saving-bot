import BalanceCard from "@/components/BalanceCard";
import HistoryList from "@/components/HistoryList";
import { Saving } from "@/types/saving";

const mockSavings: Saving[] = [
  {
    id: "1",
    actionLabel: "運動した",
    amount: 500,
    createdAt: "2026-03-24",
  },
  {
    id: "2",
    actionLabel: "スタバ我慢した",
    amount: 500,
    createdAt: "2026-03-23",
  },
];

const mockBalance = {
  total: 1000,
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">ごほうび貯金</h1>

        <BalanceCard total={mockBalance.total} />

        <HistoryList savings={mockSavings} />
      </div>
    </main>
  );
}