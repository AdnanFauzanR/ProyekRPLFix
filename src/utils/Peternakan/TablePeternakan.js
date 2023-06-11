import React, { useState } from "react";
import { Button } from "../../components";
import axios from "axios";
import PopupDeleted from "../../components/PopUp/PopupDeleted";

export function getTablePeternakan(navigateToEdit, showPopup, setShowPopup) {
    const deleteHandler = async (id) => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/Peternakan/${id}`)
            .then(() => {
                console.log('Sukses Menghapus Data Peternakan');
                const storedData = localStorage.getItem('dataPeternakan');
                const storedDataBeranda = localStorage.getItem('tablePeternakan');
                if (storedData) {
                    localStorage.removeItem('dataPeternakan');
                }
                if(storedDataBeranda) {
                    localStorage.removeItem('tablePeternakan');
                }
                window.location.reload(false);
            })
    }

    const handleEdit = (row) => {
        const queryParam = encodeURIComponent(row.id);
        navigateToEdit(`/editDataPeternakan?id=${queryParam}`);
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
            name: "Total",
            selector: row => row.total,
            sortable: true
        },
        {
            name: "Kelahiran",
            selector: row => row.kelahiran,
            sortable: true
        },
        {
            name: "Kematian",
            selector: row => row.kematian,
            sortable: true
        },
        {
            name: "Pemotongan",
            selector: row => row.pemotongan,
            sortable: true
        },
        {
            name: "Ternak Masuk",
            selector: row => row.ternak_masuk,
            sortable: true
        },
        {
            name: "Ternak Keluar",
            selector: row => row.ternak_keluar,
            sortable: true
        },
        {
            name: "Populasi",
            selector: row => row.populasi,
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
