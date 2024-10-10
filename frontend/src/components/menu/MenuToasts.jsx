import React from 'react'
import { Button, Toast, ToastContainer } from "react-bootstrap";

function MenuToasts({toasts, setToasts}) {
  return (
    <ToastContainer position="top-end" className="p-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          show={toast.show}
          onClose={() => setToasts(toasts.filter((t) => t.id !== toast.id))}
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}

export default MenuToasts