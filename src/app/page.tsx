'use client'

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProductList from './components/productList';
import { useCarrinho } from './stores/globalStore';

// async function getFamilies() {
//   const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/families`;
//   const res = await axios.get(url);
//   console.log('Familia: res.data.data.rows:', res.data.data.rows)
//   return res?.data?.families || [];
// }

// async function getProducts() {
//   const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`;
//   const res = await axios.get(url);
//   console.log('Produto: res.data.data.rows:', res.data.data.rows)
//   return res?.data?.products || [];
// }

export default function HomePage() {
  const [families, setFamilies] = useState([]);
  const [products, setProducts] = useState([]);
  const qTotal = useCarrinho((state) => state.state.qtdTotal)

  useEffect(() => {
    async function fetchData() {
      const res = await axios(`/api/families`);
      console.log(res.data.data.rows)
      setFamilies(res.data.data.rows)
    }
    
    fetchData();

    return () => {
      console.log('Cleanup on component unmount');
    };
    }, []
  );

  useEffect(() => {
    async function fetchData() {
      const res = await axios(`/api/products`);
      console.log(res.data.data.rows)
      setProducts(res.data.data.rows)
    }
    
    fetchData();

    return () => {
      console.log('Cleanup on component unmount');
    };
    }, []
  );

  // const families = getFamilies()
  // const products = await getProducts();
  // const {
  //     state: { itens, qtdTotal, valTotal },
  //     actions: {addItem, delItem}
  //   } = useCarrinho()

  return (
    <main className="p-2">
      <div className='flex flex-row justify-between'>
        <h1 className="text-center md:text-left text-2xl font-bold mb-0">Fresco Tempero</h1>
          <div className='flex flex-row'>
            <Image
              src='/carrinho.jpg'
              alt='Carrinho'
              width={32}
              height={32}
              priority={true}
            />
            <span className="inline-flex items-center rounded-xl bg-pink-200 h-6 -mt-2 px-2 py-1 text-sm text-red-900 font-bold ring-1 ring-pink-500 ring-inset">{qTotal}</span>
          </div>
      </div>
      <ProductList
        iniFamilies={families}
        iniProducts={products}
      />
    </main>
  );
}
