import { useState } from "react";
import { useParams } from "react-router-dom";
import { CDN_URL } from "../util/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItems, forceAddItems } from "../util/slices/cartSlice";

const RestaurantMenuCategory = ({ data, openAccordion, toggleAccordion }) => {
  const cartRestaurantId = useSelector((store) => store.cart.restaurantId);
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  const handleAddItem = (item, restaurantId) => {
    console.log(item, restaurantId);
    if (!cartRestaurantId || cartRestaurantId === restaurantId) {
      dispatch({ type: addItems.type, payload: item, meta: { restaurantId } });
    } else {
      setPendingItem({ item, restaurantId });
      setShowModal(true);
    }
  };
  const handleConfirm = () => {
    dispatch({
      type: forceAddItems.type,
      payload: pendingItem.item,
      meta: { restaurantId: pendingItem.restaurantId },
    });
    setShowModal(false);
    setPendingItem(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setPendingItem(null);
  };

  return (
    <div
      key={data.title}
      className="mb-4 border border-orange-200 text-orange-400 rounded-lg overflow-hidden accordion bg-orange-50"
    >
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="mb-4 text-orange-500 font-semibold">
              Your cart contains items from another restaurant.
              <br />
              Discard all and add from this restaurant?
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleConfirm}
            >
              Discard & Add
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div
        className="flex justify-between items-center px-4 py-3 cursor-pointer bg-orange-100
             hover:bg-orange-200 transition-colors accordion-header"
        onClick={() => toggleAccordion(data.title)}
      >
        <h2 className="text-lg accordion-icon">
          {data.title} ({data.itemCards.length})
        </h2>
        <div>{openAccordion === data.title ? "▲" : "▼"}</div>
      </div>
      {openAccordion === data.title && (
        <ul className="px-6 py-4 bg-orange-50">
          {data?.itemCards.map((item) => (
            <div
              className="flex justify-between items-start mb-4 border-b border-orange-200 
              last:border-b-0 pb-4"
              key={item.card.info.id}
            >
              <div key={item.card.info.id} className="w-8/12">
                <li key={item.card.info.id} className="py-2 items-center">
                  <span className="text-orange-400 font-medium">
                    {item?.card?.info?.name}
                  </span>
                  <span className="text-green-600 font-medium">
                    {"  "}- ₹
                    {item?.card?.info?.price / 100 ||
                      item?.card?.info?.defaultPrice / 100}
                  </span>
                </li>
                <p className="mb-8 text-xs  border-b last:border-b-0 border-orange-100">
                  {item.card.info.description}
                </p>
              </div>
              <div className="flex flex-col items-center w-2/12 relative mb-8">
                <img
                  src={CDN_URL + item.card.info.imageId}
                  className=" border-bg-orange-100 rounded-md h-30 w-35"
                />
                <button
                  className="w-15 h-8 cursor-pointer border bg-orange-100
                rounded-md flex items-center justify-center hover:bg-orange-200 mt-2 
                absolute top-25 right-9 shadow-md shadow-orange-300 "
                  onClick={() => handleAddItem(item, restaurantId)}
                >
                  Add +
                </button>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RestaurantMenuCategory;
