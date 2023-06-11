import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { getTablePariwisata } from "../../../utils/Pariwisata/TablePariwisata";
import dataPariwisata from "../../../config/Pariwisata/dataPariwisata.json";
import axios from "axios";
// import "./DataPertanian.css";
const DataPariwisata = ({jenis_wisata}) => {

    const [tableParwisata, setDataPariwisata] = useState([]);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchDataPariwisata() {
            let data;
            const storedData = localStorage.getItem("dataPariwisata");
            if (storedData) {
                data = JSON.parse(storedData);
            } else {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/PariwisataByUser`);
                data = response.data;
                localStorage.setItem('dataPariwisata', JSON.stringify(data));
            }
            setDataPariwisata(data);
        }
        fetchDataPariwisata();
    }, []);

    useEffect(() => {
        if (jenis_wisata) {
            async function fetchDataPariwisataByJenisWisata() {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/PariwisataByUser?jenis_wisata=${jenis_wisata}`);
                const data = response.data;
                setDataPariwisata(data);
            }
            fetchDataPariwisataByJenisWisata();
        } else {
            const storedData = localStorage.getItem('dataPariwisata');
            if (storedData) {
                const data = JSON.parse(storedData);
                setDataPariwisata(data)
            }
        }
    }, [jenis_wisata]);

    return(
        <div className="container-table">
            <DataTable
                columns={getTablePariwisata(navigate, showPopup, setShowPopup)}
                data={tableParwisata}
            />
        </div>
    )
}
export default DataPariwisata;