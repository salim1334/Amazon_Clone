import { Carousel } from "react-responsive-carousel"
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './Carousel.module.css'
import { img } from './data';

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        swipeable={true}
        emulateTouch={true}
        interval={3000}
        // dynamicHeight={false}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              className={styles.arrowLeft}
            >
              ‹
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              className={styles.arrowRight}
            >
              ›
            </button>
          )
        }
      >
        {img.map((imgLink) => {
          return <img src={imgLink} />;
        })}
      </Carousel>
      <div className={styles.hero__img}></div>
    </div>
  );
}

export default CarouselEffect;