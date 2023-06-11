import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getTablePertanian } from "../../../utils/Pertanian/TablePertnian";
import dataPertanian from "../../../config/pertanian/dataPertanian.json"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DataPertanian.css";

const DataPertanian = ({bidang}) => {

    const [tablePertanian, setDataPertanian] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDataPertanian() {
            let data;
            const storedData = localStorage.getItem("dataPertanian");
            if (storedData) {
                data = JSON.parse(storedData);
            } else {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/PertanianByUser`);
                data = response.data;
                localStorage.setItem('dataPertanian', JSON.stringify(data));
            }
            setDataPertanian(data);
        }
        fetchDataPertanian();
    }, []);

    useEffect(() => {
        if (bidang) {
            async function fetchDataPertanianByBidang() {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/PertanianByUser?bidang=${bidang}`);
                const data = response.data;
                setDataPertanian(data);
            }
            fetchDataPertanianByBidang();
        } else {
            const storedData = localStorage.getItem('dataPertanian');
            if (storedData) {
                const data = JSON.parse(storedData);
                setDataPertanian(data)
            }
        }

    }, [bidang])
    return(
        <div className="container-table">
            <DataTable
                columns={getTablePertanian(navigate, showPopup, setShowPopup)}
                data={tablePertanian}
            />
        </div>
    )
}
export default DataPertanian;