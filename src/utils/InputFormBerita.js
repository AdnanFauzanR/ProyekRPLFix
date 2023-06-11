import React, { useState, useEffect } from 'react';
import { Button } from '../components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toTitleCase from './titleCase.js';
import PopupAdd from '../components/PopUp/PopupAdd';

function InputFormBerita({sektor, kecamatan, editData}) {
    const [judul, setJudul] = useState("");
    const [isi, setIsi] = useState("");
    const [gambar, setGambar] = useState(null);
    const [showPopupAdd, setShowPopupAdd] = useState(false);

    const handleIsiChange = (event) => {
        setIsi(event.target.value);
    };

    const history = useNavigate();
    const [validation, setValidation] = useState([]);

    useEffect(() => {
        if (editData) {
            setJudul(editData.judul);
            setIsi(editData.isi);
        }
    }, [editData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowPopupAdd(true);  
    };

    const handleGambarChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
        setGambar(file);
        };
        reader.readAsDataURL(file);
    };

    const handleConfirm = async () => {
      const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('judul', toTitleCase(judul));
        formData.append('sektor', sektor);
        formData.append('kecamatan', kecamatan);
        formData.append('gambar', gambar);
        formData.append('isi', isi);

        const url = editData
      ? `${process.env.REACT_APP_API_URL}/api/Konten Berita/${editData.id}`
      : `${process.env.REACT_APP_API_URL}/api/Konten Berita`;

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
            if (editData) {
                await axios.post(url, formData);
                console.log('Sukses Mengupdate Data Konten Berita');
                localStorage.removeItem('editData');
            } else {
                await axios.post(url, formData);
                console.log('Sukses Menambahkan Data  Konten Berita');
            }

            const storedData = localStorage.getItem('dataKontenBerita');
            if (storedData) {
                localStorage.removeItem('dataKontenBerita')
            }
            history('/berita');
        } catch (error) {
            setValidation(error.response.data.errors);
        }
      console.log("Data telah ditambahkan.");
      setShowPopupAdd(false);
    }

    const handleCancel = () => {
      // Logika ketika tombol "Tidak" ditekan
      console.log("Batal menambahkan data.");
      setShowPopupAdd(false);
    };

    return (
        <form onSubmit={handleSubmit} className='form-input'>
             {
              validation.sektor && (
                <div className="alert-danger">
                  {validation.sektor[0]}
                </div>
              )
            }
             {
              validation.kecamatan && (
                <div className="alert-danger">
                  {validation.kecamatan[0]}
                </div>
              )
            }
            <div className='form-input-row'>
                    <label htmlFor='judul'>Judul</label>
                    <input id='judul' type='text' value={judul} onChange={(e) => setJudul(e.target.value)} />
                    {
              validation.judul && (
                <div className="alert-danger">
                  {validation.judul[0]}
                </div>
              )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor='fileInput'>Pilih Gambar</label>
                <input id='fileInput' type='file' onChange={handleGambarChange}/>
                {
              validation.image && (
                <div className="alert-danger">
                  {validation.image[0]}
                </div>
              )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor='isi'>Isi</label>
                <textarea
                    id="isi"
                    value={isi}
                    onChange={handleIsiChange}
                    style={{
                        minHeight: '20px',
                        maxHeight: '200px',
                        height: 'auto',
                        resize: 'vertical',
                    }}
                    rows={Math.min(20, isi?.split('\n').length)}/>
                    {
              validation.isi && (
                <div className="alert-danger">
                  {validation.isi[0]}
                </div>
              )
                }
            </div>
            <div style={{display: "flex", textAlign: "right", width: "100%"}}>
                <Button className='ButtonTambahBerita' type='submit'>
                    {editData ? 'Ubah Data' : 'Tambah Data'}
                </Button>
                {showPopupAdd && (
                        <PopupAdd
                            message={editData ? "Apakah Anda yakin mengubah data?" : "Apakah Anda yakin manambah data?"}
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                    )}
            </div>
        </form>
  );
}

export default InputFormBerita;
