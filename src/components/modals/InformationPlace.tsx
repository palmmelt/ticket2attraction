import React from "react";
import { Modal } from "react-bootstrap";

interface InfomationPlaceModalProps {
  closeModal: () => void;
}


type Props = {}

const InformationPlace = ({ closeModal }: InfomationPlaceModalProps) => {
  return (
    <Modal show onHide={closeModal} >InformationPlace</Modal>
  )
}

export default InformationPlace