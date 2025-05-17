import CarouselEffect from "../../components/Carousel/Carousel"
import Category from "../../components/Category/Category"
import Header from "../../components/Header/Header"
import Product from "../../components/Product/Product"

function Home() {
  return (
    <div>
      <Header />
      <CarouselEffect />
      <Category />
      <Product />
    </div>
  )
}

export default Home