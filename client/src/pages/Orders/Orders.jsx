import { useContext, useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import LayOut from '../../components/LayOut/LayOut';
import styles from './Orders.module.css';
import { DataContext } from '../../components/Context/Context';
import ProductCard from '../../components/Product/ProductCard';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ user }, _] = useContext(DataContext);

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={styles.container}>
        <div className={styles.orders__container}>
          <h2 className={styles.title}>Your Orders</h2>

          {orders.length === 0 ? (
            <div className={styles.empty}>
              <p>You don't have any orders yet.</p>
            </div>
          ) : (
            <div className={styles.orders_list}>
              {orders.map((order) => (
                <div key={order.id} className={styles.order_card}>
                  <div className={styles.order_header}>
                    <p className={styles.order_id}>Order #: {order.id}</p>
                  </div>

                  <div className={styles.products_list}>
                    {order?.data?.cart?.map((product) => (
                      <ProductCard
                        product={product}
                        key={product.id}
                        cart={true}
                        notDisplayAdd={true}
                        order={true}
                      />
                    ))}
                  </div>

                  <div className={styles.order_footer}>
                    <p className={styles.order_total}>
                      Total: ${order.data.amount / 100}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
