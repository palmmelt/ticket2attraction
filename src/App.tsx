import "./App.css";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tickets from "./components/Tickets";

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Tickets />
        <Cart />
      </div>
      <Footer />
    </div>
  );
}

export default App;
