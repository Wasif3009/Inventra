import React, { useState } from "react";
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
    <div className="bg-[#18181B] min-h-screen">
      <div className="flex  lg:flex-row min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <SideBar />

          {/* Dialogs */}
          {showLowAdd && <AddLowStock open={openLow} setOpen={setOpenLow} />}

          {showOutAdd && <AddOutStock open={openOut} setOpen={setOpenOut} />}

          {/* Content */}
          <div className="p-3 sm:p-4 md:p-5">
            {loading ? (
              <LoadingMessage />
            ) : (
              <div className="flex flex-col gap-5">
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handleAddLow}
                    className="
                      bg-[#9333ea]
                      hover:bg-[#6D28D9]
                      transition-all
                      text-white
                      px-4
                      py-2.5
                      rounded-lg
                      text-sm
                      font-medium
                      w-full
                      sm:w-fit
                    "
                  >
                    Add Low Stock
                  </button>

                  <button
                    onClick={handleAddOut}
                    className="
                      bg-[#9333ea]
                      hover:bg-[#6D28D9]
                      transition-all
                      text-white
                      px-4
                      py-2.5
                      rounded-lg
                      text-sm
                      font-medium
                      w-full
                      sm:w-fit
                    "
                  >
                    Add Out Of Stock
                  </button>
                </div>

                {/* Stock Tables */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                  <div className="">
                    <StockLow />
                  </div>

                  <div className="">
                    <StockOut />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
