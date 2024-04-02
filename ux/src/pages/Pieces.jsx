import React from "react";
import Iventory from "../components/Inventory";
import FilterSidebar from "../components/FilterSidebar";

const Pieces = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <FilterSidebar apiUrl="http://localhost:8000/color/"/>
        <main className="col-lg-9">
          <Iventory api_url="http://localhost:8000/piece/" limit={10} />
        </main>
      </div>
    </div>
  );
};

export default Pieces;
