import { getBalance } from '@/lib/balance';

export async function GET() {
  try {
    const total = await getBalance();

    return Response.json({
      total,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: '残高取得に失敗しました' },
      { status: 500 },
    );
  }
}
