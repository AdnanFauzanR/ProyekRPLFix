import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "../../Button/Button";
import HasilSaran from "./HasilSaran";
import "./InputformSaran.css";
import axios from "axios";
import PopupAdd from "../../PopUp/PopupAdd";

const InputFormSaran = () => {
  const [saran, setSaran] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saranData, setSaranData] = useState([]);
  const [showPopupAdd, setShowPopupAdd] = useState(false);

  const handleConfirm = async () => {
    const formData = new FormData();
    formData.append('saran', saran);

    await axios.post(`${process.env.REACT_APP_API_URL}/api/Saran`, formData)
      .then((response) => {
        console.log(response.data.message);
        window.location.reload(false);
      }).catch((error) => {
        console.log(error.response.data);
      })
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

  if (submitted) {
    return <HasilSaran saranData={saranData} />;
  }

  return (
    <div className="container-saran">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={20}
            value={saran}
            onChange={(e) => setSaran(e.target.value)}
          />
        </Form.Group>
        <div className="container-button-tambah-data">
          <Button className="TambahSaran" type="submit">
            Tambah Saran
          </Button>
          {showPopupAdd && (
                        <PopupAdd
                            message={"Apakah Anda yakin manambah saran?"}
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                    )}
        </div>
      </Form>
    </div>
  );
};

export default InputFormSaran;