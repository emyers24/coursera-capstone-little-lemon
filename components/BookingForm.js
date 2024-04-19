import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingForm() {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [persons, setPersons] = useState("1");
  const [occasion, setOcassion] = useState("");

  const [btnStatus, setBtnStatus] = useState(false);

  const initializeTimes = ["11:00", "12:00", "13:00"];

  const [availableTimes, setAvailableTimes] = useState(initializeTimes);

  const seededRandom = function (seed) {
    var m = 2 ** 35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
      return (s = (s * a) % m) / m;
    };
  };

  const fetchAPI = function (date) {
    let result = [];
    const newDate = new Date(date);
    let random = seededRandom(newDate.getDate());

    for (let i = 17; i <= 23; i++) {
      if (random() < 0.5) {
        result.push(i + ":00");
      }
      if (random() < 0.5) {
        result.push(i + ":30");
      }
    }
    return result;
  };

  const submitAPI = function (formData) {
    return true;
  };

  const handleDateChange = (value) => {
    setAvailableTimes(fetchAPI(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const boolValue = submitAPI();
    if (boolValue) {
      localStorage.setItem("guests", persons);
      localStorage.setItem("date", date);
      navigate("/confirmation");
      setDate("");
      setTime("");
      setPersons("");
      setOcassion("");
    }
  };

  return (
    <main className="reservation-container">
      <div className="reservation-banner">
        <h1>Table Reservation</h1>
        <p>Don't miss out, book your table now!</p>
      </div>
      <form className="reservation-form">
        <label htmlFor="res-date">Choose date *</label>
        <input
          className="datepicker"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            handleDateChange(e.target.value);
          }}
          type="date"
          id="res-date"
        />

        <label htmlFor="res-time">Choose time *</label>
        <select
          className="timepicker"
          id="res-time "
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          {availableTimes.map((time, index) => {
            return <option key={index}>{time}</option>;
          })}
        </select>

        <label htmlFor="guests">Number of guests</label>
        <input
          className="guests"
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          value={persons}
          onChange={(e) => setPersons(e.target.value)}
        />

        <label htmlFor="occasion">Occasion</label>
        <select
          className="occasion"
          id="occasion"
          value={occasion}
          onChange={(e) => setOcassion(e.target.value)}
        >
          <option>Select occasion</option>
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>

        <div className="btnReceive">
            <input aria-Label='On Click' type='submit' value={"Make Your Reservation"}></input>
        </div>
      </form>
    </main>
  );
}

export default BookingForm;