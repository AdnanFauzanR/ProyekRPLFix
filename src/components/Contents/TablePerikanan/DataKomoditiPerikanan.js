import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getTableKomoditiPerikanan } from "../../../utils/Perikanan/TableKomoditiPerikanan";
import daftarKomoditiPerikanan from "../../../config/Perikanan/daftarKomoditiPerikanan.json";
import axios from "axios";

const DaftarKomoditiPerikanan = ({ sektor }) => {

    const [tableKomoditiPerikanan, setDaftarKomoditiPerikanan] = useState([]);
    const token = localStorage.getItem("token");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        async function fetchKomoditiPerikanan(sektor) {
            let data;
            if (sektor) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/KomoditiBySektor?sektor=${sektor}`);
                data = response.data;
                localStorage.setItem('dataKomoditi', JSON.stringify(data));
                setDaftarKomoditiPerikanan(data);
            }
            else {
                const storedData = localStorage.getItem("dataKomoditi");
            if (storedData) {
                data = JSON.parse(storedData);
                }
            }
        }
        fetchKomoditiPerikanan(sektor);
    }, [sektor]);

    return(
        <div className="container-table2">
            <DataTable
                columns={getTableKomoditiPerikanan(showPopup, setShowPopup)}
                data={tableKomoditiPerikanan}
            />
        </div>
    )
}
export default DaftarKomoditiPerikanan;