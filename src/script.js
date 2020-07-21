function callApi() {
  let apiKey = "0077954dacc8f6e7c507909431913e99";
  let unit = "metric";
  let cityInput = document.querySelector("#city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function callLocationApi(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  let apiKey = "0077954dacc8f6e7c507909431913e99";
  let unit = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayLocationWeather);
}

function activateNavigator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(callLocationApi);
}

function displayWeather(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temp-now");
  tempNow.innerHTML = currentTemperature;

  let descriptionElement = document.querySelector("#weather-description");
  let descriptionText = response.data.weather[0].description;
  descriptionElement.innerHTML = descriptionText;

  let tempMinElement = document.querySelector("#temp-min");
  let tempMaxElement = document.querySelector("#temp-max");
  let tempMinValue = Math.round(response.data.main.temp_min);
  let tempMaxValue = Math.round(response.data.main.temp_max);
  tempMinElement.innerHTML = tempMinValue;
  tempMaxElement.innerHTML = tempMaxValue;

  let realFeelElement = document.querySelector("#real-feel");
  let windSpeedElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let realFeelValue = Math.round(response.data.main.feels_like);
  let windSpeedValue = Math.round(3.6 * response.data.wind.speed);
  let humidityValue = response.data.main.humidity;
  realFeelElement.innerHTML = realFeelValue;
  windSpeedElement.innerHTML = windSpeedValue;
  humidityElement.innerHTML = humidityValue;

  //fehlt noch Sunshine h (evtl. durch precipitation ersetzen)
  //fehlt noch Sunrise/Sunset
}

function displayLocationWeather(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temp-now");
  tempNow.innerHTML = currentTemperature;

  let descriptionElement = document.querySelector("#weather-description");
  let descriptionText = response.data.weather[0].description;
  descriptionElement.innerHTML = descriptionText;

  let tempMinElement = document.querySelector("#temp-min");
  let tempMaxElement = document.querySelector("#temp-max");
  let tempMinValue = Math.round(response.data.main.temp_min);
  let tempMaxValue = Math.round(response.data.main.temp_max);
  tempMinElement.innerHTML = tempMinValue;
  tempMaxElement.innerHTML = tempMaxValue;

  let realFeelElement = document.querySelector("#real-feel");
  let windSpeedElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let realFeelValue = Math.round(response.data.main.feels_like);
  let windSpeedValue = Math.round(3.6 * response.data.wind.speed);
  let humidityValue = response.data.main.humidity;
  realFeelElement.innerHTML = realFeelValue;
  windSpeedElement.innerHTML = windSpeedValue;
  humidityElement.innerHTML = humidityValue;

  let locationNameElement = document.querySelector("#current-city");
  let locationNameText = response.data.name;
  locationNameElement.innerHTML = locationNameText;

  //fehlt noch Sunshine h (evtl. durch precipitation ersetzen)
  //fehlt noch Sunrise/Sunset
}

function displayCurrentCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${cityInput.value}`;
  callApi();
}

let citySubmit = document.querySelector("#search-form");
citySubmit.addEventListener("submit", displayCurrentCity);

let locationSubmit = document.querySelector("#location-button");
locationSubmit.addEventListener("click", activateNavigator);

function dateToday() {
  let today = new Date();

  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = weekdays[today.getDay()];

  let currentDate = today.getDate();

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let currentMonth = months[today.getMonth()];

  let currentYear = today.getFullYear();

  let day = document.querySelector("#current-day");
  day.innerHTML = `${currentDay}`;

  let fullDate = document.querySelector("#current-date");
  fullDate.innerHTML = `${currentDate}.${currentMonth}.${currentYear}`;
}
dateToday();

function timeNow() {
  let today = new Date();

  let currentHour = today.getHours();
  let currentMinutes = today.getMinutes();

  let fullTime = document.querySelector("#current-time");
  let updateTime = document.querySelector("#update-time");

  if (currentMinutes > 10) {
    let currentMinutesNew = `${currentMinutes}`;
    fullTime.innerHTML = `${currentHour}:${currentMinutesNew}`;
    updateTime.innerHTML = `${currentHour}:${currentMinutesNew}`;
  } else {
    let currentMinutesNew = `0${currentMinutes}`;
    fullTime.innerHTML = `${currentHour}:${currentMinutesNew}`;
    updateTime.innerHTML = `${currentHour}:${currentMinutesNew}`;
  }
}

timeNow();

function changeTempScale(event) {
  event.preventDefault();
  let alternativeScale = document.querySelector("#alternative-scale");
  let currentScale = document.querySelector("#current-scale");
  let tempNow = document.querySelector("#temp-now");
  let currentTemperature = tempNow.innerHTML;
  currentTemperature = Number(currentTemperature);
  let scaleCheck = alternativeScale.innerHTML;
  if (scaleCheck === "°F") {
    alternativeScale.innerHTML = "°C";
    currentScale.innerHTML = "°F";
    tempNow.innerHTML = Math.round((currentTemperature * 9) / 5 + 32);
  } else {
    alternativeScale.innerHTML = "°F";
    currentScale.innerHTML = "°C";
    tempNow.innerHTML = Math.round(((currentTemperature - 32) * 5) / 9);
  }
}

let alternativeScale = document.querySelector("#alternative-scale");
alternativeScale.addEventListener("click", changeTempScale);