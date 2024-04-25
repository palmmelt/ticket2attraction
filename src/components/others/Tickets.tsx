import { placesType } from "../../App";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import FirstSubButton from "src/styles/components/FirstSubButton";
import { v4 as uuidv4 } from "uuid";

const Tickets = ({
  places,
  isLoading,
}: {
  places: placesType[];
  isLoading: boolean;
}) => {
  const { cartItems, addToCart } = useCart();

  const placeList = places.map((place) => {
    const uuid = uuidv4();
    return (
      <div
        className="d-flex flex-column justify-content-center justify-content-sm-start col-9 col-sm-8 col-md-4 col-xl-3 gap-4 pt-3 pb-3"
        style={{ height: "380px" }}
        key={uuid}
      >
        <div className="m-1 border" style={{ height: "100%" }}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            <img
              src={place.picture}
              alt={place.place}
              style={{
                aspectRatio: "3/2",
                width: "100%",
                transition: "transform 0.3s",
                // transform: onHover ? "scale(1.1)" : "scale(1)",
              }}
            />
            <span
              style={{
                position: "absolute",
                width: "auto",
                left: "0%",
                top: "20%",
                transform: "translate(0%, -100%)",
                background: "rgb(0,0,0,0.6)",
                color: "white",
              }}
            >
              Read more
            </span>
          </div>
          <div
            className="d-flex flex-column justify-content-between my-3"
            style={{ width: "100%", height: "100px" }}
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ cursor: "default" }}
            >
              <h5>{place.place}</h5>
            </div>
            <div>
              <div
                className="d-flex justify-content-around align-items-start "
                style={{ height: "100%", cursor: "default" }}
              >
                <h5 className="gap-2 h-5">
                  <b style={{color:"red"}}>{place.price}</b>&nbsp;
                  <small className="text-muted red">THB</small>
                </h5>
                  {/* <button
                    onClick={() => {
                      addToCart(place);
                    }}
                  >
                    Add
                  </button> */}
                  <FirstSubButton onClick={() => {
                      addToCart(place);
                    }}>
                    Add+
                  </FirstSubButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex" style={{ width: "100%", minHeight: "70vh" }}>
      {isLoading ? (
        <BeatLoader color="rgb(245, 128, 38)" />
      ) : places.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh", width: "100%" }}
        >
          <h2>Not Found Place Ticket</h2>
        </div>
      ) : (
        <div className="container ">
          <div
            className="d-flex justify-content-center justify-content-md-start row"
            style={{ height: "100%" }}
          >
            {placeList}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tickets;
