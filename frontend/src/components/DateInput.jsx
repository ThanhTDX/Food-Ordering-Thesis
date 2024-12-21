// DateInput.js
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const DateInput = ({date, setDate, disabled}) => {
  const [minDate, setMinDate] = useState("");

  // Set minDate to today's date on mount
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setMinDate(formattedDate);
  }, []);

  // Function to handle date input change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    console.log(selectedDate);
    setDate(selectedDate);
  };

  return (
    <Form.Group controlId="form-date" className="w-100">
      <Form.Control
        type="date"
        name="form-date"
        value={date}
        onChange={handleDateChange}
        min={minDate} // Set minimum date to today's date
        disabled={disabled}
      />
    </Form.Group>
  );
};

export default DateInput;
