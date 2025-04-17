import { NextResponse } from 'next/server';

const allFamilies = [
  {
    id: 0,
    name: 'Alacarte',
    image: '/alacarte.png'
  },
  {
    id: 1,
    name: 'Almoço',
    image: '/almoco.png'
  },
  {
    id: 2,
    name: 'Batata Frita',
    image: '/batatafrita.png'
  },
  {
    id: 3,
    name: 'Bebidas',
    image: '/bebidas.png'
  },
  {
    id: 4,
    name: 'Cafés',
    image: '/cafes.png'
  },
  {
    id: 5,
    name: 'Carne Assada',
    image: '/carneassada.png'
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const rows = allFamilies;
  const response = {
    query: {},
    data: {
      rows
    }
  }

  return NextResponse.json(response);
}
