import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getTableKomoditiPerindustrian } from "../../../utils/Perindustrian/TableKomoditiPerindustrian";
import daftarKomoditiPerindustrian from "../../../config/Perindustrian/daftarKomoditiPerindustrian.json";
import axios from "axios";

const DaftarKomoditiPerindustrian = ({ sektor }) => {

    const [tableKomoditiPerindustrian, setDaftarKomoditiPerindustrian] = useState([]);
    const token = localStorage.getItem("token");
    const [showPopup, setShowPopup] = useState(false);


    useEffect(() => {
        async function fetchKomoditiPerindustrian(sektor) {
            let data;
            if (sektor) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/KomoditiBySektor?sektor=${sektor}`);
                data = response.data;
                localStorage.setItem('dataKomoditi', JSON.stringify(data));
                setDaftarKomoditiPerindustrian(data);
            }
            else {
                const storedData = localStorage.getItem("dataKomoditi");
            if (storedData) {
                data = JSON.parse(storedData);
                }
            }
        }
        fetchKomoditiPerindustrian(sektor);
    }, [sektor]);

    return(
        <div className="container-table2">
            <DataTable
                columns={getTableKomoditiPerindustrian(showPopup, setShowPopup)}
                data={tableKomoditiPerindustrian}
            />
        </div>
    )
}
export default DaftarKomoditiPerindustrian;