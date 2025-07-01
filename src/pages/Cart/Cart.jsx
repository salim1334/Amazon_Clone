import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../components/Context/Context';
import LayOut from '../../components/LayOut/LayOut';
import ProductCard from '../../components/Product/ProductCard';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { Type } from '../../Utility/action.type';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaLock } from 'react-icons/fa';
import styles from './Cart.module.css';

function Cart() {
  const [{ cart }, dispatch] = useContext(DataContext);

  const total = cart?.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  function inc(item) {
    dispatch({
      type: Type.ADD_TO_CART,
      item,
    });
  }

  function dec(id) {
    dispatch({
      type: Type.REMOVE_FROM_CART,
      id,
    });
  }

  return (
    <LayOut>
      {/* Checkout Header */}
      <div className={styles.checkoutHeader}>
        <div className={styles.headerContent}>
          <div className={styles.checkoutHeaderLeftSection}>
            <span className={styles.amazonLogo}>Your Order</span>
          </div>

          <div className={styles.checkoutHeaderMiddleSection}>
            Checkout (
            <Link to="/cart" className={styles.returnToHomeLink}>
              {cart?.length} {cart?.length === 1 ? 'item' : 'items'}
            </Link>
            )
          </div>

          <div className={styles.checkoutHeaderRightSection}>
            <FaLock />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        <h1 className={styles.pageTitle}>Review your order</h1>

        <div className={styles.checkoutGrid}>
          {/* Left Column - Order Summary */}
          <div className={styles.orderSummary}>
            {cart?.length === 0 ? (
              <div className={styles.emptyCart}>
                <h2>Your Amazon Cart is empty</h2>
                <Link to="/" className={styles.shopLink}>
                  Shop today's deals
                </Link>
              </div>
            ) : (
              <>
                <div className={styles.deliveryDate}>
                  Delivery date:
                  {deliveryDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>

                {cart?.map((product) => (
                  <div key={product.id} className={styles.cartItemContainer}>
                    <div className={styles.cartItemDetailsGrid}>
                      <div className={styles.productImageContainer}>
                        <img
                          src={product.image}
                          alt={product.title}
                          className={styles.productImage}
                        />
                      </div>

                      <div className={styles.productDetails}>
                        <div className={styles.productName}>
                          {product.title}
                        </div>
                        <div className={styles.productPrice}>
                          <CurrencyFormat amount={product.price} />
                        </div>
                        <div className={styles.productAvailability}>
                          In Stock
                        </div>
                        <div className={styles.productActions}>
                          <div className={styles.quantitySelector}>
                            <button
                              onClick={() => dec(product.id)}
                              className={styles.quantityButton}
                            >
                              <IoIosArrowDown />
                            </button>
                            <span>{product.quantity}</span>
                            <button
                              onClick={() => inc(product)}
                              className={styles.quantityButton}
                            >
                              <IoIosArrowUp />
                            </button>
                          </div>
                          <button
                            className={styles.deleteButton}
                            onClick={() => dec(product.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Right Column - Payment Summary */}
          {cart?.length > 0 && (
            <div className={styles.paymentSummary}>
              <div className={styles.paymentSummaryTitle}>Order Summary</div>

              <div className={styles.paymentSummaryRow}>
                <span>Subtotal ({cart?.length} items):</span>
                <span className={styles.paymentSummaryMoney}>
                  <CurrencyFormat amount={total} />
                </span>
              </div>

              <div className={styles.paymentSummaryRow}>
                <span>Shipping:</span>
                <span className={styles.paymentSummaryMoney}>
                  <CurrencyFormat amount={0} />
                </span>
              </div>

              <div
                className={`${styles.paymentSummaryRow} ${styles.subtotalRow}`}
              >
                <span>Total before tax:</span>
                <span className={styles.paymentSummaryMoney}>
                  <CurrencyFormat amount={total} />
                </span>
              </div>

              <div className={`${styles.paymentSummaryRow} ${styles.totalRow}`}>
                <span>Order Total:</span>
                <span className={styles.paymentSummaryMoney}>
                  <CurrencyFormat amount={total} />
                </span>
              </div>
              
              <Link to="/payments">
                <button className={styles.placeOrderButton}>
                  place Your Order
                </button>
              </Link>

              <div className={styles.secureCheckout}>
                <FaLock className={styles.lockIcon} />
                <span>Secure checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayOut>
  );
}

export default Cart;
