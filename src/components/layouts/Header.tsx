import React, { Dispatch, SetStateAction } from "react";
import ticket2attraction from "../../assets/web-logo.webp";
import { useCart } from "../../contexts/CartContext";

interface HeaderProps {
  toggleShowCart: () => void;
  handleScroll:boolean;
}

const Header = ({ toggleShowCart,handleScroll }: HeaderProps) => {
  const { cartItems } = useCart();

  return (
    <div className="border" style={{width:"100vw",position:'fixed',zIndex:"999",backgroundColor:"white"}}>
      <div className="d-flex container justify-content-between px-3 py-2">
        <img
          src={ticket2attraction}
          alt="ticket2attraction"
          style={{ height: "50px", width: "auto" }}
        />

        <div
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}
        >
          <a onClick={toggleShowCart} style={{ position: "relative" }}>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            <span
              className="d-flex justify-content-center align-items-center"
              style={{
                position: "absolute",
                top: "16%",
                left: "100%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(245, 128, 38,0.8)",
                color: "white",
                borderRadius: "10px",
                width: "auto",
                height: "16px",
                padding: "4px",
              }}
            >
              {cartItems.length}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
