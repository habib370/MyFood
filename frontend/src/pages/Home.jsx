import React, { useState } from "react";
import { Header } from "../components/Header.jsx";
import { ExploreMenu } from "../components/ExploreMenu.jsx";
import {FoodDisplay} from '../components/FoodDisplay.jsx';

export const Home = () => {
  const [category, setCategory] = useState("all");
  return (
    <>
     
      <Header />
      <ExploreMenu category={category}  setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    
  
    </>
  );
};
