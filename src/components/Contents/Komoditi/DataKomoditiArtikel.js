import React, {useEffect, useState } from "react";
import DropdownSektor from "../../Dropdown/DropdownSektor/DropdownSektor";
import DataTable from "react-data-table-component";
import { getTableKontenKomoditiPertanian } from "../../../utils/Pertanian/TableKontenKomoditiPertanian";
import { getTableKontenKomoditiPerikanan } from "../../../utils/Perikanan/TableKontenKomoditiPerikanan";
import { getTableKontenKomoditiPerindustrian } from "../../../utils/Perindustrian/TableKontenKomoditiPerindustrian";
import { getTableKontenKomoditiPeternakan } from "../../../utils/Peternakan/TableKontenKomoditiPeternakan";
import { getTableKontenKomoditiPariwisata } from "../../../utils/Pariwisata/TableKontenKomoditiPariwisata";
import dataKontenKomoditiPertanian from "../../../config/pertanian/dataKontenKomoditiPertanian.json";
import dataKontenKomoditiPariwisata from "../../../config/Pariwisata/dataKontenKomoditiPariwisata.json";
import dataKontenKomoditiPeternakan from "../../../config/Peternakan/dataKontenKomoditiPeternakan.json";
import dataKontenKomoditiPerindustrian from "../../../config/Perindustrian/dataKontenKomoditiPerindustrian.json";
import dataKontenKomoditiParikanan from "../../../config/Perikanan/dataKontenKomoditiPerikanan.json";
import axios from "axios";
import "./DataKomoditiArtikel.css";
import { useNavigate } from "react-router-dom";

const DataKomoditiArtikel = () => {
    const [sektor, setSektor] = useState("");
    const [dataKontenKomoditi, setDataKontenKomoditi] = useState([]);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const tableStyles = {
      table: {
        borderCollapse: "separate",
        borderSpacing: "10px",
      },
      cell: {
        padding: "5px",
      },
    };

    const handleSektorChange = (value) => {
        setSektor(value);
    }

    useEffect(() => {
      const token = localStorage.getItem('token');
      let data;
      async function fetchDataKontenKomoditi() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const url = `${process.env.REACT_APP_API_URL}/api/Konten Komoditi`;
    const storedData = localStorage.getItem("dataKontenKomoditi");
    if (storedData) {
      data = JSON.parse(storedData);
    } else {
      const response = await axios.get(url);
      data = response.data;
      setDataKontenKomoditi(data);
      localStorage.setItem('dataKontenKomoditi', JSON.stringify(data));
    }
      }
      fetchDataKontenKomoditi();
    })

    useEffect(() => {
      const token = localStorage.getItem('token');
      let data;
      async function fetchDataKontenKomoditi(sektor) {
        if (sektor) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Konten Komoditi?sektor=${sektor}`);
          data = response.data;
          setDataKontenKomoditi(data);
        } else {
          const storedData = localStorage.getItem("dataKontenKomoditi");
          if (storedData) {
            data = JSON.parse(storedData);
            setDataKontenKomoditi(data);
          }
        }
      }
      fetchDataKontenKomoditi(sektor);
    }, [sektor]);

    const renderTable = (sektor) => {
        switch (sektor) {
        case "Pertanian":
          return (
            <div className="konten-komoditi">
              <DataTable columns={getTableKontenKomoditiPertanian(navigate, showPopup, setShowPopup)} data={dataKontenKomoditi} customStyles={tableStyles}/>
            </div>
          );
        case "Peternakan":
          return (
            <div className="konten-komoditi">
              <DataTable columns={getTableKontenKomoditiPeternakan(navigate, showPopup, setShowPopup)} data={dataKontenKomoditi} customStyles={tableStyles}/>
            </div>
          );
        case "Perikanan":
          return (
            <div className="konten-komoditi">
              <DataTable columns={getTableKontenKomoditiPerikanan(navigate, showPopup, setShowPopup)} data={dataKontenKomoditi} customStyles={tableStyles}/>
            </div>
          );
        case "Perindustrian":
          return (
            <div className="konten-komoditi">
              <DataTable columns={getTableKontenKomoditiPerindustrian(navigate, showPopup, setShowPopup)} data={dataKontenKomoditi} customStyles={tableStyles}/>
            </div>
          );
        case "Pariwisata":
          return (
            <div className="konten-komoditi">
              <DataTable columns={getTableKontenKomoditiPariwisata(navigate, showPopup, setShowPopup)} data={dataKontenKomoditi} customStyles={tableStyles} />
            </div>
          );

          default:
            return (
              <div className="konten-komoditi">
                <DataTable columns={getTableKontenKomoditiPariwisata(navigate, showPopup, setShowPopup)} data={dataKontenKomoditi} customStyles={tableStyles} />
              </div>
            );
        }
      };

  return (
    <div className='content-komoditi'>
                <div><h3>Data</h3></div>
                <div className="dropdown-konten-komoditi">
                  <DropdownSektor selectedSektor={sektor} onSektorChange={handleSektorChange}/>
                </div>
                <div><h3>Sektor {sektor ? sektor : ""}</h3></div>
                {renderTable(sektor)}
            </div>
  );
};

export default DataKomoditiArtikel;
