import { use, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestrauntMenu from "../util/useRestrauntMenu";
import { MENU_URL } from "../util/constants";

const RestrauntMenu = () => {
  const [details, setDetails] = useState({});
  const { resId } = useParams();
  const [entireMenu, setEntireMenu] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [menuInfo, setMenuInfo] = useState([]);

  //setMenuInfo(useRestrauntMenu(resId));

  useEffect(() => {
    fetchMenu(resId);
  }, []);

  const fetchMenu = async (resId) => {
    const data = await fetch(
      MENU_URL + resId + "&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();
    //setResInfo(json.data.cards);
    setMenuInfo(json.data.cards);
    console.log("Res Info:", json.data.cards);
  };

  useEffect(() => {
    if (menuInfo?.length !== 0) {
      console.log("Menu Info:", menuInfo);
      const { name, cuisines, costForTwoMessage, id } =
        menuInfo[2]?.card?.card?.info;
      setDetails({
        name,
        cuisines,
        costForTwoMessage,
        id,
      });
      menuInfo[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((ele) => {
        if (ele?.card?.card?.itemCards === undefined) return;
        const { itemCards, title } = ele.card.card;
        if (itemCards) {
          setEntireMenu((prev) => [...prev, { itemCards, title }]);
        }
      });
    }
  }, [menuInfo]);

  const toggleAccordion = (title) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  return menuInfo === null ? (
    <Shimmer />
  ) : (
    <div>
      <h1 className="restaurant-name">{details.name}</h1>
      <h3 className="restaurant-details">
        {(details?.cuisines || []).join(", ")} - {details?.costForTwoMessage}
      </h3>
      {entireMenu.map((ele) => (
        <div key={ele.title} className="accordion">
          <div
            className="accordion-header"
            onClick={() => toggleAccordion(ele.title)}
          >
            <h2 className="accordion-title">{ele.title}</h2>
            <div className="accordion-icon">
              {openAccordion === ele.title ? "▼" : "►"}
            </div>
          </div>
          {openAccordion === ele.title && (
            <ul className="accordion-content">
              {ele?.itemCards.map((item) => (
                <li key={item.card.info.id}>
                  {item?.card?.info?.name} -{" Rs. "}
                  {item?.card?.info?.price / 100 ||
                    item?.card?.info?.defaultPrice / 100}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default RestrauntMenu;
