import { useState } from 'react'
import { useEffect } from "react";
import './App.css'
import ProductList from './ProductList';
import CategoryFilter from './CategoryFilter';


function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);


  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then(response => response.json())
      .then(data => setProducts(data));
    
    fetch("http://localhost:8080/api/categories")
      .then(response => response.json())
      .then(data => setCategories(data));

  }, []);
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId? Number(categoryId) : null);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category.id === selectedCategory : true;
    const matchesSearch = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  })
  .sort((a, b) =>
    sortOrder === "asc"
      ? a.price - b.price
      : b.price - a.price
  );


  return (
    <div className="container">
      <h1 className="my-4">Product Catalog</h1>
      <div className="row align-items-center mb-4">
        <div className="col-md-3 col-sm-12 mb-12">
          <CategoryFilter categories={categories} onSelect={handleCategorySelect} />
        </div>
        <div className="col-md-5 col-sm-12 mb-2">
          <input type="text" className="form-control" placeholder="Search products..." value={searchTerm}
            onChange={handleSearchChange} />
        </div>
        <div className="col-md-4 col-sm-12 mb-2">
          <select className="form-control" value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Sort Ascending</option>
            <option value="desc">Sort Descending</option>
          </select>
        </div>
      </div>
      <div>
        {filteredProducts.length > 0 ? (
          //Display products
          <ProductList products={filteredProducts} />
        ) : (
          <p>Loading products...</p>
        )
        }
      </div>

    </div>




  )
}

export default App
