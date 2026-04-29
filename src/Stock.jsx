import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import StockOut from "./StockOut";
import StockLow from "./StockLow";
import LoadingMessage from "./LoadingMessage";
import AddLowStock from "./AddLowStock";
import AddOutStock from "./AddOutStock";

const Stock = ({ loading }) => {
  const [openLow, setOpenLow] = useState(false);
  const [openOut, setOpenOut] = useState(false);
  const [showLowAdd, setShowLowAdd] = useState(false);
  const [showOutAdd, setShowOutAdd] = useState(false);

  const handleAddLow = () => {
    setShowLowAdd(true);
    setOpenLow(true);
  };

  const handleAddOut = () => {
    setShowOutAdd(true);
    setOpenOut(true);
  };
  return (
    <div>
      <div className="flex dashboard">
        <Navbar />
        <div className="flex flex-col left-container">
          <SideBar />
          {showLowAdd && <AddLowStock open={openLow} setOpen={setOpenLow} />}
          {showOutAdd && <AddOutStock open={openOut} setOpen={setOpenOut} />}
          {loading ? (
            <LoadingMessage />
          ) : (
            <div className="flex  gap-3 flex-col">
              <div className="flex items-center   stock-btn">
                <button className="create-btn" onClick={handleAddLow}>
                  Add Low Stock
                </button>{" "}
                <button className="create-btn " onClick={handleAddOut}>
                  Add Out of Stock
                </button>
              </div>
              <div className="flex items-center stock-gap ">
                <StockLow />
                <StockOut />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stock;
