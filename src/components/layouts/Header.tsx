import React, { Dispatch, SetStateAction } from "react";
import ticket2attraction from "../../assets/web-logo.webp";
import { useCart } from "../../contexts/CartContext";

interface HeaderProps {
  toggleShowCart: () => void;
  handleScroll: boolean;
}

const Header = ({ toggleShowCart, handleScroll }: HeaderProps) => {
  const { cartItems } = useCart();

  return (
    <div
      className="border"
      style={{
        width: "100vw",
        position: "fixed",
        zIndex: "999",
        backgroundColor: "white",
      }}
    >
      <div className="d-flex container justify-content-between px-3 py-2">
        <img
          src={ticket2attraction}
          alt="ticket2attraction"
          style={{ height: "50px", width: "auto" }}
        />

        <div
          className="d-flex align-items-center gap-3"
          style={{ cursor: "pointer" }}
        >
          <a
            href="http://localhost:8080/api/coupon/free"
            target="_blank"
            style={{ color: "rgb(245, 128, 38)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-ticket-perforated"
              viewBox="0 0 16 16"
            >
              <path d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z" />
              <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z" />
            </svg>
          </a>
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
