import { useState } from 'react';
import { Col } from 'react-bootstrap';
import "./TambahKomoditi.css";
import axios from 'axios';
import toTitleCase from './../../../utils/titleCase';
import PopupAdd from '../../PopUp/PopupAdd';

const TambahKomoditiPerikanan= ({ sektor }) => {
  const [nama, setNama] = useState("");
  const [validation, setValidation] = useState([]);
  const bidang = "";
  const kecamatan = "";
  const [popupStyle, showPopup] = useState("hide");
  const [showPopupAdd, setShowPopupAdd] = useState(false);

  const popup =()=>{
      showPopup("Tambah-popup")
      setTimeout(()=> showPopup("hide"),3000)
  }

  const handleConfirm = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('nama', toTitleCase(nama));
    formData.append('sektor', sektor);
    formData.append('bidang', bidang);
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
  };

  const handleCancel = () => {
    // Logika ketika tombol "Tidak" ditekan
    console.log("Batal menambahkan data.");
    setShowPopupAdd(false);
  };

  return (
    <Col className="tambah-komoditi-peternakan">
      <div className="cover-tambah-komoditi-2">
        <h1>Tambah Komoditi</h1>
        <h3>Nama Komoditi</h3>
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
        <div className="tambah-btn" onClick={handleSubmit}>
          Simpan
        </div>
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

export default TambahKomoditiPerikanan;
