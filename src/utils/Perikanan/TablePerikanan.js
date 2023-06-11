import React from "react";
import { Button } from "../../components";
import axios from "axios";
import PopupDeleted from "../../components/PopUp/PopupDeleted";

export function getTablePerikanan(navigateToEdit, showPopup, setShowPopup) {
    const deleteHandler = async (id) => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/Perikanan/${id}`)
            .then(() => {
                console.log('Sukses Menghapus Data Perikanan');
                const storedData = localStorage.getItem('dataPerikanan');
                const storedDataBeranda = localStorage.getItem('tablePerikanan');
                if (storedData) {
                    localStorage.removeItem('dataPerikanan');
                }
                if(storedDataBeranda) {
                    localStorage.removeItem('tablePerikanan');
                }
                window.location.reload(false);
            })
    }

    const handleEdit = (row) => {
        const queryParam = encodeURIComponent(row.id);
        navigateToEdit(`/editDataPerikanan?id=${queryParam}`);
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
            name: "Komoditi",
            selector: row => row.komoditi,
            sortable: true
        },
        {
            name: "Volume(Ton)",
            selector: row => row.volume,
            sortable: true
        },
        {
            name: "Nilai Produksi",
            selector: row => row.nilai_produksi,
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
