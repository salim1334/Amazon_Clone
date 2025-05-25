import styles from './Header.module.css';
import { BsSearch } from 'react-icons/bs';
import { SlLocationPin } from 'react-icons/sl';
import cartIcon from '../../assets/cart-icon.png';
import logo from '../../assets/amazon_logo.png';
import LowerHeader from './LowerHeader';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../Context/Context';

function Header() {
  const [{cart}, dispatch] = useContext(DataContext);
  const productQuantity = cart.length;

  return (
    <>
      <section className={styles.upper_Header_wrapper}>
        <div className={styles.header__container}>
          <div className={styles.logo__container}>
            {/* Logo */}
            <div className={styles.logo__wrapper}>
              <Link to="/">
                <img
                  src={logo}
                  alt="Amazon Logo"
                  className={styles.logo}
                />
              </Link>
            </div>

            {/* Delivery */}
            <div className={styles.delivery}>
              <SlLocationPin className={styles.icon} />
              <div>
                <p className={styles.label}>Deliver to</p>
                <span className={styles.location}>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* search */}
          <div className={styles.search}>
            <select
              name="category"
              className={`${styles.search__select} no-style`}
            >
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
            </select>

            <input
              type="text"
              placeholder="Search Amazon"
              className={`${styles.search__input} no-style`}
            />
            <button className={styles.search__button}>
              <BsSearch size={20} />
            </button>
          </div>

          {/* Right side links */}
          <div className={styles.order__container}>
            <Link to="#" className={styles.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_State.svg.png"
                alt="US Flag"
                className={styles.flag}
              />
              <select className={`${styles.language__select} no-style`}>
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </Link>

            {/* three components */}
            <Link to="/auth" className={styles.account}>
              <p className={styles.label}>Hello, sign in</p>
              <span className={styles.bold}>Account & Lists</span>
            </Link>

            {/* orders */}
            <Link to="/orders" className={styles.orders}>
              <p className={styles.label}>Returns</p>
              <span className={styles.bold}>& Orders</span>
            </Link>

            {/* cart */}
            <Link to="/cart" className={styles.cart}>
              <img
                src={cartIcon}
                alt="Cart Icon"
                className={styles.icon}
                width='40px'
              />
              <span className={styles.cart__count}>{productQuantity}</span>
              <span className={styles.cart__label}>Cart</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
}

export default Header;
