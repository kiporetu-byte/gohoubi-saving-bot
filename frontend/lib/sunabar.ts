export async function transferToSaving(amount: number) {
  console.log('amount:', amount);
  const res = await fetch(process.env.SUNABAR_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': process.env.SUNABAR_API_TOKEN!,
    },
    body: JSON.stringify({
      depositSpAccountId: process.env.SUNABAR_DEPOSIT_ACCOUNT,
      debitSpAccountId: process.env.SUNABAR_DEBIT_ACCOUNT,
      paymentAmount: String(amount),
    }),
  });

  if (res.ok) {
    console.log('sunabar transfer success');
  } else {
    console.log('sunabar transfer failed');
  }
  console.log('sunabar status:', res.status);

  const data = await res.json();
  console.log('--- sunabar Response Detail ---');
  console.log(JSON.stringify(data, null, 2));
  console.log('-------------------------------');

  return res.ok;
}

// 残高照会
export async function fetchBalanceFromSunabar(lineUserId: string) {
  const balanceUrl = process.env.SUNABAR_BALANCE_URL;
  const token = process.env.SUNABAR_API_TOKEN;

  if (!balanceUrl || !token) {
    throw new Error("SUNABAR_BALANCE_URL または SUNABAR_API_TOKEN が未設定です");
  }

  const res = await fetch(balanceUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });

  const data = await res.json();
  
  console.log(lineUserId);
  console.log("--- sunabar balance response ---");
  console.log(JSON.stringify(data, null, 2));
  console.log("--------------------------------");

  if (!res.ok) {
    throw new Error("sunabar残高照会に失敗しました");
  }

  return data;
}
