import { useEffect, useState, useContext} from 'react';
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';
import { Link } from "react-router-dom";
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
const Body = () => {

  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5633813&lng=77.1823055&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    
    setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  const onlineStatus = useOnlineStatus();

  if(onlineStatus === false) 
  return ( 
  <h1>
  Looks like you are offline!! please check your internet connection
  </h1>
  );

  const {loggedInUser, setUserName} = useContext(UserContext);

  return  listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      
      <div className="filter flex ">
        <div className="search m-4 p-4">
          <input
            type="text"
            placeholder="Search a restaurant "
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button className="px-4 py-1 bg-green-100 m-3 rounded-lg"
            onClick={() => {
              
              console.log(searchText);

              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
        <button
          className="px-4 py-2 bg-gray-400 rounded-lg"
          onClick={() => {
            
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );

            setFilteredRestaurant(filteredList);
            console.log(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>

        </div>
        <div className="search m-4 p-4 flex items-center">
          <label>UserName:</label>
           <input 
           className="border border-black p-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
           />
        </div>
      </div>
      <div className="flex flex-wrap">

        {filteredRestaurant.map((restaurant) => (
          <Link 
          key={restaurant.info.id} 
          to={"/restaurants/" + restaurant.info.id}>
          <RestaurantCard  resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
