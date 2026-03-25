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
