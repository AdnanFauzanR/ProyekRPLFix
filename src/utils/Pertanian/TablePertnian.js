import React, {useState} from "react";
import { Button } from "../../components";
import axios from "axios";
import Komoditi from './../Komoditi';
import PopupDeleted from "../../components/PopUp/PopupDeleted";



export function getTablePertanian(navigateToEdit, showPopup, setShowPopup) {
    const deleteHandler = async (id) => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/Pertanian/${id}`)
            .then(() => {
                console.log('Sukses Menghapus Data Pertanian');
                const storedData = localStorage.getItem('dataPertanian');
                const storedDataBeranda = localStorage.getItem('tablePertanian');
                if (storedData) {
                    localStorage.removeItem('dataPertanian');
                }
                if(storedDataBeranda) {
                    localStorage.removeItem('tablePertanian');
                }
                window.location.reload(false);
            })
    }

    // const handleEdit = (row) => {
    //     localStorage.setItem("editData", JSON.stringify(row));
    //     const queryParam = encodeURIComponent(JSON.stringify(row.id));
    //     window.location.href = `/editDataPertanian?id=${queryParam}`;
    // };

    const handleEdit = (row) => {
        const id = row.id;
        navigateToEdit(`/editDataPertanian?id=${id}`);
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
            name: "Bidang",
            selector: row => row.bidang,
            sortable: true
        },
        {
            name: "Luas Panen (Ha)",
            selector: row => row.luas_lahan,
            sortable: true
        },
        {
            name: "Produksi (Ton)",
            selector: row => row.produksi,
            sortable: true
        },
        {
            name: "Produktivitas (Kw/Ha)",
            selector: row => row.produktivitas,
            sortable: true
        },
        {
            name: "",
            selector: row => (
                <div>
                    <Button className="btn-edit"><img src="assets/icon/button/button-edit.svg" onClick={() => handleEdit(row)}/></Button>
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
