"use client";

import { useState, type ChangeEvent, type JSX } from "react";
import "./PachkanCalculator.css";

type Mode = "auto" | "manual";

interface Result {
  navkarshi: string;
  porsi: string;
  sadhPorsi: string;
  purimudh: string;
  avadh: string;
  choviar: string;
}

export default function PachkanCalculator(): JSX.Element {
  const [mode, setMode] = useState<Mode>("auto");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [statusError, setStatusError] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  function parseTime(timeString: string): Date | null {
    const timeParts = timeString.match(/(\d{1,2}):(\d{2})/);
    if (!timeParts) return null;

    const hours = parseInt(timeParts[1], 10);
    const minutes = parseInt(timeParts[2], 10);

    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  function addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }

  function roundUpToNextMinute(minutes: number): number {
    return Math.ceil(minutes);
  }

  function formatTime(date: Date): string {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  function formatTimeInput(date: Date): string {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  function updateLocationStatus(message: string, isError = false): void {
    setLocationStatus(message);
    setStatusError(isError);
  }

  function calculatePrahar(sunriseInput: string = sunrise, sunsetInput: string = sunset): void {
    const sunriseDate = parseTime(sunriseInput.trim());
    const sunsetDate = parseTime(sunsetInput.trim());

    if (!sunriseDate || !sunsetDate) {
      alert("Please enter valid times for both sunrise and sunset.");
      return;
    }

    const totalDaylightMinutes = (sunsetDate.getTime() - sunriseDate.getTime()) / (1000 * 60);

    const navkarshiMinutes = 48;
    const onePraharMinutes = totalDaylightMinutes / 4;
    const oneAndHalfPraharMinutes = onePraharMinutes * 1.5;
    const twoPraharMinutes = onePraharMinutes * 2;
    const threePraharMinutes = onePraharMinutes * 3;

    setResult({
      navkarshi: formatTime(addMinutes(sunriseDate, roundUpToNextMinute(navkarshiMinutes))),
      porsi: formatTime(addMinutes(sunriseDate, roundUpToNextMinute(onePraharMinutes))),
      sadhPorsi: formatTime(addMinutes(sunriseDate, roundUpToNextMinute(oneAndHalfPraharMinutes))),
      purimudh: formatTime(addMinutes(sunriseDate, roundUpToNextMinute(twoPraharMinutes))),
      avadh: formatTime(addMinutes(sunriseDate, roundUpToNextMinute(threePraharMinutes))),
      choviar: formatTime(sunsetDate),
    });
  }

  async function detectUserLocationAndFillSunTimes(): Promise<void> {
    setLoading(true);

    if (!navigator.geolocation) {
      updateLocationStatus("Geolocation is not supported by this browser.", true);
      setLoading(false);
      return;
    }

    updateLocationStatus("Finding your location...");

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
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

      const data: {
        daily?: {
          sunrise?: string[];
          sunset?: string[];
        };
      } = await response.json();

      const sunriseTime = data.daily?.sunrise?.[0];
      const sunsetTime = data.daily?.sunset?.[0];

      if (!sunriseTime || !sunsetTime) {
        throw new Error("Sunrise or sunset data missing.");
      }

      const newSunrise = formatTimeInput(new Date(sunriseTime));
      const newSunset = formatTimeInput(new Date(sunsetTime));

      setSunrise(newSunrise);
      setSunset(newSunset);

      try {
        const geoResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const geoData: {
          address?: {
            city?: string;
            town?: string;
            village?: string;
            county?: string;
            city_district?: string;
            country?: string;
          };
        } = await geoResponse.json();

        const cityName =
          geoData.address?.city ||
          geoData.address?.town ||
          geoData.address?.village ||
          geoData.address?.county ||
          geoData.address?.city_district ||
          geoData.address?.country ||
          "Unknown location";

        setCity(cityName);
      } catch {
        setCity("Unknown location");
      }

      updateLocationStatus("Location detected successfully.");
      calculatePrahar(newSunrise, newSunset);
    } catch (error) {
      console.error(error);
      updateLocationStatus("Location access blocked or unavailable. Please enter manually.", true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Pachkan Calculator</h1>

      <div className="mode-switch">
        <button className={mode === "auto" ? "mode active" : "mode"} onClick={() => setMode("auto")}>
          🌅 Auto
        </button>
        <button className={mode === "manual" ? "mode active" : "mode"} onClick={() => setMode("manual")}>
         ✍️ Manual
        </button>
      </div>

      {mode === "auto" && (
        <>
          <p className="subtitle">Discover the Navkarshi Chovair and all Pachkan timings from one click</p>
          <div className="auto-section">
            <button className="primary-btn" onClick={detectUserLocationAndFillSunTimes} disabled={loading}>
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <img src="/loading.gif" alt="loading" style={{ width: "18px", height: "18px" }} />
                  Calculating...
                </span>
              ) : (
                "🌅 One Click Pachkan"
              )}
            </button>
          </div>
        </>
      )}

      {mode === "manual" && (
        <>
          <p className="subtitle">
            Discover the Navkarshi and Pachkan timings from your city's sunrise and sunset values.
          </p>
          <div className="manual-section">
            <label>Sunrise Time (HH:MM, 24-hour format)</label>
            <input
              value={sunrise}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSunrise(e.target.value)}
              placeholder="e.g., 06:26"
            />

            <label>Sunset Time (HH:MM, 24-hour format)</label>
            <input
              value={sunset}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSunset(e.target.value)}
              placeholder="e.g., 18:50"
            />

            <button className="secondary-btn" onClick={() => calculatePrahar()} disabled={loading}>
              Calculate
            </button>
          </div>
        </>
      )}

      <p id="locationStatus" style={{ color: statusError ? "#b91c1c" : "#2563eb" }}>
        {locationStatus}
      </p>

      {result && (
        <div id="result">
          {city && (
            <div className="result-title" style={{ marginTop: "6px", fontWeight: 600 }}>
              📍 {city}
            </div>
          )}
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