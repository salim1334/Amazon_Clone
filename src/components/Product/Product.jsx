import axios from "axios";
import { useEffect, useState } from "react"
import ProductCard from "./ProductCard";
import styles from './Product.module.css'

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => { 
    axios.get('https://fakestoreapi.com/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }, []);

  return (
    <section className={styles.products__container}>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </section>
  );
}

export default Product