import React from "react";
import { Button } from "../../components";
import axios from "axios";
import PopupDeleted from "../../components/PopUp/PopupDeleted";

export function getTablePariwisata(navigateToEdit, showPopup, setShowPopup) {
    const deleteHandler = async (id) => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/Pariwisata/${id}`)
            .then(() => {
                console.log('Sukses Menghapus Data Pariwisata');
                const storedData = localStorage.getItem('dataPariwisata');
                const storedDataBeranda = localStorage.getItem('tablePertanian');
                if (storedData) {
                    localStorage.removeItem('dataPariwisata');
                }
                if(storedDataBeranda) {
                    localStorage.removeItem('tablePariwisata');
                }
                window.location.reload(false);
            })
    }

    const handleEdit = (row) => {
        const queryParam = encodeURIComponent(row.id);
        navigateToEdit(`/editDataPariwisata?id=${queryParam}`);
    };

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


    return [
        {
            name: "No",
            cell: (row, index) => <div>{index + 1}</div>,
            sortable: true
        },
        {
            name: "Nama Wisata",
            selector: row => row.nama_wisata,
            sortable: true
        },
        {
            name: "Jenis Wisata",
            selector: row => row.jenis_wisata,
            sortable: true
        },
        {
            name: "Desa",
            selector: row => row.desa,
            sortable: true
        },
        {
            name: "Wisatawan",
            selector: row => row.wisatawan,
            sortable: true
        },
        {
            name: "",
            selector: row => (
                <div>
                    <Button className="btn-edit" onClick={() => handleEdit(row)}><img src="assets/icon/button/button-edit.svg"/></Button>
                    <Button className="btn-delete" onClick={handleButtonClick}><img src="assets/icon/button/button-delete.svg"/></Button>
                    {showPopup && (
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
