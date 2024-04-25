import "./App.css";
import CartModal from "./components/modals/CartModal";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Tickets from "./components/others/Tickets";
import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import SortPlacesBar from "./components/others/SortPlacesBar";
import BackToTop from "./components/equipment/BackToTop";

export interface placesType {
  name: any;
  id: string;
  place: string;
  price: string;
  picture: string;
  information: string;
}

function App() {
  const [showCart, setShowCart] = useState(false);
  const [places, setPlaces] = useState<placesType[]>([]);

  const [headerScroll, setHeaderScroll] = useState(false);

  const [isLoading, respond] = useFetch({
    url: "http://localhost:8080/api/places",
  });

  //! Show Cart
  const toggleShowCart = () => {
    setShowCart((prevState) => !prevState);
  };

  //! event scroll mouse
  const handleScroll = () => {
    setHeaderScroll(window.scrollY >= 100);
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
  useEffect(() => {
    if (respond.length > 0) {
      setPlaces(respond);
    }
  }, [respond]);

  return (
    <div className="App">
      <Header toggleShowCart={toggleShowCart} handleScroll={headerScroll}/>
      {/* <div style={{ height: "auto",display:"flex" }}></div> */}
      <SortPlacesBar places={places} setPlaces={setPlaces} />
      <Tickets places={places} isLoading={isLoading} />
      {showCart ? <CartModal closeModal={toggleShowCart} /> : ""}
      <BackToTop handleScroll={headerScroll}/>
      <Footer />
    </div>
  );
}

export default App;
