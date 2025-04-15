'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';

type Family = {
  id: number;
  name: string;
  image: string;
};

type Product = {
  id: number;
  familyId: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductList({ iniFamilies, iniProducts }: { iniFamilies: Family[], iniProducts: Product[] }) {
  const [carrinho, setCarrinho] = useState([]);
  const [familyIdSelected, setFamilyIdSelected] = useState(0);
  const [families, setFamilies] = useState<Family[]>(iniFamilies);
  const [products, setProducts] = useState<Product[]>(iniProducts);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const fimRef = useRef<HTMLDivElement | null>(null);

  function handleFamily(family: Family) {
    console.log('family:', family)
    setFamilyIdSelected(family.id)
  }

  useEffect(() => {
    async function fetchData() {
      const res = await axios(`/api/families`);
      setFamilies(res.data.data.rows);
    }
    
    fetchData();
    return () => {
      console.log('Cleanup on component unmount');
    };
    }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await axios(`/api/products`);
      setProducts(res.data.data.rows);
    }
    
    fetchData();
    return () => {
      console.log('Cleanup on component unmount');
    };
  }, [page, hasMore]);

  return (
    <>
      <div className='relative flex itens-centert'>
        <div 
          id='slider'
          className='flex w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth bg-blue-100 text-white overflow-y-auto sm:no-scrollbar rounded-xl mb-2 p-1 gap-6 md:justify-center'>
          {families.map((family: Family) => (
            <div
              key={family.id}
              onClick={() => handleFamily(family)}
              className={(family.id === familyIdSelected ? 'bg-blue-400 hover:bg-blue-400' : 'hover:bg-blue-200') + ' flex flex-col h-27 justify-between object-center cursor-pointer rounded-xl'}>
              <div className='flex justify-center'>
                <Image
                  key={family.id}
                  src={family.image}
                  alt={family.name}
                  width={80}
                  height={80}
                  priority={true}
                />
              </div>
              <h2 className='text-blue-800 font-bold text-center mt-1 min-w-32'>{family.name}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-auto gap-2 md:gap-4">
        {products.map((product: Product) => familyIdSelected === product.familyId && (
          <div
              key={product.id}
              onClick={() => handleProduct(product)}
              className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative w-full h-28 md:h-32 lg:h-36 xl:h-42 2xl:h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="width: 260, height: 160"
                priority={true}
                className="object-cover"
              />
            </div>
            <div className="pt-0">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <h2 className="text-sm text-gray-500">{product.description}</h2>
              <p className="text-blue-800 text-right font-semibold pr-1">{toCurrency(product.price)}</p>
            </div>
          </div>
        ))}
      </div>
      {/* {hasMore && <div ref={fimRef} className="h-10 mt-6 text-center">Carregando mais...</div>}
      {!hasMore && <div className="text-center text-gray-400 mt-6">Todos os produtos foram carregados.</div>} */}
    </>
  );
}

function toCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function handleProduct(product: Product) {
  console.log('product:', product)
}