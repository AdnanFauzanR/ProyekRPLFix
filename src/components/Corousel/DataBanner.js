import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getTableBanner } from "../../utils/TableBanner";
import dataBanner from "../../config/Konten/dataBanner.json";
import axios from "axios";


const DataBanner = () => {
  const [tableBanner, setDataBanner] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchDataKontenBanner() {
      let data;
      const storedData = localStorage.getItem("dataKontenBanner");
      if (storedData) {
        data = JSON.parse(storedData);
      } else {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Konten Banner`);
        data = response.data;
        localStorage.setItem('dataKontenBanner', JSON.stringify(data));
      }
        setDataBanner(data);
    }
    fetchDataKontenBanner();
  }, []);

  return (
    <div className="container-table-banner">
      <DataTable columns={getTableBanner(showPopup, setShowPopup)} 
      data={tableBanner} />
    </div>
  );
};

export default DataBanner;