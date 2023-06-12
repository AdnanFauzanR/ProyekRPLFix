import React, { useState, useEffect } from "react";
import axios from "axios";
import CardKomoditiCategory from "../components/Card/KomoditiCategory/CardKomoditiCategory.js";
import kategori_komoditi from "../config/KomoditiCategory/kategori_Komoditi.json";

const KomoditiCategory = () => {
    const [kategoriKomoditi, setKategoriKomoditi] = useState([]);
    const token = localStorage.getItem('token');
    

    useEffect(() => {
        const fetchKategoriKomoditi = async () => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/CountSektor`)
            setKategoriKomoditi(response.data);
        }
        fetchKategoriKomoditi()
    }, [])

    for (let i=0; i < kategoriKomoditi.length; i++) {
        for (let j=0; j < kategoriKomoditi.length; j++) {
            if (kategori_komoditi[i].name === kategoriKomoditi[j]?.sektor) {
                kategori_komoditi[i].count = kategoriKomoditi[j]?.count
            }
        }
    }

    return (
        <div style={
            {
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                flexBasis: '30%', 
            }
        }>
            {
                kategori_komoditi?.map(item => (
                    (
                     <CardKomoditiCategory key={item.id} sektor={item}/>
                    ) 
                ))
            }
        </div>
    )
}

export default KomoditiCategory;