import { useEffect, useState } from "react";
import { MENU_URL } from "./constants";

const useRestrauntMenu = (resId) => {
  const [menuInfo, setMenuInfo] = useState(null);

  useEffect(() => {
    fetchMenu(resId);
  }, []);

  const fetchMenu = async (resId) => {
    const data = await fetch(
      MENU_URL + resId + "&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();
    setMenuInfo(json.data.cards);
    console.log("Menu Info:", json.data.cards);
  };

  return menuInfo;
};

export default useRestrauntMenu;
