import { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import "./TambahKomoditi.css";
import toTitleCase from './../../../utils/titleCase';
import axios from 'axios';
import PopupAdd from '../../PopUp/PopupAdd';

const TambahKomoditiPariwisata= ({ sektor }) => {
  const [selectedJenisWisata, setSelectedJenisWisata] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [validation, setValidation] = useState([]);
  const [nama, setNama] = useState("");
  const [listKecamatan, setListKecamatan] = useState([]);
  const [showPopupAdd, setShowPopupAdd] = useState(false);
  

  const handleJenisWisataChange = (event) => {
    setSelectedJenisWisata(event.target.value);
  }

  const handleKecamatanChange = (event) => {
    setKecamatan(event.target.value);
  }

  const [popupStyle, showPopup] = useState("hide")

  const popup =()=>{
      showPopup("Tambah-popup")
      setTimeout(()=> showPopup("hide"),3000)
  }

  const handleConfirm = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('nama', toTitleCase(nama));
    formData.append('sektor', sektor);
    formData.append('bidang', selectedJenisWisata);
    formData.append('kecamatan', kecamatan);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    try{
      await axios.post(`${process.env.REACT_APP_API_URL}/api/Komoditi`, formData);
      console.log('Sukses Menambahkan Data Komoditi');
      const storedData = localStorage.getItem('dataKomoditi');
        if (storedData) {
          localStorage.removeItem('dataKomoditi');
        }
        window.location.reload(false);
    }catch(error) {
      setValidation(error.response.data);
    }
    setShowPopupAdd(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowPopupAdd(true);  
  }

  const handleCancel = () => {
    // Logika ketika tombol "Tidak" ditekan
    console.log("Batal menambahkan data.");
    setShowPopupAdd(false);
  };

  useEffect(() => {
    async function fetchDataKecamatan() {
      let data;
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Kecamatan`);
      data = response.data;
      setListKecamatan(data);
    }
    fetchDataKecamatan();
  }, []);

  return (
    <Col className="tambah-komoditi-pariwisata">
      <div className="cover-tambah-komoditi">
        <h1>Tambah Komoditi</h1>
        <h3>Nama Wisata</h3>
        <input
          id="nama"
          type="text"
          value={nama}
          onChange={(event) => setNama(event.target.value)}
        />
        {
              validation.nama && (
                <div className="alert-danger">
                  {validation.nama[0]}
                </div>
              )
          }
        <h3>Jenis Wisata</h3>
        <select id="jenisWisata" value={selectedJenisWisata} onChange={handleJenisWisataChange}>
          <option value="">- Pilih Jenis Wisata -</option>
          <option value="Alam">Alam</option>
          <option value="Budaya">Budaya</option>
          <option value="Panorama">Panorama</option>
        </select>
        <h3>Kecamatan</h3>
        <select id="kecamatan" value={kecamatan} onChange={handleKecamatanChange}>
  <option value="">- Pilih Kecamatan -</option>
  {listKecamatan &&
    listKecamatan.map((kecamatan) => (
      <option key={kecamatan.kecamatan} value={kecamatan.kecamatan}>
        {kecamatan.kecamatan}
      </option>
    ))}
</select>
        <div className="tambah-btn" onClick={handleSubmit}>Simpan</div>
        {showPopupAdd && (
                        <PopupAdd
                            message={"Apakah Anda yakin manambah data?"}
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                    )}
      </div>
    </Col>
  );
}

export default TambahKomoditiPariwisata;
