//date
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
console.log(day);

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day}`;

//time
let hours = now.getHours();
console.log(hours);

let minutes = now.getMinutes();
console.log(minutes);

let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${hours}:${minutes}`;

//enter a city
function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  console.log(cityInput);

  let currentCity = document.querySelector("#current-city");
  if (cityInput.value) {
    currentCity.innerHTML = `${cityInput.value}`;

    let apiKey = "f0efa6d2628a33743d96ce2e48f71ed5";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showCityTemperature);
  }
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCity);

function showCityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let message = `${temperature}°C`;
  let h1 = document.querySelector("#current-city-temp");
  h1.innerHTML = message;
}

//current location
function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f0efa6d2628a33743d96ce2e48f71ed5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-city-temp");
  temperatureElement.innerHTML = `${temperature} °C`;
  let currentLocation = document.querySelector("#current-city");
  let location = response.data.name;
  currentLocation.innerHTML = location;
}

let button = document.querySelector("#current-location-btn");
button.addEventListener("click", getCurrentPosition);
