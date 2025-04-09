'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';

type Product = {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
};

export default function ProductList({ inicial }: { inicial: Product[] }) {
  const [products, setProduct] = useState<Product[]>(inicial);
  const [page, setPage] = useState(2); // já carregamos a página 1 no SSR
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const fimRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        const res = await axios(`/api/products?page=${page}`);
        console.log('---> res:', res);
        setProduct((prev) => [...prev, ...res.data.data.rows]);
        setPage((p) => p + 1);
        setHasMore(res?.data?.hasMore || false);
      }
    });

    if (fimRef.current) observer.current.observe(fimRef.current);
  }, [page, hasMore]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <div key={product.id} className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative w-full h-48">
              <Image
                src={product.imagem}
                alt={product.nome}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.nome}</h2>
              <p className="text-gray-500">{product.preco}</p>
            </div>
          </div>
        ))}
      </div>
      {hasMore && <div ref={fimRef} className="h-10 mt-6 text-center">Carregando mais...</div>}
      {!hasMore && <div className="text-center text-gray-400 mt-6">Todos os produtos foram carregados.</div>}
    </>
  );
}
