function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${weekdays[day]}`;
}

function formatTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${hour}:${minutes}`;
}

function displayForecast(response) {
  let forecastElements = document.querySelector("#forecast-elements");
  forecastElements.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElements.innerHTML += `
<div class="col-sm mx-1">
            <div class="card">
              <div class="card-body px-1 py-2">
                <p class="card-text">
                  ${formatDay(forecast.dt)} <br />
                  ${formatTimestamp(forecast.dt)}
                </p>
                <p class="weatherIcon"><i class="wi wi-owm-${
                  forecast.weather[0].id
                }"></i></p>
                <p class="card-text forecastDescription">${
                  forecast.weather[0].description
                }</p>
                <p class="card-text"><span class="tempMaxFc">${Math.round(
                  forecast.main.temp_max
                )}</span><span class="scale">°C</span>/<span class="tempMinFc">${Math.round(
      forecast.main.temp_min
    )}</span><span class="scale">°C</span></p>
              </div>
            </div>
          </div>
`;
  }
}

function callForecastApi() {
  let apiKey = "0077954dacc8f6e7c507909431913e99";
  let unit = "metric";
  let cityInput = document.querySelector("#city-input");
  let locationApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(locationApiUrl).then(displayForecast);
}

function callLocationForecastApi(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "0077954dacc8f6e7c507909431913e99";
  let unit = "metric";

  let locationApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(locationApiUrl).then(displayForecast);
}

function callApi(event) {
  event.preventDefault();
  let apiKey = "0077954dacc8f6e7c507909431913e99";
  let unit = "metric";
  let cityInput = document.querySelector("#city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);

  callForecastApi();
  resetTempScale();
}

function callLocationApi(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  let apiKey = "0077954dacc8f6e7c507909431913e99";
  let unit = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
  resetTempScale();
}

function activateNavigator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(callLocationApi);
  navigator.geolocation.getCurrentPosition(callLocationForecastApi);
}

function displayWeather(response) {
  let currentCityElement = document.querySelector("#current-city");
  let currentCityName = response.data.name;
  currentCityElement.innerHTML = currentCityName;

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

  let cloudinessElement = document.querySelector("#cloudiness");
  let cloudinessValue = response.data.clouds.all;
  cloudinessElement.innerHTML = cloudinessValue;

  let sunriseDate = new Date(response.data.sys.sunrise * 1000);
  let sunriseHour = sunriseDate.getHours();
  let sunriseMinutes = sunriseDate.getMinutes();
  let sunriseElement = document.querySelector("#sunrise-time");
  if (sunriseMinutes < 10) {
    sunriseMinutes = `0${sunriseMinutes}`;
  }
  if (sunriseHour < 10) {
    sunriseHour = `0${sunriseHour}`;
  }
  sunriseElement.innerHTML = `${sunriseHour}:${sunriseMinutes}`;

  let sunsetDate = new Date(response.data.sys.sunset * 1000);
  let sunsetHour = sunsetDate.getHours();
  let sunsetMinutes = sunsetDate.getMinutes();
  let sunsetElement = document.querySelector("#sunset-time");
  if (sunsetMinutes < 10) {
    sunsetMinutes = `0${sunsetMinutes}`;
  }
  if (sunsetHour < 10) {
    sunsetHour = `0${sunsetHour}`;
  }
  sunsetElement.innerHTML = `${sunsetHour}:${sunsetMinutes}`;

  dateToday();
  timeNow();

  let mainIconElement = document.getElementById("main-icon");
  mainIconElement.classList = `wi wi-owm-${response.data.weather[0].id}`;
}

let citySubmit = document.querySelector("#search-form");
citySubmit.addEventListener("submit", callApi);

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
  if (currentDate < 10) {
    fullDate.innerHTML = `0${currentDate}.${currentMonth}.${currentYear}`;
  } else {
    fullDate.innerHTML = `${currentDate}.${currentMonth}.${currentYear}`;
  }
}
dateToday();

function timeNow() {
  let today = new Date();

  let currentHour = today.getHours();
  let currentMinutes = today.getMinutes();

  let fullTime = document.querySelector("#current-time");
  let updateTime = document.querySelector("#update-time");

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  fullTime.innerHTML = `${currentHour}:${currentMinutes}`;
  updateTime.innerHTML = `${currentHour}:${currentMinutes}`;
}

timeNow();

function resetTempScale() {
  let alternativeScale = document.querySelector("#alternative-scale");
  let currentScale = document.querySelector("#current-scale");
  alternativeScale.innerHTML = "°F";
  currentScale.innerHTML = "°C";

  let scaleElements = document.querySelectorAll(".scale");
  let tempScales = null;

  for (let index = 0; index < 13; index++) {
    tempScales = scaleElements[index];
    tempScales.innerHTML = "°C";
  }

  let speedScaleElement = document.querySelector(".speedScale");
  speedScaleElement.innerHTML = "km/h";
}

function changeTempScale(event) {
  event.preventDefault();
  let alternativeScale = document.querySelector("#alternative-scale");
  let currentScale = document.querySelector("#current-scale");
  let tempNow = document.querySelector("#temp-now");
  let currentTemperature = tempNow.innerHTML;
  currentTemperature = Number(currentTemperature);
  let scaleCheck = alternativeScale.innerHTML;

  let tempMinNow = document.querySelector("#temp-min");
  let tempMaxNow = document.querySelector("#temp-max");
  let tempMinNowValue = Number(tempMinNow.innerHTML);
  let tempMaxNowValue = Number(tempMaxNow.innerHTML);

  let realFeelElement = document.querySelector("#real-feel");
  let realFeelValue = Number(realFeelElement.innerHTML);

  if (scaleCheck === "°F") {
    alternativeScale.innerHTML = "°C";
    currentScale.innerHTML = "°F";
    tempNow.innerHTML = Math.round((currentTemperature * 9) / 5 + 32);
    tempMinNow.innerHTML = Math.round((tempMinNowValue * 9) / 5 + 32);
    tempMaxNow.innerHTML = Math.round((tempMaxNowValue * 9) / 5 + 32);
    realFeelElement.innerHTML = Math.round((realFeelValue * 9) / 5 + 32);
  } else {
    alternativeScale.innerHTML = "°F";
    currentScale.innerHTML = "°C";
    tempNow.innerHTML = Math.round(((currentTemperature - 32) * 5) / 9);
    tempMinNow.innerHTML = Math.round(((tempMinNowValue - 32) * 5) / 9);
    tempMaxNow.innerHTML = Math.round(((tempMaxNowValue - 32) * 5) / 9);
    realFeelElement.innerHTML = Math.round(((realFeelValue - 32) * 5) / 9);
  }

  let scaleElements = document.querySelectorAll(".scale");
  let tempScales = null;

  for (let index = 0; index < 13; index++) {
    tempScales = scaleElements[index];
    if (scaleCheck === "°F") {
      tempScales.innerHTML = "°F";
    } else {
      tempScales.innerHTML = "°C";
    }
  }

  let tempMaxFcElements = document.querySelectorAll(".tempMaxFc");
  let tempMaxFcValues = null;

  for (let index = 0; index < 5; index++) {
    tempMaxFcValues = Number(tempMaxFcElements[index].innerHTML);
    if (scaleCheck === "°F") {
      tempMaxFcElements[index].innerHTML = Math.round(
        (tempMaxFcValues * 9) / 5 + 32
      );
    } else {
      tempMaxFcElements[index].innerHTML = Math.round(
        ((tempMaxFcValues - 32) * 5) / 9
      );
    }
  }

  let tempMinFcElements = document.querySelectorAll(".tempMinFc");
  let tempMinFcValues = null;

  for (let index = 0; index < 5; index++) {
    tempMinFcValues = Number(tempMinFcElements[index].innerHTML);
    if (scaleCheck === "°F") {
      tempMinFcElements[index].innerHTML = Math.round(
        (tempMinFcValues * 9) / 5 + 32
      );
    } else {
      tempMinFcElements[index].innerHTML = Math.round(
        ((tempMinFcValues - 32) * 5) / 9
      );
    }
  }

  let speedScaleElement = document.querySelector(".speedScale");
  let windSpeedElement = document.querySelector("#wind-speed");
  let windSpeedValue = Number(windSpeedElement.innerHTML);

  if (scaleCheck === "°F") {
    speedScaleElement.innerHTML = "mph";
    windSpeedElement.innerHTML = Math.round(windSpeedValue / 1.609344);
  } else {
    speedScaleElement.innerHTML = "km/h";
    windSpeedElement.innerHTML = Math.round(windSpeedValue * 1.609344);
  }
}

let alternativeScale = document.querySelector("#alternative-scale");
alternativeScale.addEventListener("click", changeTempScale);
