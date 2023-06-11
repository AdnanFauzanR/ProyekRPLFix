import React, { useState } from "react";
import { Button } from "../../Button/Button";
import axios from "axios";
import "./HasilSaran.css";
import PopupDeleted from "../../PopUp/PopupDeleted";


const HasilSaranPusat = ({saranData}) => {
  const token = localStorage.getItem('token');
  const [showPopup, setShowPopup] = useState(false);

  const deleteHandler = async (id) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/Saran/${id}`)
      .then((response) => {
        console.log(response)
        window.location.reload(false);
      }).catch((error) => {
        console.log(error)
      })
  }

  const handleConfirm = (id) => {
    // Logika ketika tombol "Ya" ditekan
    deleteHandler(id);
    console.log("Data telah dihapus.");
    setShowPopup(false);
};

const handleCancel = () => {
    // Logika ketika tombol "Tidak" ditekan
    console.log("Batal menghapus data.");
    setShowPopup(false);
};

const handleButtonClick = () => {
    // Logika ketika tombol utama ditekan
    setShowPopup(true);
};

  return (
    <div style={{
      width: "100%", 
      height: "maxContent", 
      padding: "10px", 
      display: "flex",
      borderRadius: "15px"

      }}>
        <div className="saranStyleContainer">
          {saranData.map((saran, index) => (
            <div key={saran.id} className="saranStyle">
              <span>{saran.saran}</span>
              <span className="container-delete-saran">
                <Button className="btn-delete" onClick={handleButtonClick}> 
                  <img src="assets/icon/button/button-delete.svg"/>
                </Button>
                {showPopup && (
                        <PopupDeleted
                        message="Apakah Anda yakin menghapus data?"
                        onConfirm={() => handleConfirm(saran.id)}
                        onCancel={handleCancel}
                        />
                    )}
              </span>
            </div>
          ))}
        </div>
      </div>
  );
};

export default HasilSaranPusat;