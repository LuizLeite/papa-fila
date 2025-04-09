import { NextResponse } from 'next/server';

const allProducts = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  nome: `Produto ${i + 1}`,
  preco: `R$ ${(Math.random() * 200 + 50).toFixed(2)}`,
  imagem: `/products/product${(i % 6) + 1}.jpg`,
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

  console.log('rows:', rows);

  return NextResponse.json(response);
}
