import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestrauntMenu from "../util/useRestrauntMenu";
import useUserStatus from "../util/useUserStatus";
import OfflineNotice from "./OfflineNotice";

const RestrauntMenu = () => {
  const [details, setDetails] = useState({});
  const [entireMenu, setEntireMenu] = useState([]);
  const [openAccordion, setOpenAccordion] = useState(null);
  const { resId } = useParams();
  const menuInfo = useRestrauntMenu(resId);
  const isOnline = useUserStatus();

  useEffect(() => {
    if (!Array.isArray(menuInfo) || menuInfo.length === 0) return;

    const { name, cuisines, costForTwoMessage, id } =
      menuInfo[2]?.card?.card?.info || {};
    setDetails({
      name,
      cuisines,
      costForTwoMessage,
      id,
    });

    const menuArr =
      menuInfo[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
        ?.filter((ele) => ele?.card?.card?.itemCards)
        .map((ele) => ({
          itemCards: ele.card.card.itemCards,
          title: ele.card.card.title,
          id: ele.card.card.title,
        })) || [];
    setEntireMenu(menuArr);
  }, [menuInfo]);

  const toggleAccordion = (title) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  if (!isOnline) {
    return <OfflineNotice />;
  }

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
