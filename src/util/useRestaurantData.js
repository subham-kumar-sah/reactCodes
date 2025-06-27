import React from "react";
import { useEffect, useState } from "react";
import { DATA_URL } from "./constants";
const useRestaurantData = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  useEffect(() => {
    const fetchdata = async () => {
      const apiData = await fetch(DATA_URL);
      const json = await apiData.json();
      console.log(json);
      setRestaurantData(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    };
    fetchdata();
  }, []);
  return restaurantData;
};
export default useRestaurantData;
