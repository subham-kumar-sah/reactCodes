import ResCards, { WithVeglabel, WithNonVeglabel } from "./ResCards";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useRestaurantData from "../util/useRestaurantData";
import useUserStatus from "../util/useUserStatus";
import OfflineNotice from "./OfflineNotice";

const Body = () => {
  const data = useRestaurantData();
  const [filteredList, setFilteredList] = useState(data);
  const [searchText, setSearchText] = useState("");
  const isLoading = !data || data.length === 0;
  const isOnline = useUserStatus();
  const ResCardsWithVegLabel = WithVeglabel(ResCards);
  const ResCardsWithNVegLabel = WithNonVeglabel(ResCards);

  const filterMethod = (val) => {
    const filteredData = data.filter((ele) => {
      if (ele.info.name.toLocaleLowerCase().includes(val.toLocaleLowerCase())) {
        return ele;
      }
    });
    setFilteredList(filteredData);
  };

  const topRatedFilter = () => {
    const topRatedData = data.filter((ele) => {
      if (ele.info.avgRating >= 4.4) {
        return ele;
      }
    });
    setFilteredList(topRatedData);
  };

  // const handleKeyPress = () => {
  //   // if (event.key === "Enter") {
  //   //   filterMethod(searchText);
  //   // }
  //   filterMethod(searchText);
  // };

  useEffect(() => {
    setFilteredList(data);
    if (searchText === "") {
      setFilteredList(data);
    } else {
      filterMethod(searchText);
    }
  }, [searchText, data]);

  // Not the correct way
  // if (filteredList.length === 0) {
  //   return (
  //     <div>
  //       <Shimmer />
  //     </div>
  //   );
  // }

  if (!isOnline) {
    return <OfflineNotice />;
  }

  return (
    <div className="body bg-orange-50 ">
      <div className="relative w-120 my-4 p-4 flex items-center">
        <input
          className=" w-80 border border-solid rounded-md py-2 pl-4 pr-10 border-orange-200
           focus:outline-none focus:border-orange-400 bg-orange-50 focus:shadow-md shadow-orange-200"
          placeholder="Search your restraunts here"
          onChange={(ele) => {
            setSearchText(ele.target.value);
          }}
          value={searchText}
        />
        <img
          className="absolute top-1/2 right-1/3 -translate-y-1/2 w-6 h-6 cursor-pointer 
          transition-transform duration-150 hover:scale-110"
          src={
            !searchText
              ? "https://cdn-icons-png.flaticon.com/128/54/54481.png"
              : "https://cdn-icons-png.flaticon.com/128/2961/2961937.png"
          }
          onClick={() => {
            setFilteredList(data);
            setSearchText("");
          }}
          alt="search/clear"
        />
        <button
          onClick={topRatedFilter}
          className="h-10 ml-4 px-4 cursor-pointer bg-orange-200 rounded-md 
          transition-colors duration-150 hover:bg-orange-300"
        >
          Top Rated
        </button>
      </div>
      {isLoading ? (
        <Shimmer />
      ) : (
        <div className="flex flex-wrap">
          {filteredList?.map((ele) => {
            return (
              <Link
                className="link-cards"
                key={ele?.info?.id}
                to={`restraunts/${ele?.info?.id}`}
              >
                {ele?.info?.veg ? (
                  <ResCardsWithVegLabel resData={ele} />
                ) : (
                  <ResCardsWithNVegLabel resData={ele} />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Body;
