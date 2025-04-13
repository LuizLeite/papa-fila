import { NextResponse } from 'next/server';

const allFamilies = [
  {
    id: 1,
    name: 'Alacarte',
    image: '/alacarte.png'
  },
  {
    id: 2,
    name: 'Almoço',
    image: '/almoco.png'
  },
  {
    id: 3,
    name: 'Batata Frita',
    image: '/batatafrita.png'
  },
  {
    id: 4,
    name: 'Bebidas',
    image: '/bebidas.png'
  },
  {
    id: 5,
    name: 'Cafés',
    image: '/cafes.png'
  },
  {
    id: 6,
    name: 'Carne Assada',
    image: '/carneassada.png'
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const rows = allFamilies.slice();
  const response = {
    query: {},
    data: {
      rows,
      hasMore: false,
    }
  }

  return NextResponse.json(response);
}
