import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_URL } from "../util/constants";

const RestrauntMenu = () => {
  const [menuInfo, setMenuInfo] = useState([]);
  const [details, setDetails] = useState({});
  const [recommendedItems, setRecommendedItems] = useState({});
  const [burgerItems, setBurgerItems] = useState({});
  const { resId } = useParams();

  const fetchMenu = async () => {
    const data = await fetch(
      MENU_URL + resId + "&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();
    console.log(json.data);
    setMenuInfo(json?.data.cards);
  };

  useEffect(() => {
    if (menuInfo?.length !== 0) {
      const { name, cuisines, costForTwoMessage, id } =
        menuInfo[2]?.card?.card?.info;
      const { itemCards, title } =
        menuInfo[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card;
      setDetails({
        name,
        cuisines,
        costForTwoMessage,
        id,
      });
      setRecommendedItems(
        menuInfo[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
          ?.itemCards
      );
      setBurgerItems({ itemCards, title });
    }
  }, [menuInfo]);

  useEffect(() => {
    fetchMenu();
  }, []);

  return Object.keys(details).length === 0 ? (
    <Shimmer />
  ) : (
    <div>
      <h1>{details.name}</h1>
      <h3>
        {details?.cuisines.join(", ")} - {details?.costForTwoMessage}
      </h3>
      <h3>Recommended Items</h3>
      <ul>
        {recommendedItems.map((ele) => (
          <li key={ele.card.info.id}>
            {ele?.card?.info?.name} -{" Rs. "}
            {ele?.card?.info?.price / 100 ||
              ele?.card?.info?.defaultPrice / 100}
          </li>
        ))}
      </ul>
      <h3>{burgerItems.title}</h3>
      <ul>
        {burgerItems.itemCards.map((ele) => (
          <li key={ele.card.info.id}>
            {ele?.card?.info?.name} - {`Rs. ${ele?.card?.info?.price / 100}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestrauntMenu;
