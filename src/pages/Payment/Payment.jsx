import { useContext, useState } from 'react';
import LayOut from '../../components/LayOut/LayOut';
import styles from './Payment.module.css';
import { DataContext } from '../../components/Context/Context';
import ProductCard from '../../components/Product/ProductCard';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../../firebase/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';
import { Type } from '../../Utility/action.type';

function Payment() {
  const [{ cart, user }, dispatch] = useContext(DataContext);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const totalItem = cart?.reduce((amount, item) => item.quantity + amount, 0);

  const total = cart?.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );

  const stripe = useStripe();
  const elements = useElements();

  function handleCard(e) {
    setCardError(null);
    if (e.error?.message) setCardError(e.error.message);
  }

  async function handleSubmitPay(e) {
    e.preventDefault();

    try {
      setProcessing(true);
      const res = await axiosInstance({
        method: 'POST',
        url: `/payment/create?total=${total * 100}`,
      });
      const clientSecret = res.data.clientSecret;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      await db
        .collection('users')
        .doc(user.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      
      dispatch({type: Type.CLEAR_CART});
      
      setProcessing(false);
      navigate('/orders', { state: { msg: 'You have placed a new order' } });
    } catch (err) {
      console.error(`❌ Error on Fetching User Secret: ${err}`);
      setProcessing(false);
    }
  }

  return (
    <LayOut>
      {/* Checkout Header */}
      <div className={styles.checkoutHeader}>
        <div className={styles.headerContent}>
          <div className={styles.checkoutHeaderLeftSection}>
            <span className={styles.amazonLogo}>Payment</span>
          </div>

          <div className={styles.checkoutHeaderMiddleSection}>
            Checkout (
            <Link to="/cart" className={styles.returnToHomeLink}>
              {totalItem} {totalItem === 1 ? 'item' : 'items'}
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
        <div className={styles.paymentContainer}>
          {/* Left Column - Delivery and Payment Info */}
          <div className={styles.paymentInfo}>
            {/* Delivery Address Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaMapMarkerAlt className={styles.sectionIcon} />
                <h3>Delivery Address</h3>
              </div>
              <div className={styles.sectionContent}>
                <p>{user?.name || user?.email}</p>
                <p>123 React Lane</p>
                <p>Chicago, IL 60601</p>
                <p>United States</p>
              </div>
            </div>

            <div className={styles.divider}></div>

            {/* Review Items Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <BsBoxSeam className={styles.sectionIcon} />
                <h3>Review items and delivery</h3>
              </div>
              <div className={styles.itemsContainer}>
                {cart?.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.itemImage}
                    />
                    <div className={styles.itemDetails}>
                      <h4 className={styles.itemTitle}>{item.title}</h4>
                      <div className={styles.itemPrice}>
                        <CurrencyFormat amount={item.price} />
                      </div>
                      <div className={styles.itemQuantity}>
                        Quantity: {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.divider}></div>

            {/* Payment Method Section */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <FaCreditCard className={styles.sectionIcon} />
                <h3>Payment Method</h3>
              </div>
              <div className={styles.paymentCardContainer}>
                <form onSubmit={handleSubmitPay} className={styles.paymentForm}>
                  {cardError && (
                    <div className={styles.errorMessage}>{cardError}</div>
                  )}

                  <div className={styles.cardElementWrapper}>
                    <CardElement
                      onChange={handleCard}
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>

                  <div className={styles.totalAmount}>
                    <span>Order Total:</span>
                    <span className={styles.amount}>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>

                  <button
                    type="submit"
                    className={styles.payButton}
                    disabled={!stripe || processing}
                  >
                    {processing ? (
                      <div className={styles.loading}>
                        <ClipLoader size={16} color="#ffffff" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <FaLock className={styles.lockIcon} />
                        <span>Confirm and Pay</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className={styles.orderSummary}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>

            <div className={styles.summaryRow}>
              <span>Items ({totalItem}):</span>
              <span>
                <CurrencyFormat amount={total} />
              </span>
            </div>

            <div className={styles.summaryRow}>
              <span>Shipping:</span>
              <span>
                <CurrencyFormat amount={0} />
              </span>
            </div>

            <div className={styles.summaryRow}>
              <span>Tax:</span>
              <span>
                <CurrencyFormat amount={0} />
              </span>
            </div>

            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Order Total:</span>
              <span>
                <CurrencyFormat amount={total} />
              </span>
            </div>

            <div className={styles.secureCheckout}>
              <FaLock className={styles.lockIcon} />
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </LayOut>
  );
}

export default Payment;
