import { CDN_URL } from "../util/constants";

const ResCards = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } =
    resData.info;
  const { deliveryTime } = resData.info.sla;
  return (
    <div className="res-cards">
      <img
        className="res-logo"
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
      />
      <h4>{name}</h4>
      <p>{cuisines.join(", ")}</p>
      <p>{avgRating}⭐</p>
      <p>{deliveryTime} mins away</p>
      <p>{costForTwo}</p>
    </div>
  );
};

export default ResCards;
