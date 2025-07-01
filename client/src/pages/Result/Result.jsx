import { useParams } from 'react-router-dom';
import LayOut from '../../components/LayOut/LayOut';
import styles from './Result.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../components/Product/ProductCard';
import Loader from '../../components/Loader/Loader';

function Result() {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatted = categoryName.toLocaleLowerCase();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${formatted}`)
      .then((res) => {
        console.log(`${productUrl}/products/category/${formatted}`);
        setResults(res.data);
        setTimeout(() => setIsLoading(false), 500);
      })
      .catch((err) => {
        console.error(`Error on fetching category product: ${err}`);
        setTimeout(() => setIsLoading(false), 500);
      });
  }, []);

  return (
    <LayOut>
      <section className={styles.results__container}>
        <h1>Results</h1>
        <p>Category / {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : results.length === 0 ? (
          <p className={styles.noResults}>
            🚫 No products found in this category.
          </p>
        ) : (
          <div className={styles.products_container}>
            {results?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Result;
