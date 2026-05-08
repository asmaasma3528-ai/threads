import { useEffect, useState } from "react";
import axios from "axios";
import "../StyleSheet/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // 1. Fetching Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axios.get('http://localhost:5000/api/products');
        const bannerRes = await axios.get('http://localhost:5000/api/banners');
        
        setProducts(productRes.data);
        setBanner(bannerRes.data);
      } catch (err) {
        console.log("Error fetching data:", err.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(banner.length === 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [banner.length, currentSlide]);

   const handleNext = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev+1);
   };

   useEffect(() => {
    if(currentSlide === banner.length){
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 600);
    }
   }, [currentSlide, banner.length]);

  return(
    <div className="container">
      {banner.length > 0 ? (
        <div className="carousel-view">
          <div
          className="carousel-track"
          style={{transform:`translateX(-${currentSlide * 100}%)`,
         transition: isTransitioning ? 'transform 0.6s ease-in-out' : 'none'
        }}
          >
            {banner.map((slide, index) => (
              <div key = {slide.id}
              className="slide-item"
              style={{backgroundColor:slide.bgColor}}
              onClick={() => window.location.href = `/offers/${slide.id}`}
              >

                <div className="slide-content">
                  <h2>{banner[0].title}</h2>
                  <p>{banner[0].subtitle}</p>
                  
                  </div>
                  <div className="slide-icon">{banner[0].imageIcon}</div>
                  </div>
            ))}
          </div>
          </div>
      ) : (
        <div className="loading-banner">
          Loading Seasonal Offers...</div>
      )
    }

    <header className="header">
      <h1>THREADS COLLECTION</h1>
    </header>

    <div className="product-grid">
      {products.length > 0 ? (products.map((product) => (
        <div key={product.id} className="card">
          <div className="info">
            <h3 className="name">
              {product.name}
            </h3>
            <p className="price">₹{product.price}</p>
            <button className="add-btn">Add to Cart</button>
            </div>
            </div>
      ))
    ) : (
      <p>No products found.</p>
    )
  }
    </div>
    </div>
  )
};

export default Home;