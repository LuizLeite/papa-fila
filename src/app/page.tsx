import axios from 'axios';
import ProductList from './components/productList';

async function getProducts() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products?page=1`;
  const res = await axios.get(url);
  return res?.data?.products || [];
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cardápio</h1>
      <ProductList inicial={products} />
    </main>
  );
}
