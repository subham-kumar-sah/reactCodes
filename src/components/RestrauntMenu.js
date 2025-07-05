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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-orange-50 rounded-lg shadow-lg shadow-orange-200">
      <h1 className="text-3xl font-bold text-orange-400 mb-2 text-center">
        {details.name}
      </h1>
      <h3 className="text-lg text-orange-400 mb-8 text-center ">
        {(details?.cuisines || []).join(", ")} - {details?.costForTwoMessage}
      </h3>
      {entireMenu.map((ele) => (
        <div
          key={ele.title}
          className="mb-4 border border-orange-200 text-orange-400 rounded-lg overflow-hidden accordion bg-orange-50"
        >
          <div
            className="flex justify-between items-center px-4 py-3 cursor-pointer bg-orange-100
             hover:bg-orange-200 transition-colors accordion-header"
            onClick={() => toggleAccordion(ele.title)}
          >
            <h2 className="text-lg accordion-icon">{ele.title}</h2>
            <div className="accordion-icon">
              {openAccordion === ele.title ? "▼" : "►"}
            </div>
          </div>
          {openAccordion === ele.title && (
            <ul className="px-6 py-4 bg-orange-50 accordion-content">
              {ele?.itemCards.map((item) => (
                <li
                  key={item.card.info.id}
                  className="py-2 border-b border-orange-100 last:border-b-0 flex 
                  justify-between items-center"
                >
                  <span className="text-orange-400 font-medium">
                    {item?.card?.info?.name}
                  </span>
                  <span className="text-green-600 font-medium">
                    ₹
                    {item?.card?.info?.price / 100 ||
                      item?.card?.info?.defaultPrice / 100}
                  </span>
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
