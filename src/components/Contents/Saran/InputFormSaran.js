import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "../../Button/Button";
import HasilSaran from "./HasilSaran";
import "./InputformSaran.css";

const InputFormSaran = () => {
  const [saran, setSaran] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saranData, setSaranData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaranData([...saranData, saran]);
    setSaran("");
    setSubmitted(true);
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
            rows={10}
            value={saran}
            onChange={(e) => setSaran(e.target.value)}
          />
        </Form.Group>
        <div className="container-button-tambah-data">
          <Button className="TambahSaran" type="submit">
            Tambah Saran
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default InputFormSaran;