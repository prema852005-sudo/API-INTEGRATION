const API_KEY = "825e1fead9389cd664b75bd609b19477"; // get free key from openweathermap.org


const form = document.getElementById("search-form");
const input = document.getElementById("city-input");
const errorEl = document.getElementById("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (city) getWeather(city);
});

async function getWeather(city) {
  errorEl.textContent = "";
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    showWeather(data);
  } catch (err) {
    errorEl.textContent = "⚠️ " + err.message;
  }
}

function showWeather(data) {
  document.getElementById("city").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("date").textContent = new Date().toDateString();
  document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById("condition").textContent = data.weather[0].description;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("wind").textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
  document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}