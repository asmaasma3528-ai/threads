import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // 2. Auto-sliding Logic
  useEffect(() => {
  if(banner.length === 0) return;
      const timer = setInterval(() => {
        setCurrentSlide((prev) => ( prev + 1) % banner.length);
      }, 3000);
      return () => clearInterval(timer);
    
  }, [banner.length]);

  return (
    <div className="container">
      {/* Banner Section */}
      {banner.length > 0 ? (
        <div className="carousel-container">
          {banner.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`slide ${index === currentSlide ? 'active' : ''}`} 
              style={{ backgroundColor: slide.bgColor }}
            >
              <div className="slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <button className="shop-now">Explore Now</button>
              </div>
              <div className="slide-icon">{slide.imageIcon}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="loading-banner">Loading seasonal offers...</div>
      )}

      {/* Product Grid Section */}
      <header className="header">
        <h1>THREADS COLLECTION</h1>
      </header>
      
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="card">
               <div className="info">
                <h3 className="name">{product.name}</h3>
                <p className="price">₹{product.price}</p>
                <button className="add-btn">Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;