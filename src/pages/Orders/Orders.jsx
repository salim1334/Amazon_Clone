import { useContext, useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import LayOut from '../../components/LayOut/LayOut';
import styles from './Orders.module.css';
import { DataContext } from '../../components/Context/Context';
import ProductCard from '../../components/Product/ProductCard';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ user }, _] = useContext(DataContext);
  console.log(orders);

  useEffect(() => {
    if (user) {

      db.collection('users')
        .doc(user.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          console.log('docs length:', snapshot.docs.length);
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
          <h2>Your Orders</h2>
          {/* Order Items */}
          {
            !orders?.length === 0 && <div style={{
              padding: '20px'
            }}>You don't have order yet.</div>
          }
          <div>
            {orders?.map((order, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {order.id}</p>
                  {order?.data?.cart?.map((product) => (
                    <ProductCard
                      product={product}
                      key={product.id}
                      cart={true}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
