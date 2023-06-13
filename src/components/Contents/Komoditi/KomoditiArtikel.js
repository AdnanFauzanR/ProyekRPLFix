import Reac, { useState, useEffect } from "react";
import axios from "axios";
import "./KomoditiArtikel.css";
import GrafikKomoditiPeternakan from "../../../utils/Peternakan/GrafikKomoditiPeternakan";
import GrafikKomoditiPertanian from "../../../utils/Pertanian/GrafikKomoditiPertanian";
import GrafikKomoditiPerikanan from "../../../utils/Perikanan/GrafikKomoditiPerikanan";
import GrafikKomoditiPerindustrian from "../../../utils/Perindustrian/GrafikKomoditiPerindustrian";
import GrafikKomoditiPariwisata from "../../../utils/Pariwisata/GrafikKomoditiPariwisata";
import DataPariwisata from './../TablePariwisata/DataPariwisata';

const KomoditiArtikel = ({ id, sektor, komoditi }) => {
  const [dataKomoditi, setDataKomoditi] = useState([]);
  const [kontenKomoditi, setKontenKomoditi] = useState([]);
  let grafikKomoditi;

  async function fetchDataKomoditi(sektor, komoditi) {
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/${sektor}/${komoditi}`);
      setDataKomoditi(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchKontenKomoditi(id) {
    let data;
    await axios.get(`${process.env.REACT_APP_API_URL}/api/Konten Komoditi ${id}`)
      .then((response) => {
        data = response.data.konten_komoditi;
        setKontenKomoditi(data);
    }).catch((error) => {
        console.log(error.response.message);
    })
  }

  useEffect(() => {
    fetchDataKomoditi(sektor, komoditi);
    fetchKontenKomoditi(id);
  }, [id, sektor, komoditi])

  // Menentukan grafik komoditi berdasarkan sektor konten yang dipilih
  if (sektor === "Peternakan") {
    grafikKomoditi = <GrafikKomoditiPeternakan dataPeternakan={dataKomoditi}/>;
  } else if (sektor === "Pertanian") {
    grafikKomoditi = <GrafikKomoditiPertanian dataPertanian={dataKomoditi}/>;
  } else if (sektor === "Perikanan") {
    grafikKomoditi = <GrafikKomoditiPerikanan dataPerikanan={dataKomoditi} />;
  } else if (sektor === "Perindustrian") {
    grafikKomoditi = <GrafikKomoditiPerindustrian dataPerindustrian={dataKomoditi}/>;
  } else if (sektor === "Pariwisata") {
    grafikKomoditi = <GrafikKomoditiPariwisata dataPariwisata={dataKomoditi}/>;
  }
  
  console.log(dataKomoditi);

  return (
    <div className="container-komoditi">
      <div className="KomoditiInfo">
        <h1>{kontenKomoditi.judul}</h1>
        <img src={kontenKomoditi.gambar} alt={kontenKomoditi.judul} style={{ justifyContent: "center" }} />
        <p>{kontenKomoditi.isi}</p>
      </div>
      <div className="grafikkomoditi">
        {grafikKomoditi}{/* Menampilkan grafik komoditi yang sesuai */}
      </div>
    </div>
  );
}

export default KomoditiArtikel;
