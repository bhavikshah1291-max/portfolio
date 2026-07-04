import { useState } from "react";
import "./PachkanCalculator.css";

export default function PachkanCalculator() {
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [statusError, setStatusError] = useState(false);
  const [result, setResult] = useState(null);

  function parsePDTTime(timeString) {
    const currentDateString = new Date().toISOString().split("T")[0];
    const dateTimeString = `${currentDateString} ${timeString}`;
    const date = new Date(dateTimeString);

    if (isNaN(date.getTime())) {
      const [time, modifier] = timeString.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const utcDate = new Date(currentDateString);
      utcDate.setUTCHours(hours + 7);
      utcDate.setUTCMinutes(minutes);

      return utcDate;
    }

    return date;
  }

  function parseTime(timeString) {
    const timeParts = timeString.match(/(\d{1,2}):(\d{2})/);

    if (!timeParts) return null;

    const hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);

    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date;
  }

  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  function roundUpToNextMinute(minutes) {
    return Math.ceil(minutes);
  }

  function formatTime(date) {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  function formatTimeInput(date) {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  function updateLocationStatus(message, isError = false) {
    setLocationStatus(message);
    setStatusError(isError);
  }

  function calculatePrahar() {
    const sunriseDate = parseTime(sunrise.trim());
    const sunsetDate = parseTime(sunset.trim());

    if (!sunriseDate || !sunsetDate) {
      alert("Please enter valid times for both sunrise and sunset.");
      return;
    }

    const totalDaylightMinutes = (sunsetDate - sunriseDate) / (1000 * 60);

    const navkarshiMinutes = 48;
    const onePraharMinutes = totalDaylightMinutes / 4;
    const oneAndHalfPraharMinutes = onePraharMinutes * 1.5;
    const twoPraharMinutes = onePraharMinutes * 2;
    const threePraharMinutes = onePraharMinutes * 3;

    setResult({
      navkarshi: formatTime(
        addMinutes(sunriseDate, roundUpToNextMinute(navkarshiMinutes))
      ),
      porsi: formatTime(
        addMinutes(sunriseDate, roundUpToNextMinute(onePraharMinutes))
      ),
      sadhPorsi: formatTime(
        addMinutes(sunriseDate, roundUpToNextMinute(oneAndHalfPraharMinutes))
      ),
      purimudh: formatTime(
        addMinutes(sunriseDate, roundUpToNextMinute(twoPraharMinutes))
      ),
      avadh: formatTime(
        addMinutes(sunriseDate, roundUpToNextMinute(threePraharMinutes))
      ),
      choviar: formatTime(sunsetDate),
    });
  }

  async function detectUserLocationAndFillSunTimes() {
    if (!navigator.geolocation) {
      updateLocationStatus(
        "Geolocation is not supported by this browser.",
        true
      );
      return;
    }

    updateLocationStatus("Finding your location...");

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000,
        });
      });

      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=sunrise,sunset&timezone=auto`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch sunrise and sunset.");
      }

      const data = await response.json();

      const sunriseTime = data.daily?.sunrise?.[0];
      const sunsetTime = data.daily?.sunset?.[0];

      if (!sunriseTime || !sunsetTime) {
        throw new Error("Missing sunrise/sunset.");
      }

      setSunrise(formatTimeInput(new Date(sunriseTime)));
      setSunset(formatTimeInput(new Date(sunsetTime)));

      updateLocationStatus(
        "Sunrise and sunset time filled from your location."
      );

      setTimeout(() => {
        calculatePrahar();
      }, 0);
    } catch (error) {
      console.error(error);
      updateLocationStatus(
        "Location access was blocked or unavailable. Please enter times manually.",
        true
      );
    }
  }

  return (
    <div className="container">
      <h1>Pachkan Calculator</h1>

      <p className="subtitle">
        Discover the Navkarshi and Prahar timings from your sunrise and sunset
        values.
      </p>

      <label>Sunrise Time (HH:MM, 24-hour format)</label>

      <input
        value={sunrise}
        onChange={(e) => setSunrise(e.target.value)}
        placeholder="e.g., 06:26"
      />

      <label>Sunset Time (HH:MM, 24-hour format)</label>

      <input
        value={sunset}
        onChange={(e) => setSunset(e.target.value)}
        placeholder="e.g., 18:50"
      />

      <div className="button-row">
        <button
          className="primary-btn"
          onClick={detectUserLocationAndFillSunTimes}
        >
          Use My Location
        </button>

        <button className="secondary-btn" onClick={calculatePrahar}>
          Calculate
        </button>
      </div>

      <p
        id="locationStatus"
        style={{ color: statusError ? "#b91c1c" : "#2563eb" }}
      >
        {locationStatus}
      </p>

      {result && (
        <div id="result">
          <div className="result-title">Your Prahar Timing</div>

          <p>Navkarshi: {result.navkarshi}</p>
          <p>Porsi: {result.porsi}</p>
          <p>Sadh Porsi: {result.sadhPorsi}</p>
          <p>Purimudh: {result.purimudh}</p>
          <p>Avadh: {result.avadh}</p>
          <p>Choviar: {result.choviar}</p>
        </div>
      )}
    </div>
  );
}