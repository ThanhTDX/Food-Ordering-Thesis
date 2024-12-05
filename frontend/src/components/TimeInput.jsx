// TimeInput.js
import React, { useState, useEffect } from "react";
import { Form, Alert } from "react-bootstrap";

const TimeInput = ({ error, time, setTime, setError }) => {
  useEffect(() => {
    // Set minimum time to current time on mount
    setTime(time);
  }, []);

  // Function to handle time input change
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;

    // Restrict time selection between 22:00 and 06:00
    const timeRestriction = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      // Convert the input time into a number
      const timeInMinutes = hours * 60 + minutes;
      // Convert to minutes
      const startTime = 22 * 60; // 22:00 in minutes
      const endTime = 6 * 60; // 06:00 in minutes
      // If time is between 22:00 and 06:00, return true
      if (timeInMinutes >= startTime || timeInMinutes < endTime) {
        return true;
      }
      return false;
    };

    // Restrict time selection between 22:00 and 06:00
    const isTimeInRestrictedRange = timeRestriction(selectedTime);

    if (isTimeInRestrictedRange) {
      setError("Time selection between 22:00 and 06:00 is not allowed.");
    } else {
      setError("");
      setTime(selectedTime);
    }
  };

  return (
    <Form.Group controlId="form-time" className="w-100">
      <Form.Control
        type="time"
        name="form-time"
        value={time}
        onChange={handleTimeChange}
        min={time} // Set the minimum time to current time
      />
      {/* Display an error message if time is invalid */}
    </Form.Group>
  );
};

export default TimeInput;
