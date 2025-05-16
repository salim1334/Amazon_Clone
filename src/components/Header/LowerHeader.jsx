import { AiOutlineMenu } from 'react-icons/ai';
import styles from './LowerHeader.module.css';

function LowerHeader() {
  return (
    <nav className={styles.lower__container}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__item}>
          <AiOutlineMenu className={styles.icon} />
          <span>All</span>
        </li>
        <li className={styles.nav__item}>Today's Deals</li>
        <li className={styles.nav__item}>Customer Service</li>
        <li className={styles.nav__item}>Registry</li>
        <li className={styles.nav__item}>Gift Cards</li>
        <li className={styles.nav__item}>Sell</li>
      </ul>
    </nav>
  );
}

export default LowerHeader;
