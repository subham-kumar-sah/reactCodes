import { useSelector, useDispatch } from "react-redux";
import { CDN_URL } from "../util/constants";
import {
  clearCart,
  incrementItem,
  decrementItem,
} from "../util/slices/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="max-w-6xl mx-auto my-8 p-6 bg-orange-50 rounded-lg shadow-lg">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-2xl font-bold text-center my-4">Your Cart</h1>
        <button
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-center text-orange-400">Your cart is empty.</p>
      ) : (
        <ul className="px-6 py-4 bg-orange-50">
          {cartItems.map((item) => (
            <li
              className="flex justify-between items-start mb-4 border-b border-orange-200 last:border-b-0 pb-4"
              key={item?.card?.info?.id}
            >
              <div className="w-8/12">
                <span className="text-orange-400 font-medium">
                  {item?.card?.info?.name}
                </span>
                <span className="text-green-600 font-medium">
                  {"  "}- ₹
                  {item?.card?.info?.price / 100 ||
                    item?.card?.info?.defaultPrice / 100}
                </span>
                <p className="mb-8 text-xs border-b last:border-b-0 border-orange-100">
                  {item?.card?.info?.description}
                </p>
              </div>
              <div className="flex items-center w-3/12 relative mb-8">
                <img
                  src={CDN_URL + item?.card?.info?.imageId}
                  className="border-bg-orange-100 rounded-md h-30 w-35 mr-4"
                  alt={item?.card?.info?.name}
                />
                <div className="flex items-center justify-center gap-4 mt-4">
                  <button
                    className="w-10 h-10 border border-orange-100 bg-orange-200
                     text-orange-500 flex items-center justify-center rounded shadow-md
                      shadow-orange-300 cursor-pointer text-xl"
                    onClick={() => dispatch(decrementItem(item.card.info.id))}
                  >
                    -
                  </button>
                  <span className="font-bold text-orange-500 text-lg">
                    {item.quantity}
                  </span>
                  <button
                    className="w-10 h-10 border border-orange-100 bg-orange-200
                     text-orange-500 flex items-center justify-center rounded shadow-md
                      shadow-orange-300 cursor-pointer text-xl"
                    onClick={() => dispatch(incrementItem(item.card.info.id))}
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
