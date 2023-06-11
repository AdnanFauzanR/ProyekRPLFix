import { useState } from 'react';
import { Col } from 'react-bootstrap';
import "./TambahKomoditi.css";
import toTitleCase from './../../../utils/titleCase';
import axios from 'axios';
import PopupAdd from '../../PopUp/PopupAdd';

const TambahKomoditiPertanian= ({ sektor }) => {
  const [selectedBidangKomoditi, setSelectedBidangKomoditi] = useState("");
  const [validation, setValidation] = useState([]);
  const [nama, setNama] = useState("");
  const kecamatan = "";
  const [showPopupAdd, setShowPopupAdd] = useState(false);


  const handleBidangKomoditiChange = (event) => {
    setSelectedBidangKomoditi(event.target.value);
  }

  const [popupStyle, showPopup] = useState("hide")

  const popup =()=>{
      showPopup("Tambah-popup")
      setTimeout(()=> showPopup("hide"),3000)
  }

  const handleConfirm = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    console.log(selectedBidangKomoditi)

    formData.append('nama', toTitleCase(nama));
    formData.append('sektor', sektor);
    formData.append('bidang', selectedBidangKomoditi);
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
      setValidation(error.response.data.error);
      console.log(error.response.data);
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

  return (
    <Col className="container-tambah-komoditi">
      <div className="cover-tambah-komoditi">
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
        <h3>Bidang Komoditi</h3>
        <select value={selectedBidangKomoditi} onChange={handleBidangKomoditiChange}>
          <option value="">Pilih Bidang</option>
          <option value="Tanaman Pangan">Tanaman Pangan</option>
          <option value="Hortikultura">Hortikultura</option>
          <option value="Perkebunan">Perkebunan</option>
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

export default TambahKomoditiPertanian;
