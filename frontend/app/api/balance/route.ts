import { getBalance } from '@/lib/balance';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lineUserId = searchParams.get("lineUserId");

    console.log("balance route lineUserId:", lineUserId);

    if (!lineUserId) {
      return Response.json(
        { message: "lineUserId is required" },
        { status: 400 }
      );
    }

    const total = await getBalance(lineUserId);

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
