import { useState } from "react";
import { CDN_URL } from "../util/constants";

const RestrauntMenuCategory = ({ data, openAccordion, toggleAccordion }) => {
  return (
    <div
      key={data.title}
      className="mb-4 border border-orange-200 text-orange-400 rounded-lg overflow-hidden accordion bg-orange-50"
    >
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
              className="flex justify-between items-start mb-4"
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
              <div className="flex flex-col items-center w-2/12 relative">
                <img
                  src={CDN_URL + item.card.info.imageId}
                  className=" border-bg-orange-100 rounded-md "
                />
                <div
                  className="w-15 h-8 cursor-pointer border border-orange-100 bg-orange-200
                rounded-md flex items-center justify-center hover:bg-orange-300
                 active:bg-orange-400 active:scale-95 transition-all duration-150 mt-2 
                absolute top-25 right-9 shadow-md shadow-orange-300 focus:outline-none
                 focus:ring-2 focus:ring-orange-300"
                  onClick={() =>
                    console.log("Add to cart", item.card.info.name)
                  }
                >
                  Add +
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RestrauntMenuCategory;
