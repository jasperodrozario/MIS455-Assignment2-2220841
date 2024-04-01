function connect() {
    const searchItem = document.getElementById("search-bar").value.trim();
    const url = `https://restcountries.com/v3.1/name/${searchItem}?fullText=true`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (!data.status) {
            display(data);
        }
        else {
            alert(`Country not found.`)
        }
    })
    .catch(error => console.error("Error fetching data:", error));
}

// function showDetails() {
//     // var url = `https://restcountries.com/v3.1/name/${searchItem}`;
//     // fetch(url)
//     // .then(res => res.json())
//     // .then(data => show(data))

//     var prev_content = document.getElementById("content-box");
//     var more_content = document.createElement("div");
//     more_content.innerHTML = `Native Name: <b> ${data[0].name.nativeName} </b>`
//     more_content.classList.add("innerStyle");
//     prev_content.appendChild(more_content);
// }

function display(data) {
    const prev_content = document.getElementById("content-box");
    prev_content.innerHTML = "";
    const new_content = document.createElement("div");
    new_content.classList.add("innerStyle");
    prev_content.classList.add("display-flex")

    new_content.innerHTML =
        `<h2 style="margin=0px">${data[0].name.common}</h2>
        <img src="${data[0].flags.svg}" alt="Flag of ${data[0].name.common}" width="100">
        <p>Population: ${data[0].population.toLocaleString()}</p>
        <p>Capital: ${data[0].capital[0] || 'Capital not available'}</p>
        <p>Continents: ${data[0].continents}</p>
        <div class="weather-placeholder"></div>
        <button onclick="showDetails('${data[0].capital[0]}')" style="height: 30px; margin-right: 5px">More Details</button>
        <button onclick="closeSearchResults()" style="height: 30px; width: 70px">Close</button>`;
    prev_content.appendChild(new_content);
}

function showDetails(capitalCity) {
    const apiKey = '273312d121b2d9d948abe6ef10e7b61e'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            }
        });
}

function displayWeather(data) {
    const prev_content = document.getElementById("content-box");
    const weatherContent = document.querySelector('#content-box .weather-placeholder');
    if (data && data.main && data.weather) {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;

        weatherContent.innerHTML = 
            `<br><br><br>
            <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather icon">
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${weatherDescription}</p>`;
        const detailsBox = document.createElement("div");
        detailsBox.appendChild(weatherContent);
        detailsBox.classList.add("innerStyle");
        prev_content.appendChild(detailsBox);
    } else {
        alert("Weather data is not available.");
    }
}

function closeSearchResults() {
    const prev_content = document.getElementById('content-box');
    prev_content.innerHTML = ''; 
}