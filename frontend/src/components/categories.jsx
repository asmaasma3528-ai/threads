import react from "react";
import "../StyleSheet/Categories.css";

const Categories = () => {
  const categories = [
    { name: "Grocery", icon: "🛒" },
    { name: "Mobiles", icon: "📱" },
    { name: "Fashion", icon: "👕" },
    { name: "Electronics", icon: "💻" },
    { name: "Home & Furniture", icon: "🏠" },
    { name: "Appliances", icon: "📺" },
    { name: "Travel", icon: "✈️" },
    { name: "Beauty, Toys and more", icon: "💄" },
  ];

  return (
    <div className="categories-container">
      {categories.map((cat, index) => (
        <div key={index} className="category-item">
          <span className="category-icon">{cat.icon}</span>
          <span className="category-name">{cat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
