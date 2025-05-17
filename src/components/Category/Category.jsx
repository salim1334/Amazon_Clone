import CategoryCard from './CategoryCard';
import { categoryInfos } from './categoryFullInfos';
import styles from './Category.module.css';

function Category() {
  return (
    <section className={styles.category__container}>
      {categoryInfos.map((info) => (
        <CategoryCard data={info} />
      ))}
    </section>
  );
}

export default Category;
