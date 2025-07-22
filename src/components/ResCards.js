import { CDN_URL } from "../util/constants";

const ResCards = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo } =
    resData.info;
  const { deliveryTime } = resData.info.sla;
  return (
    <div
      className="m-4 p-4 w-60 h-115 bg-orange-50 hover:bg-orange-100 rounded-md hover:shadow-lg
       shadow-orange-300 duration-150 transition-transform hover:scale-90"
    >
      <img
        className="w-60 h-40 rounded-md justify-center mx-auto "
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
      />
      <div className="">
        <h4 className="font-bold py-4 text-lg">{name}</h4>
        <p>{cuisines.join(", ")}</p>
        <p>{avgRating}⭐</p>
        <p>{deliveryTime} mins away</p>
        <p>{costForTwo}</p>
      </div>
    </div>
  );
};

export const WithVeglabel = (ResCards) => {
  return (props) => {
    return (
      <div className="relative">
        <img
          className="absolute top-4 left-8 w-6 h-6 rounded-md z-10 shadow-md"
          src="https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg"
          alt="image"
        />
        <ResCards {...props} />
      </div>
    );
  };
};

export const WithNonVeglabel = (ResCards) => {
  return (props) => {
    return (
      <div className="relative">
        <img
          className="absolute top-4 left-8 w-6 h-6 rounded-md z-10 shadow-md"
          src="https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png"
          alt="image"
        />
        <ResCards {...props} />
      </div>
    );
  };
};

export default ResCards;
