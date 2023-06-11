import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getTableKomoditiPeternakan } from "../../../utils/Peternakan/TableKomoditiPeternakan";
import daftarKomoditiPeternakan from "../../../config/Peternakan/daftarKomoditiPeternakan.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DaftarKomoditiPeternakan = ({ sektor }) => {

    const [tableKomoditiPeternakan, setDaftarKomoditiPeternakan] = useState([]);
    const token = localStorage.getItem("token");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        async function fetchKomoditiPeternakan(sektor) {
            let data;
            if (sektor) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/KomoditiBySektor?sektor=${sektor}`);
                data = response.data;
                localStorage.setItem('dataKomoditi', JSON.stringify(data));
                setDaftarKomoditiPeternakan(data);
            }
            else {
                const storedData = localStorage.getItem("dataKomoditi");
            if (storedData) {
                data = JSON.parse(storedData);
                }
            }
        }
        fetchKomoditiPeternakan(sektor);
    }, [sektor]);

    return(
        <div className="container-table2">
            <DataTable
                columns={getTableKomoditiPeternakan(showPopup, setShowPopup)}
                data={tableKomoditiPeternakan}
            />
        </div>
    )
}
export default DaftarKomoditiPeternakan;