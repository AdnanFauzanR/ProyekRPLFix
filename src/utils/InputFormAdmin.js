import React, { useState, useEffect } from 'react';
import { Button } from '../components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toTitleCase from './titleCase';
import PopupAdd from '../components/PopUp/PopupAdd';

function InputFormAdmin({editData}) {
    const [name, setName] = useState("");
    const [kecamatan, setKecamatan] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [pass_confirm, setPassConfirm] = useState("");
    const [showPopupAdd, setShowPopupAdd] = useState(false);

    const navigate = useNavigate();
    const [validation, setValidation] = useState([]);

    const handleConfirm = async () => {
      const token = localStorage.getItem('token');
        const formData = new FormData();

        formData.append('name', name);
        formData.append('username', username);
        formData.append('kecamatan', toTitleCase(kecamatan));
        formData.append('password', password);
        formData.append('password_confirmation', pass_confirm);

        const url = editData ? `${process.env.REACT_APP_API_URL}/api/Admin/${editData.id}` : `${process.env.REACT_APP_API_URL}/api/register`;

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
            if (editData) {
                await axios.post(url, formData);
                console.log('Sukses Mengupdate Data Admin Kecamatan');
                localStorage.removeItem('editData');
            } else {
                await axios.post(url, formData);
                console.log('Sukses Menambahkan Admin Kecamatan');
            }

            const storedData = localStorage.getItem('dataAdmin');
            if (storedData) {
                localStorage.removeItem('dataAdmin')
            }
            navigate('/dataAdmin');
        } catch (error) {
            console.log(error.response.data);
            setValidation(error.response.data);
        }
      setShowPopupAdd(false);
    }

    useEffect(() => {
        if (editData) {
            setName(editData.name);
            setUsername(editData.username);
            setKecamatan(editData.kecamatan);
        }
    }, [editData])

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
        <form onSubmit={handleSubmit} className='form-input'>
            <div className='form-input-row'>
                <label htmlFor='name'>Nama Lengkap</label>
                <input id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                {
              validation.name && (
                <div className="alert-danger">
                  {validation.name[0]}
                </div>
              )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor='kecamatan'>Kecamatan</label>
                <input id='kecamatan' type='text' value={kecamatan} onChange={(e) => setKecamatan(e.target.value)} />
                {
              validation.kecamatan && (
                <div className="alert-danger">
                  {validation.kecamatan[0]}
                </div>
              )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor='username'>Username</label>
                <input id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                {
              validation.username && (
                <div className="alert-danger">
                  {validation.username[0]}
                </div>
              )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor='password'>Password</label>
                <input id='password' type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
                {
              validation.password && (
                <div className="alert-danger">
                  {validation.password[0]}
                </div>
              )
                }
            </div>
            <div className='form-input-row'>
                <label htmlFor='pass_confirm'>Konfirmasi Password</label>
                <input id='pass_confirm' type='text' value={pass_confirm} onChange={(e) => setPassConfirm(e.target.value)} />
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

export default InputFormAdmin;