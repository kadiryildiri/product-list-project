import React from "react";
import data from "../data.json";
import ProductList from "./ProductList";

function Products({ getProduct }) {
  const handleProduct = (product) => {
    getProduct(product);
  };
  return (
    <div className="flex flex-col gap-12 px-8 py-8 md:flex-row md:flex-wrap md:justify-evenly md:pl-18 md:pr-0">
      {data.map((item, index) => (
        <ProductList key={index} data={item} handleProduct={handleProduct} />
      ))}
    </div>
  );
}

export default Products;
