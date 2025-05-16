import styles from './Header.module.css';
import { BsSearch } from 'react-icons/bs';
import { SlLocationPin } from 'react-icons/sl';
import { BiCart } from 'react-icons/bi';
import LowerHeader from './LowerHeader';

function Header() {
  return (
    <>
      <section>
        <div className={styles.header__container}>
          <div className={styles.logo__container}>
            {/* Logo */}
            <div className={styles.logo__wrapper}>
              <a href="/">
                <img
                  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                  alt="Amazon Logo"
                  className={styles.logo}
                />
              </a>
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
            <select name="category" className={styles.search__select}>
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
            </select>

            <input
              type="text"
              placeholder="Search Amazon"
              className={styles.search__input}
            />
            <button className={styles.search__button}>
              <BsSearch size={20} />
            </button>
          </div>

          {/* Right side links */}
          <div className={styles.order__container}>
            <a href="/" className={styles.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_State.svg.png"
                alt="US Flag"
                className={styles.flag}
              />
              <select className={styles.language__select}>
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
            </a>

            {/* three components */}
            <a href="/signin" className={styles.account}>
              <p className={styles.label}>Hello, sign in</p>
              <span className={styles.bold}>Account & Lists</span>
            </a>

            {/* orders */}
            <a href="/orders" className={styles.orders}>
              <p className={styles.label}>Returns</p>
              <span className={styles.bold}>& Orders</span>
            </a>

            {/* cart */}
            <a href="/cart" className={styles.cart}>
              <BiCart size={38} className={styles.icon} />
              <span className={styles.cart__count}>0</span>
              <span className={styles.cart__label}>Cart</span>
            </a>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
}

export default Header;
