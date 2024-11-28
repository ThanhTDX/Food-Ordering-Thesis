import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import React from 'react'
import { Button, Toast, ToastContainer } from "react-bootstrap";

function Toasts({message, variant}) {

  const [toasts, setToasts] = useState([])
  useEffect(() => {
    // Create new toasts with timeout 3000ms
    const newToast = {
      id: nanoid(),
      message: message,
      show: true,
    }    
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === newToast.id ? { ...toast, show: false } : toast
        )
      );
    }, 3000);
  }, [message])
  

  return (
    <ToastContainer position="top-end" className="p-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          show={toast.show}
          autohide delay={3000}
          onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>111</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}

export default Toasts;