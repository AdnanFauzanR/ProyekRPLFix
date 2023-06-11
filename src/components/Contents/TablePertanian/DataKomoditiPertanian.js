import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import TableKomoditiPertanian from "../../../utils/Pertanian/TableKomoditiPertanian";
import daftarKomoditiPertanian from "../../../config/pertanian/daftarKomoditiPertanian.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DataPertanian.css";

const DaftarKomoditiPertanian = ({ sektor }) => {

  const [tableKomoditiPertanian, setDaftarKomoditiPertanian] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchKomoditiPertanian(sektor) {
            let data;
            if (sektor) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/KomoditiBySektor?sektor=${sektor}`);
                data = response.data;
                localStorage.setItem('dataKomoditi', JSON.stringify(data));
                setDaftarKomoditiPertanian(data);
            }
            else {
                const storedData = localStorage.getItem("dataKomoditi");
            if (storedData) {
                data = JSON.parse(storedData);
                }
            }
        }
        fetchKomoditiPertanian(sektor);
    }, [sektor]);


  useEffect(() => {
    setDaftarKomoditiPertanian(daftarKomoditiPertanian);
  }, []);

  return (
    <div className="container-table2">
      <DataTable
        columns={TableKomoditiPertanian(showPopup, setShowPopup)}
        data={tableKomoditiPertanian}
      />
    </div>
  );
};

export default DaftarKomoditiPertanian;



