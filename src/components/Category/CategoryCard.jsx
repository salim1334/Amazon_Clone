import styles from './Category.module.css';

function CategoryCard({ data: { title, imgLink } }) {
  return (
    <div className={styles.category}>
      <a href="">
        <span>
          <h2>{title}</h2>
        </span>
        <img src={imgLink} alt={`Shop ${title} category`} />
        <p>Shop Now</p>
      </a>
    </div>
  );
}

export default CategoryCard;
