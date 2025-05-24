import { useParams } from 'react-router-dom';
import LayOut from '../../components/LayOut/LayOut';
import styles from './ProductDetail.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../components/Product/ProductCard';
import Loader from '../../components/Loader/Loader';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => { 
    setIsLoading(true);
    setError(null);
    axios.get(`${productUrl}/products/${productId}`)
      .then(res => {
        setProduct(res.data);
        setIsLoading(false)
      })
      .catch(err => {
        console.error(`Error fetching product: ${err}`);
        setError('Failed to load product. Please try again later.');
        setIsLoading(false)
      })
  }, []);

  return (
    <LayOut>
      <div className={styles.product_detail_header}>
        <h1>Product Detail</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className={styles.errorMessage}> {error} </div>
      ) : (
        <div className={styles.productDetailContainer}>
          <ProductCard product={product} detail={true} />
        </div>
      )}
    </LayOut>
  );
}

export default ProductDetail