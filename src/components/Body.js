import ResCards from "./ResCards";
import resList from "../util/mockData";
import { useEffect, useState } from "react";
const Body = () => {
  const [data, setData] = useState(resList);
  const [filteredList, setFilteredList] = useState(data);
  const [searchText, setSearchText] = useState("");

  const fetchdata = async () => {
    const apiData = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.8683714&lng=88.4032503&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await apiData.json();
    console.log(json);
  };

  const filterMethod = (val) => {
    console.log(val);
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
    if (searchText === "") {
      setFilteredList(data);
    } else {
      filterMethod(searchText);
    }
  }, [searchText]);

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
      <div className="res-container">
        {filteredList.map((ele) => {
          return <ResCards resData={ele} key={ele.info.id} />;
        })}
      </div>
    </div>
  );
};

export default Body;
