import ResCards from "./ResCards";
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
      if (ele.info.avgRating >= 4.2) {
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
    <div className="body">
      <div className="search-bar-container">
        <input
          className="search-bar"
          placeholder="Search your restraunts here"
          onChange={(ele) => {
            setSearchText(ele.target.value);
          }}
          value={searchText}
        />
        <img
          className="search-icon"
          src={
            !searchText
              ? "https://cdn-icons-png.flaticon.com/128/54/54481.png"
              : "https://cdn-icons-png.flaticon.com/128/2961/2961937.png"
          }
          onClick={() => {
            setFilteredList(data);
            setSearchText("");
          }}
        />
        <button onClick={topRatedFilter} className="top-rated">
          Top Rated
        </button>
      </div>
      {isLoading ? (
        <Shimmer />
      ) : (
        <div className="res-container">
          {filteredList?.map((ele) => {
            return (
              <Link
                className="link-cards"
                key={ele?.info?.id}
                to={`restraunts/${ele?.info?.id}`}
              >
                <ResCards resData={ele} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Body;
