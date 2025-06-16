import { useEffect, useState } from "react";
import { MENU_URL } from "./constants";

const useRestrauntMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu(resId);
  }, []);

  const fetchMenu = async (resId) => {
    const data = await fetch(
      MENU_URL + resId + "&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();
    setResInfo(json.data.cards);
    console.log("Res Info:", json.data.cards);
  };

  if (resInfo !== null) return resInfo;
};

export default useRestrauntMenu;
