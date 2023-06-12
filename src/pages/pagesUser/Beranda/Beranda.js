
import React , { useEffect, useState }from "react";
import axios from "axios";
import Carousel from "../../../components/Corousel/CarouselBeranda/Carousel";
import LogoApp from "../../../components/LogoApp/LogoApp";
import Header from "../../../components/Header/Header";
// import './../AdminPage/BerandaAdmin.css'
import News from "../../../utils/News";
import "./Beranda.css";
import CarouselNew from "../../../components/Corousel/CarouselBeranda/CarouselNew";
import SidebarNew from "../../../components/Sidebar/SidebarNew";
import Sidebar from "../../../components/Sidebar/Sidebar";
const Beranda = () => {
    const [dataBerita, setDataBerita] = useState([]);
    const [banner, setBanner] = useState([]);
    
    useEffect(() => {
      async function fetchDataKontenBerita() {
        let data;
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Konten Berita`);
        data = response.data;
        setDataBerita(data);
      }
      fetchDataKontenBerita();
    }, []);

    useEffect(() => {
      async function fetchBanner() {
        try{
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Konten Banner`);
          setBanner(response.data);
        } catch(err){
        }
      }

      fetchBanner()
    }, []);

    return (
      <div className='container'>
        <div className='logo'>
          <div>
            <LogoApp />
          </div>
        </div>
        <div className='header'>
          <div>
            <Header />
          </div>
        </div>
        <div className='nav'>
          <Sidebar />
        </div>
        
        <div className='content'>
          <div><h3>Beranda</h3></div>
            <div className="isi_content">
                <CarouselNew banner={banner}/>
                <News news={dataBerita}/>
            </div>
        </div>
        

        {/* <div className='footer'>footer</div> */}
      </div>
    );
}

export default Beranda;