import { NextResponse } from 'next/server';

const allProducts = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Produto ${i + 1}`,
  description: `Descrição do produto ${i + 1}`,
  price: `R$ ${(Math.random() * 200 + 50).toFixed(2)}`,
  image: `/product${i + 1}.webp`,
}));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 6;
  const start = (page - 1) * limit;
  const end = start + limit;

  const rows = allProducts.slice(start, end);
  const response = {
    query: {
      page,
      limit
    },
    data: {
      rows,
      hasMore: end < allProducts.length,
    }
  }

  return NextResponse.json(response);
}
