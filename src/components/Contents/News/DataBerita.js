import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getTableBerita } from "../../../utils/TableBerita";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../pages/pagesAdminPusat//PageInputKonten/PageDataBerita.css";

const DataBerita = () => {
  const [tableBerita, setDataBerita] = useState([]);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchDataKontenBerita() {
      let data;
      const storedData = localStorage.getItem("dataKontenBerita");
      if (storedData) {
        data = JSON.parse(storedData);
      } else {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Konten Berita`);
        data = response.data;
        localStorage.setItem('dataKontenBerita', JSON.stringify(data));
      }
        setDataBerita(data);
    }
    fetchDataKontenBerita();
  }, []);

  return (
    <div className="container-table-berita">
      <DataTable columns={getTableBerita(navigate, showPopup, setShowPopup)} 
      data={tableBerita}
      style={{
        marginLeft: "5px", // Atur jarak kiri
        marginRight: "5px", // Atur jarak kanan
      }}
      />
    </div>
  );
};

export default DataBerita;