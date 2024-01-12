import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  const onlineStatus = useOnlineStatus();

  const {loggedInUser} = useContext(UserContext);
  //console.log(loggedInUser);
  
   // Subscribing to the store using a Selector

   const cartItems = useSelector((store) => store.cart.items);

    return (
      <div className="flex justify-between bg-pink-200 sm:bg-yellow-200 lg:bg-green-200 font-[500]">
        <div className="logo-container">
            <img className="w-44 mx-6 mt-2" src= {LOGO_URL}/>
        </div>
        <div className="flex items-center">
           <ul className="flex p-4 m-4">
             <li className="px-4">
              Online Status: {onlineStatus ? "✅" : "🔴"}
             </li>
             <li className="px-4">
             <Link to="/">Home</Link>
             </li>
             <li className="px-4">
               <Link to="/about">About Us</Link>
             </li>
             <li className="px-4">
                <Link to="/contact">Contact Us</Link>
             </li>
             <li className="px-4">
                <Link to="/grocery">Grocery</Link>
             </li>
             <li className="px-4">
             <Link to="/cart">🛒 ({cartItems.length} items)</Link>
             </li> 
             <button 
             className="login px-4"
             onClick={() => {
              btnNameReact === "Login" 
              ? setBtnNameReact("Logout")
              : setBtnNameReact("Login");
             }}>
              {btnNameReact}
             </button>
             <li className="px-4 font bold">{loggedInUser}</li> 
           </ul>
        </div>
       </div>
    );
};

export default Header;