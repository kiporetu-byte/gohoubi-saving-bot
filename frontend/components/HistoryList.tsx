import { Saving } from "@/types/saving";
import { formatDate } from "@/lib/format";

type HistoryListProps = {
  savings: Saving[];
};

export default function HistoryList({ savings }: HistoryListProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">貯金履歴</h2>

      {savings.length === 0 ? (
        <p className="text-sm text-gray-500">まだ履歴がありません</p>
      ) : (
        <ul className="space-y-3">
          {savings.map((saving) => (
            <li
              key={saving.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{saving.actionLabel}</p>
                <p className="text-sm text-gray-500">{saving.createdAt}</p>
              </div>
              <p className="font-semibold text-green-600">
                +{saving.amount.toLocaleString()}円
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}