import React, { useEffect } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import StockOut from "./StockOut";
import StockLow from "./StockLow";
import LoadingMessage from "./LoadingMessage";

const Stock = ({ loading }) => {
  return (
    <div>
      <div className="flex">
        <Navbar />
        <div className="flex flex-col w-280">
          <SideBar />
          {loading ? (
            <LoadingMessage />
          ) : (
            <div className="flex items-center justify-center gap-3">
              <StockLow />
              <StockOut />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stock;
