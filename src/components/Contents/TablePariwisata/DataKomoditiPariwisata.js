import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getTableKomoditiPariwisata } from "../../../utils/Pariwisata/TableKomoditiPariwisata";
import daftarKomoditiPariwisata from "../../../config/Pariwisata/daftarKomoditiPariwisata.json";
import axios from "axios";
const DaftarKomoditiPariwisata = ({ sektor }) => {

    const [tableKomoditiParwisata, setDaftarKomoditiPariwisata] = useState([]);
    const token = localStorage.getItem("token");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        async function fetchKomoditiPariwisata(sektor) {
            let data;
            if (sektor) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/KomoditiBySektor?sektor=${sektor}`);
                data = response.data;
                localStorage.setItem('dataKomoditi', JSON.stringify(data));
                setDaftarKomoditiPariwisata(data);
            }
            else {
                const storedData = localStorage.getItem("dataKomoditi");
            if (storedData) {
                data = JSON.parse(storedData);
                }
            }
        }
        fetchKomoditiPariwisata(sektor);
    }, [sektor]);

    return(
        <div className="container-table2">
            <DataTable
                columns={getTableKomoditiPariwisata(showPopup, setShowPopup)}
                data={tableKomoditiParwisata}
            />
        </div>
    )
}
export default DaftarKomoditiPariwisata;