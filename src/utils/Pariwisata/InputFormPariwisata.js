import React, { useState, useEffect } from 'react';
// import './Inputform.css';
import { Button } from '../../components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toTitleCase from '../titleCase.js';
import PopupAdd from '../../components/PopUp/PopupAdd';

function InputFormPariwisata({jenis_wisata, nama_wisata, editData}) {
    const [showPopupAdd, setShowPopupAdd] = useState(false);

    const handleConfirm = async () => {
      // Logika ketika tombol "Ya" ditekan
      const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('nama_wisata', nama_wisata);
        formData.append('jenis_wisata', jenis_wisata);
        formData.append('desa', toTitleCase(desa));
        formData.append('wisatawan', wisatawan);

        const url = editData
      ? `${process.env.REACT_APP_API_URL}/api/Pariwisata/${editData.id}`
      : `${process.env.REACT_APP_API_URL}/api/Pariwisata`;

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
            if (editData) {
                await axios.post(url, formData);
                console.log('Sukses Mengupdate Data Pariwisata');
                localStorage.removeItem('editData');
            } else {
                await axios.post(url, formData);
                console.log('Sukses Menambahkan Data Pariwisata');
            }

            const storedDataBeranda = localStorage.getItem('tablePariwisata');
            const storedData = localStorage.getItem('dataPariwisata');
            if (storedDataBeranda) {
                localStorage.removeItem('tablePariwisata');
            }
            if (storedData) {
                localStorage.removeItem('dataPariwisata')
            }
            history('/adminpariwisata');
        } catch (error) {
            setValidation(error.response.data.errors);
            console.log(error.response.data.errors);
        }
      console.log("Data telah ditambahkan.");
      setShowPopupAdd(false);
    };
  
    const handleCancel = () => {
      // Logika ketika tombol "Tidak" ditekan
      console.log("Batal menambahkan data.");
      setShowPopupAdd(false);
    };
  
    const handleButtonClick = () => {
      // Logika ketika tombol utama ditekan
      setShowPopupAdd(true);
    };
    
    const [desa, setDesa] = useState("");
    const [wisatawan, setWisatawan] = useState(0);

    const history = useNavigate();
    const [validation, setValidation] = useState([]);

    useEffect(() => {
        if (editData) {
            setDesa(editData.desa);
            setWisatawan(editData.wisatawan)
        }
    }, [editData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(nama_wisata, jenis_wisata, desa, wisatawan);
        setShowPopupAdd(true);
        

    };

    return (
        <form onSubmit={handleSubmit} className='form-input'>
            {
              validation.nama_wisata && (
                <div className="alert-danger">
                  Jenis Wisata dan Nama Wisata harus dipilih
                </div>
              )
            }
            <div className='form-input-row'>
                <label htmlFor='desa'>Desa</label>
                <input id='desa' type='text' value={desa} onChange={(e) => setDesa(e.target.value)} />
                {
              validation.desa && (
                <div className="alert-danger">
                  {validation.desa[0]}
                </div>
              )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor='wisatawan'>Wisatawan</label>
                <input id='wisatawan' type='number' value={wisatawan} onChange={(e) => setWisatawan(e.target.value)} />
                {
              validation.wisatawan && (
                <div className="alert-danger">
                  {validation.wisatawan[0]}
                </div>
              )
                }
            </div>
            <div className='button-add'>
                <Button className="tambahDataButton">
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

export default InputFormPariwisata;