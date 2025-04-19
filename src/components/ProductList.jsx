import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

function ProductList({ data, handleProduct }) {
  const { image, name, category, price } = data;
  const [count, setCount] = useState(0);

  const addToCart = () => {
    setCount(1);
    const productInfo = {
      productName: name,
      productPrice: price,
      productCount: count + 1,
    };
    handleProduct(productInfo);
  };

  const decrease = () => {
    if (count < 0) return;
    setCount(count - 1);
    const productInfo = {
      productName: name,
      productPrice: price,
      productCount: count - 1,
    };
    handleProduct(productInfo);
  };

  const increase = () => {
    setCount(count + 1);
    const productInfo = {
      productName: name,
      productPrice: price,
      productCount: count + 1,
    };
    handleProduct(productInfo);
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <img className="h-48 w-full rounded-md" src={image.mobile} alt="" />
        {count === 0 ? (
          <button
            className="flex items-center gap-2 absolute -bottom-5  left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-4xl border border-rose-400"
            onClick={() => {
              addToCart();
            }}
          >
            <MdAddShoppingCart className="text-rose-300 text-xl" />
            Add to Cart
          </button>
        ) : (
          <button className="flex items-center justify-between gap-5 absolute -bottom-5  left-1/2 -translate-x-1/2 px-4 py-2 rounded-4xl bg-red text-xl text-white">
            <CiCircleMinus onClick={() => decrease()} />
            {count}
            <CiCirclePlus onClick={() => increase()} />
          </button>
        )}
      </div>
      <div className="text-sm flex flex-col gap-1">
        <p className="text-rose-400">{category}</p>
        <h2 className="font-semibold text-rose-900">{name}</h2>
        <p className="font-semibold text-red ">${price}</p>
      </div>
    </div>
  );
}

export default ProductList;
