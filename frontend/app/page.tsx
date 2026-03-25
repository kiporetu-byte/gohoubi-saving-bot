"use client";

import { useEffect, useState } from "react";
import BalanceCard from "@/components/BalanceCard";
import HistoryList from "@/components/HistoryList";
import { Saving } from "@/types/saving";

export default function Home() {
  const [savings, setSavings] = useState<Saving[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const historyRes = await fetch("/api/history");
      const historyData = await historyRes.json();
      setSavings(historyData);

      const balanceRes = await fetch("/api/balance");
      const balanceData = await balanceRes.json();
      setTotal(balanceData.total);
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-gray-500">ごほうび貯金</h1>
        <BalanceCard total={total} />
        <HistoryList savings={savings} />
      </div>
    </main>
  );
}