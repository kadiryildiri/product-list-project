import { useState, useEffect } from "react";
import "./App.css";
import Products from "./components/Products";
import Cart from "./components/Cart";

function App() {
  const [cartProducts, setCartProducts] = useState([]);

  const handleRemove = (productNameToRemove) => {
    setCartProducts((prev) =>
      prev.filter((item) => item.productName !== productNameToRemove)
    );
  };

  const getProduct = (newProduct) => {
    setCartProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex(
        (item) => item.productName === newProduct.productName
      );

      if (existingProductIndex !== -1) {
        if (newProduct.productCount === 0) {
          return prevProducts.filter(
            (item) => item.productName !== newProduct.productName
          );
        }

        const updatedProducts = [...prevProducts];
        updatedProducts[existingProductIndex].productCount =
          newProduct.productCount;
        return updatedProducts;
      }

      if (newProduct.productCount > 0) {
        return [...prevProducts, newProduct];
      }

      return prevProducts;
    });
  };

  useEffect(() => {}, [cartProducts]);

  return (
    <div className="flex flex-col md:flex-row bg-rose-50 font-red-hat py-8">
      <div className="md:w-7/10">
        <h1 className="font-bold text-4xl px-8 md:pl-18">Desserts</h1>
        <Products getProduct={getProduct} />
      </div>
      <Cart products={cartProducts} onRemove={handleRemove} />
    </div>
  );
}

export default App;
