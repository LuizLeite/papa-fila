import axios from 'axios';
import ProductList from './components/productList';

async function getFamilies() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/families`;
  const res = await axios.get(url);
  console.log('res.data.data.rows:', res.data.data.rows)
  return res?.data?.families || [];
}

async function getProducts() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products?page=1`;
  const res = await axios.get(url);
  return res?.data?.products || [];
}

export default async function HomePage() {
  const families = await getFamilies()
  const products = await getProducts();

  return (
    <main className="p-2">
      <h1 className="text-center md:text-left text-2xl font-bold mb-0">Fresco Tempero</h1>
      <ProductList
        iniFamilies={families}
        iniProducts={products}
      />
    </main>
  );
}
