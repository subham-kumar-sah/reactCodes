import { useEffect, useState } from "react";
import { MENU_URL } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      const data = await fetch(
        MENU_URL + resId + "&catalog_qa=undefined&submitAction=ENTER"
      );
      const json = await data.json();
      setResInfo(json.data.cards);
    };
    if (resId) fetchMenu();
  }, [resId]);
  console.log("Restraunt Menu Data:", resInfo);
  return resInfo;
};

export default useRestaurantMenu;
