import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { getTablePerindustrian } from "../../../utils/Perindustrian/TablePerindustrian";
import dataPerindustrian from "../../../config/Perindustrian/dataPerindustrian.json";
import axios from "axios";
// import "./DataPertanian.css";
const DataPerindustrian = () => {

    const [tablePerindustrian, setDataPerindustrian] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchDataPerindustrian() {
            let data;
            const storedData = localStorage.getItem("dataPerindustrian");
            if (storedData) {
                data = JSON.parse(storedData);
            } else {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/PerindustrianByUser`);
                data = response.data;
                localStorage.setItem('dataPerindustrian', JSON.stringify(data));
            }
            setDataPerindustrian(data);
        }
        fetchDataPerindustrian();
    }, []);
    return(
        <div className="container-table">
            <DataTable
                columns={getTablePerindustrian(navigate, showPopup, setShowPopup)}
                data={tablePerindustrian}
            />
        </div>
    )
}
export default DataPerindustrian;