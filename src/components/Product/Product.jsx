import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import styles from './Product.module.css';
import Loader from '../Loader/Loader';

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
        setTimeout(() => setIsLoading(false), 500);
      })
      .catch((err) => {
        console.error(`Error on Fetching product: ${err}`);
        setTimeout(() => setIsLoading(false), 500);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={styles.products__container}>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
