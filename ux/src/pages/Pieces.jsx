import React from "react";
import Iventory from "../components/Inventory";
import FilterSidebar from "../components/FilterSidebar";

const Pieces = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <FilterSidebar />
        <main className="col-lg-9">
          <Iventory api_key="487dbb0c4b8e6b08620d28b3b752a794" limit={200} />
        </main>
      </div>
    </div>
  );
};

export default Pieces;
