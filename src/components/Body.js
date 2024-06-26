import ResCards from "./ResCards";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { DATA_URL } from "../util/constants";
import { Link } from "react-router-dom";

const Body = () => {
  const [data, setData] = useState([]);
  const [filteredList, setFilteredList] = useState(data);
  const [searchText, setSearchText] = useState("");

  const fetchdata = async () => {
    const apiData = await fetch(DATA_URL);
    const json = await apiData.json();
    console.log(json);
    setData(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const filterMethod = (val) => {
    const filteredData = data.filter((ele) => {
      if (ele.info.name.toLocaleLowerCase().includes(val.toLocaleLowerCase())) {
        return ele;
      }
    });
    setFilteredList(filteredData);
  };

  // const handleKeyPress = () => {
  //   // if (event.key === "Enter") {
  //   //   filterMethod(searchText);
  //   // }
  //   filterMethod(searchText);
  // };

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    if (searchText === "") {
      setFilteredList(data);
    } else {
      filterMethod(searchText);
    }
  }, [searchText]);

  // Not the correct way
  // if (filteredList.length === 0) {
  //   return (
  //     <div>
  //       <Shimmer />
  //     </div>
  //   );
  // }

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
          className="serach-icon"
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
      </div>
      {filteredList.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="res-container">
          {filteredList.map((ele) => {
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
