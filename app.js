<!DOCTYPE html>
<html>
<head>
  <title>Buggy SF Weather</title>
</head>
<body>
  <h1>San Francisco Weather</h1>
  <p id="time">Loading time...</p>
  <p id="weather">Loading weather...</p>

  <script>
    function updateTime() {
      document.getElementById("time").innerText =
        "Local time: " +
        new Date().toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles" });
    }

    async function getWeather() {
      try {
        const url =
          "https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current_weather=true";

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // BUG: Wrong property name sometimes causes undefined
        const temp = data.current.temperature;

        document.getElementById("weather").innerText =
          "Temperature: " + temp + "°F";
      } catch (err) {
        document.getElementById("weather").innerText =
          "Weather is broken 😵";
      }
    }

    updateTime();
    setInterval(updateTime, 1000);

    getWeather();
  </script>
</body>
</html>
