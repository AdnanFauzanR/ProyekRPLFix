import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import LogoApp from "../../../components/LogoApp/LogoApp";
import HeaderAdmin from "../../../components/Header/HeaderAdmin";
import SidebarAdmin from "../../../components/Sidebar/SidebarAdmin";
import KomoditiCategory from "../../../utils/KomoditiCategory";
// import './BerandaAdmin.css';
import checkTokenExpiration from './../../../utils/checkTokenExpiration';
import CarouselNew from "../../../components/Corousel/CarouselBeranda/CarouselNew";


const BerandaAdmin = () => {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [banner, setBanner] = useState([]);
    const fetchData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.get(`${process.env.REACT_APP_API_URL}/api/adminkecamatan`)
        .then((response) => {
            const data = [response.data.name, response.data.kecamatan];
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
        })
    }

    

    async function fetchBanner() {
        try{
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Konten Banner`);
          setBanner(response?.data);
        } catch(err){
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchBanner();
    }, [])

    useEffect(() => {
        if(!token) {
            navigate('/login');
        }

        fetchData();
    }, []);

    useEffect(() => {
        const isTokenExpired = checkTokenExpiration();
        if(isTokenExpired) {
            localStorage.clear();
            navigate('/login');
        }
    });

    
    

    return (
        <div className='container'>
            <div className='logo'>
                <div>
                    <LogoApp />
                </div>
            </div>
            <div className='header'>
                <div>
                    <HeaderAdmin user={user}/>
                </div>
            </div>
            <div className='nav'>
                <SidebarAdmin />
            </div>
        
            <div className='content'>
                <div><h3>Beranda</h3></div>
                <div className="isi_content">
                    <CarouselNew banner={banner}/>
                    <KomoditiCategory />
                </div>
            </div>
        {/* <div className='footer'>footer</div> */}
      </div>
    );
}

export default BerandaAdmin;