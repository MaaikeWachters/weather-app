// Displaying current day of the week and time
function displayDayTime() {
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
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let twoDigitMinutes = minutes.toString().padStart(2, "0");

  let display = document.querySelector("#day-and-time");
  display.innerHTML = `${day} ${hour}:${twoDigitMinutes}`;
}

displayDayTime();

// Search engine

function getApiUrl(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input").value;

  let apiKey = "8349c141fbb6f5894a4cba912fc31bd0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(getWeatherData);
}

let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", getApiUrl);

function getWeatherData(response) {
  // Shorter way of changing the innerHTML:
  document.querySelector("#city").innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let replaceTemperature = document.querySelector("#temperature");
  replaceTemperature.innerHTML = temperature;

  let humidity = response.data.main.humidity;
  console.log(humidity);
  let replaceHumidity = document.querySelector("#humidity");
  replaceHumidity.innerHTML = `${humidity} %`;

  let sunrise = response.data.sys.sunrise;
  console.log(sunrise);
  // adding timezone offset from the api data set
  let timeZoneOffset = response.data.timezone;
  console.log(timeZoneOffset);
  let timeZoneSunrise = sunrise + timeZoneOffset;
  console.log(timeZoneSunrise);

  function convertTimestamp() {
    let date = new Date(timeZoneSunrise * 1000);
    // subtracting the time zone offset from local time
    let timezoneQuirk = date.getTimezoneOffset();
    timezoneQuirk = timezoneQuirk / 60;
    console.log(timezoneQuirk);

    let hour = date.getHours();
    hour = hour + timezoneQuirk;
    let minutes = date.getMinutes();
    let twoDigitMinutes = minutes.toString().padStart(2, "0");
    let replaceSunrise = document.querySelector("#sunrise");
    replaceSunrise.innerHTML = `${hour}:${twoDigitMinutes}`;
  }

  convertTimestamp();
}

// Current location button

function changeCityName(event) {
  event.preventDefault();
  console.log("test");

  function getApiUrl(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "8349c141fbb6f5894a4cba912fc31bd0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(getWeatherData);
  }
  navigator.geolocation.getCurrentPosition(getApiUrl);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", changeCityName);
