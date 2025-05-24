import { Link } from 'react-router-dom';
import styles from './Category.module.css';

// Renders a single category card with a link
function CategoryCard({ data: { title, imgLink, name } }) {
  
  console.log(name);
  return (
    <div className={styles.category}>
      <Link to={`/category/${name}`}>
        <h2>{title}</h2>
        <img src={imgLink} alt={`Shop ${title} category`} />
        <p className={styles.shopNow}>Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
