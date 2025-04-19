import React, { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";

const OrderConfirmedScreen = ({ products, totalPrice, onRestart }) => {
  return (
    <div className="text-center px-4 py-6">
      <h2 className="text-2xl font-bold mb-2">Order Confirmed</h2>
      <p className="text-gray-600 mb-4">We hope you enjoy your food!</p>

      <div className="bg-rose-50 rounded-lg px-4 py-4 mb-4 text-left">
        {products.map((product) => (
          <div
            key={product.productName}
            className="flex justify-between items-center mb-2"
          >
            <div>
              <p className="font-semibold">{product.productName}</p>
              <p className="text-sm text-gray-500">
                {product.productCount}x @ ${product.productPrice.toFixed(2)}
              </p>
            </div>
            <p className="font-semibold">
              ${(product.productPrice * product.productCount).toFixed(2)}
            </p>
          </div>
        ))}

        <hr className="my-2" />

        <div className="flex justify-between font-bold text-lg">
          <p>Order Total</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <button
        className="bg-red text-white py-3 px-6 rounded-full"
        onClick={onRestart}
      >
        Start New Order
      </button>
    </div>
  );
};

function Cart({ products, onRemove }) {
  const [orderState, setOrderState] = useState(false);

  const totalPrice = products.reduce(
    (sum, p) => sum + p.productPrice * p.productCount,
    0
  );

  const orderConfirm = () => {
    setOrderState(true);
  };

  const handleRestart = () => {
    setOrderState(false);
  };

  return (
    <div className="relative mx-8 py-4 px-4 bg-white min-h-72 rounded-md md:w-96">
      {orderState ? (
        <OrderConfirmedScreen
          products={products}
          totalPrice={totalPrice}
          onRestart={handleRestart}
        />
      ) : (
        <>
          <h3 className="text-red text-2xl font-bold">
            Your Cart ({products.length})
          </h3>

          {products.length === 0 ? (
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-center">
              <img
                src="/images/illustration-empty-cart.svg"
                alt="Empty cart"
                className="w-32 mx-auto"
              />
              <p className="text-sm font-semibold text-rose-500 mt-2">
                Your added items will appear here
              </p>
            </div>
          ) : (
            <>
              <ul className="mt-4 space-y-2">
                {products.map((product) => (
                  <li
                    key={product.productName}
                    className="border-b pb-2 flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <p className="font-semibold">{product.productName}</p>
                      <div className="flex gap-3">
                        <p className="text-red">{product.productCount}x</p>
                        <p className="text-rose-300">
                          @ ${product.productPrice.toFixed(2)}
                        </p>
                        <p className="text-rose-400">
                          $
                          {(
                            product.productPrice * product.productCount
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <TiDeleteOutline
                      className="text-2xl cursor-pointer hover:text-red-500 transition-colors"
                      onClick={() => onRemove(product.productName)}
                    />
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between mt-4">
                <p>Order Total</p>
                <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
              </div>

              <div className="bg-rose-50 p-2 mt-2 rounded-md flex justify-center">
                <p>
                  This <span className="font-bold">carbon-neutral</span>{" "}
                  delivery
                </p>
              </div>

              <button
                className="bg-red w-full mt-4 py-3 text-white rounded-4xl"
                onClick={orderConfirm}
              >
                Confirm Order
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
