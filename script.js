let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

// Function to round up a number to the nearest whole number
const roundUp = (number) => {
  return Math.ceil(number);
};

// Function to fetch weather details from API and display them
let getWeather = () => {
  let cityValue = cityRef.value;
  // If input field is empty
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Enter a City Name</h3>`;
  }
  // If input field is NOT empty
  else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=imperial`;
    // Clear the input field
    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())
      // If city name is valid
      .then((data) => {
        console.log(data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.name);
        console.log(data.main.temp_min);
        console.log(data.main.temp_max);
        // Extract weather description
        const weatherDescription = data.weather[0].description;
        // Round up temperature values
        const temp = roundUp(data.main.temp);
        const tempMin = roundUp(data.main.temp_min);
        const tempMax = roundUp(data.main.temp_max);
        result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="desc">${weatherDescription}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${temp}&#176;</h1>
        <h4 class="weather">feels like: ${data.main.feels_like.toFixed()}°</h4>
        <div class="temp-container">
            <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${tempMin}&#176;</h4>
            </div>
            <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${tempMax}&#176;</h4>
            </div>
        </div>
        `;
      })
      // If city name is NOT valid
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Oops! City not found</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
