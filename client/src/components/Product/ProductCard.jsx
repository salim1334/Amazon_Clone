import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { DataContext } from '../Context/Context';
import { Type } from '../../Utility/action.type';

function ProductCard({
  product: { title, price, rating, image, id, description, category },
  detail,
  cart,
  notDisplayAdd,
  order
}) {
  const addedText = useRef(null);
  const [quantity, setQuantity] = useState(1);

  const [_, dispatch] = useContext(DataContext);

  function addToCart() {
    dispatch({
      type: Type.ADD_TO_CART,
      item: {
        title,
        price,
        rating,
        image,
        id,
        description,
        category,
        quantity: quantity
      },
    });

    if (addedText.current) {
      addedText.current.style.opacity = 1;

      setTimeout(() => {
        addedText.current.style.opacity = 0;
      }, 3000);
    }
  }

  return (
    <>
      <div
        className={`${styles.product_container} ${
          detail ? styles.product_flexed : ''
        }  ${cart ? styles.product_cart : ''}`}
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

        {!order && (
          <div className={styles.product_quantity_container}>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
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
        )}

        <div className={styles.product_spacer}></div>

        {!notDisplayAdd && !order && (
          <div className={styles.added_to_cart} ref={addedText}>
            <img src="/checkmark.png" />
            Added
          </div>
        )}

        {notDisplayAdd ? (
          ''
        ) : (
          <button
            className={`${styles.add_to_cart_button}  button_primary`}
            onClick={addToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
      {detail && (
        <div className={styles.productDescription}>
          <h2 className={styles.descriptionTitle}>{category}</h2>
          <p>
            {title} <br />
            <br /> {description || 'No description available.'}
          </p>
        </div>
      )}
    </>
  );
}

export default ProductCard;
