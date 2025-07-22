import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestrauntMenu from "../util/useRestrauntMenu";
import useUserStatus from "../util/useUserStatus";
import OfflineNotice from "./OfflineNotice";
import RestrauntMenuCategory from "./RestrauntMenuCategory";

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
        <RestrauntMenuCategory
          key={ele.id}
          data={ele}
          openAccordion={openAccordion}
          toggleAccordion={toggleAccordion}
        />
      ))}
    </div>
  );
};

export default RestrauntMenu;
