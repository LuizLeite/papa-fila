import { NextResponse } from 'next/server';

const allProducts = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  familyId: i % 6,
  name: `Produto ${i + 1}`,
  description: `Descrição do produto ${i + 1}`,
  price: Math.abs((Math.random() * 200 + 50) * 100) / 100,
  image: `/product${i + 1}.jpg`,
}));

console.log('allProducts:', allProducts)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const response = {
    query: {
    },
    data: {
      rows: allProducts,
    }
  }

  return NextResponse.json(response);
}
