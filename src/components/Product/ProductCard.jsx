import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';

function ProductCard({
  product: { title, price, rating, image, id, description, category },
  detail,
}) {
  return (
    <>
      <div
        className={`${styles.product_container} ${
          detail ? styles.product_flexed : ''
        }`}
      >
        <Link to={`/products/${id}`}>
          <div className={styles.product_image_container}>
            <img className={styles.product_image} src={image} />
          </div>
        </Link>

        <div className={`${styles.product_name} limit_text_to_2_lines`}>
          {title}
        </div>

        <div className={styles.product_rating_container}>
          <Rating value={rating?.rate} precision={0.1} />
          <div
            className={`${styles.product_rating_count} ${styles.link_primary}`}
          >
            {rating?.count}
          </div>
        </div>

        <div className={styles.product_price}>
          <CurrencyFormat amount={price} />
        </div>

        <div className={styles.product_quantity_container}>
          <select>
            <option selected value="1">
              1
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className={styles.product_spacer}></div>

        <div className={styles.added_to_cart}>
          <img src="images/icons/checkmark.png" />
          Added
        </div>

        <button
          className={`${styles.add_to_cart_button} ${styles.js_add_to_cart} button_primary `}
        >
          Add to Cart
        </button>
      </div>
      {detail && (
        <div className={styles.productDescription}>
          <h2 className={styles.descriptionTitle}>{category}</h2>
          <p>{title} <br /><br /> {description || 'No description available.'}</p>
        </div>
      )}
    </>
  );
}

export default ProductCard;
