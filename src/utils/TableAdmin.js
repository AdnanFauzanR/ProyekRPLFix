import React, {useState} from 'react'
import { Button } from "../components";
import PopupEdit from '../components/PopUp/PopupEdit';
import PopupDeleted from '../components/PopUp/PopupDeleted';
import axios from "axios";

const TableAdmin = (navigateToEdit) => {

    const deleteHandler = async (id) => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/Admin/${id}`)
            .then(() => {
                console.log('Sukses Menghapus Data Admin');
                const storedData = localStorage.getItem('dataAdmin');
                if (storedData) {
                    localStorage.removeItem('dataAdmin');
                }
                window.location.reload(false);
            })
    }
    // const handleEdit = (id) => {
    //     navigateToEdit(`/editAdmin?id=${id}`);
    // }

    const [showPopupDeleted, setShowPopupDeleted] = useState(false);

    const handleConfirm = (id) => {
        // Logika ketika tombol "Ya" ditekan
        deleteHandler(id);
        console.log("Data telah dihapus.");
        setShowPopupDeleted(false);
    };

    const handleCancel = () => {
        // Logika ketika tombol "Tidak" ditekan
        console.log("Batal menambahkan data.");
        setShowPopupDeleted(false);
    };

    const handleButtonClick = () => {
        // Logika ketika tombol utama ditekan
        setShowPopupDeleted(true);
    };

    const [showPopupEdit, setShowPopupEdit] = useState(false);

    const handleConfirmEdit = (row) => {
        // Logika ketika tombol "Ya" ditekan
        navigateToEdit(`/editAdmin?id=${row.id}`);
    };

    const handleCancelEdit = () => {
        // Logika ketika tombol "Tidak" ditekan
        console.log("Batal menambahkan data.");
        setShowPopupEdit(false);
    };

    const handleButtonClickEdit = () => {
        // Logika ketika tombol utama ditekan
        setShowPopupEdit(true);
    };

    return [
        {
            name: "No",
            cell: (row, index) => <div>{index + 1}</div>,
            sortable: true
        },
        {
            name: "Id",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Nama Lengkap",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Kecamatan",
            selector: row => row.kecamatan,
            sortable: true
        },
        {
            name: "Username",
            selector: row => row.username,
            sortable: true
        },
        {
            name: "Password",
            selector: row => row.password,
            sortable: true
        },
        {
            name: "",
            selector: row => (
                <div>
                    <Button className="btn-edit" onClick={() => handleConfirmEdit(row)}><img src="assets/icon/button/button-edit.svg"/></Button>
                    {/* {showPopupEdit && (
                        <PopupEdit
                            message="Apakah Anda yakin akan mengedit data?"
                            onConfirm={() => handleConfirmEdit(row)}
                            onCancel={handleCancelEdit}
                        />
                    )} */}
                    <Button className="btn-delete" onClick={handleButtonClick}><img src="assets/icon/button/button-delete.svg"/></Button>
                    {showPopupDeleted && (
                        <PopupDeleted
                        message="Apakah Anda yakin menghapus data?"
                        onConfirm={() => handleConfirm(row.id)}
                        onCancel={handleCancel}
                        />
                    )}
                </div>
            ),
            sortable: true
        }
    ];
}
export default TableAdmin;
