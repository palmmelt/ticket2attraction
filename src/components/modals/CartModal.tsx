import axios from "axios";
import { cartItemsType, useCart } from "../../contexts/CartContext";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ModalCartContainer } from "src/styles/classes/ModalCart";
import MainButton from "src/styles/components/buttons/MainButton";
import DangerButton from "src/styles/components/buttons/DangerButtom";
import DisButton from "src/styles/components/buttons/DisButton";
import Swal from "sweetalert2";
import { Method, fetchAPI } from "src/common/fetchAPI";

interface CartModalProps {
  closeModal: () => void;
}

type TicketBuy = {
  id: number;
  amount: number;
};

type supResponseCoupon = {
  message: string;
  discount: number;
};

interface ResponseCoupon {
  status: string;
  data: supResponseCoupon;
}

const CartModal = ({ closeModal }: CartModalProps) => {
  const { cartItems, manangeTicket, removeFromCart, clearCart } = useCart();

  const [coupon, setCoupon] = useState<string>("");
  const [resCoupon, setResCoupon] = useState<ResponseCoupon>(initialresCoupon);

  //! total price
  const total = cartItems.reduce((previousValue, currentItem) => {
    if (currentItem.amount !== undefined) {
      return previousValue + parseFloat(currentItem.price) * currentItem.amount;
    } else {
      return previousValue;
    }
  }, 0);

  //! Total price after used coupon
  const grandTotal = cartItems.reduce((previousValue, currentItem) => {
    if (currentItem.amount !== undefined) {
      return (
        previousValue +
        parseFloat(currentItem.price) * currentItem.amount -
        resCoupon.data.discount
      );
    } else {
      return previousValue;
    }
  }, 0);

  //! Change and check coupon
  const handleChangeCoupon = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(e.target.value);
    if (e.target.value.length === 6) {
      try {
        //? Return Status "OK" | "NotFound" <String/> and Message
        const res:any = await fetchAPI({
          url: "http://localhost:8080/api/coupon/check",
          method: Method.POST,
          data: { coupon:  e.target.value  },
        });
        console.log(res.data)
        setResCoupon(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  //! submit Order
  const submitOrder = async ({
    cart,
    coupon,
  }: {
    cart: cartItemsType[];
    coupon: string;
  }) => {
    try {
      //? Return Status "OK" | "NotFound" | NoItem <String/> and Message
      const res:any = await fetchAPI({
        url: "http://localhost:8080/api/request/buy",
        method: Method.POST,
        data: { cart: cart, coupon: coupon },
      });
      
      if (res.data.status === "OK") {
        clearCart();
        closeModal();
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.data.message,
          footer: `${res.data.data.bil} THB`,
          showConfirmButton: false,
          timer: 3000,
        });
      }
      if (res.data.status === "NotFound") {
        Swal.fire({
          icon: "error",
          title: "The coupon is invalid.",
          text: res.data.data.message,
          timer: 3000,
        });
      }
      if (res.data.status === "NoItem") {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: res.data.data.message,
          timer: 3000,
        });
        closeModal();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //! List cart your selected
  const cartList = cartItems.map((c, index) => {
    return (
      <tr key={c.key}>
        <th scope="row">{index + 1}</th>
        <td className="flex justify-content-center align-items-center">
          <img
            src={c.picture}
            style={{ aspectRatio: "3/2", width: "50px", height: "50px" }}
          ></img>
        </td>
        <td className="flex justify-content-center align-items-center">
          {c.place}
        </td>
        <td className="flex justify-content-center align-items-center">
          {c.price}
        </td>
        <td className="flex justify-content-center align-items-center gap-1">
          <button
            onClick={() => manangeTicket(c.id, false)}
            style={{ backgroundColor: "rgba(255, 178, 88,0)", border: "none" }}
          >
            -
          </button>
          <span>{c.amount}</span>
          <button
            onClick={() => manangeTicket(c.id, true)}
            style={{ backgroundColor: "rgba(255, 178, 88,0)", border: "none" }}
          >
            +
          </button>
        </td>
        <td className="flex justify-content-center align-items-center">
          {Number(c.price) * Number(c.amount)}
        </td>
        <td className="flex justify-content-center align-items-center">
          <DangerButton onClick={() => c.key && removeFromCart(c.key)}>
            Remove
          </DangerButton>
        </td>
      </tr>
    );
  });

  return (
    <Modal show onHide={closeModal}>
      <ModalCartContainer>
        <div
          className="d-flex flex-column -classes-modal-cart table-responsive"
        >
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Image</th>
                <th scope="col">Place</th>
                <th scope="col">Price</th>
                <th scope="col">Amout</th>
                <th scope="col">Total Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{cartList}</tbody>
          </table>
        </div>
        <div
          className="d-flex  flex-column py-2 gap-2"
          style={{
            borderTop: "1px solid black",
            borderBlock: "1px solid black",
          }}
        >
          <div className="d-flex justify-content-between px-3">
            <span>Total price</span> <span>{total} THB</span>
          </div>
          <div className="d-flex justify-content-between px-3">
            <span className="d-flex flex-column flex-sm-row justify-content-between gap-0 gap-sm-3">
              Discount
              <input
                type="text"
                onChange={handleChangeCoupon}
                placeholder="XXX-XXX"
                maxLength={6}
                style={{
                  border: `1px solid ${
                    resCoupon.status === "OK" ? "green" : "red"
                  }`,
                  paddingRight:'5px',
                  paddingLeft:'5px',
                }}
              />
            </span>
            <span style={{ color: "red" }}>{resCoupon.data.discount} THB</span>
          </div>
          <div className="d-flex justify-content-between px-3">
            <span>Grand Total</span>{" "}
            <span>{grandTotal < 0 ? 0 : grandTotal} THB</span>
          </div>
        </div>
        <div
          className="d-flex justify-content-end align-items-end py-3 gap-3"
          style={{ width: "100%" }}
        >
          <DisButton onClick={() => closeModal()}>Close</DisButton>
          <MainButton
            onClick={() => submitOrder({ cart: cartItems, coupon: coupon })}
          >
            Buy
          </MainButton>
        </div>
      </ModalCartContainer>
    </Modal>
  );
};

const initialFormBuy = {
  coupon: "",
  ticketSelected: [],
};

const initialresCoupon = {
  status: "",
  data: {
    message: "coupon discount",
    discount: 0,
  },
};

export default CartModal;
