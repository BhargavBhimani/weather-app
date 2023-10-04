document.addEventListener("DOMContentLoaded", () => {
    const apiKey = 'ecafe6e363e24a5684d62515232509'

    const cityName = document.getElementById('search');
    const searchButton = document.getElementById('searchButton');

    const time = document.getElementById('time');
    const d = new Date();
    const yestDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() - 1);
    const tomDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 1);
    time.textContent = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()

    const loader = document.getElementById('loader')
    loader.style.display = 'none';

    const cityNam = document.getElementById('cityNam');
    cityNam.innerHTML = 'Weather of <strong>Ahmedabad</strong>'

    // today's temp variable
    const temprature = document.getElementById("temprature");
    const temprature_f = document.getElementById("temprature_f");
    const feelslike_c = document.getElementById("feelslike_c");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind_kph");


    // yesterday temp varaiable
    const avgtemp_c = document.getElementById('avgtemp_c');
    const avgtemp_f = document.getElementById('avgtemp_f');
    const avghumidity = document.getElementById('avghumidity');
    const maxwind = document.getElementById('maxwind_kph');

    // tomorrow temp variable
    const tom_avgtemp_c = document.getElementById('tom_avgtemp_c');
    const tom_avgtemp_f = document.getElementById('tom_avgtemp_f');
    const tom_avghumidity = document.getElementById('tom_avghumidity');
    const tom_maxwind_kph = document.getElementById('tom_maxwind_kph');



    fetch(`https://api.weatherapi.com/v1/current.json?q=ahmedabad&key=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {

            // cityName.innerText = data.location.name;
            temprature.innerText = data.current.temp_c + " ℃";
            temprature_f.innerText = data.current.temp_f + " ℉"
            feelslike_c.innerText = data.current.feelslike_c + " ℃"
            humidity.innerText = data.current.humidity + " %"
            wind.innerText = data.current.wind_kph + " km/h"
        })
        .catch((error) => {
            console.error(error);
            alert("City not found. Please try again.");
        });

    fetch(`https://api.weatherapi.com/v1/history.json?q=ahmedabad&dt=${yestDate}&key=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            avgtemp_c.innerText = data.forecast.forecastday[0].day.avgtemp_c + " ℃";
            avgtemp_f.innerText = data.forecast.forecastday[0].day.avgtemp_f + " ℉";
            avghumidity.innerText = data.forecast.forecastday[0].day.avghumidity + " %";
            maxwind.innerText = data.forecast.forecastday[0].day.maxwind_kph + " km/h";

        })
        .catch((error) => {
            console.error(error);
            // alert("City not found");
        });



    fetch(`https://api.weatherapi.com/v1/forecast.json?q=ahmedabad&dt=${tomDate}&key=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            tom_avgtemp_c.innerText = data.forecast.forecastday[0].day.avgtemp_c + " ℃";
            tom_avgtemp_f.innerText = data.forecast.forecastday[0].day.avgtemp_f + " ℉";
            tom_avghumidity.innerText = data.forecast.forecastday[0].day.avghumidity + " %";
            tom_maxwind_kph.innerText = data.forecast.forecastday[0].day.maxwind_kph + " km/h";

        })
        .catch((error) => {
            console.error(error);
            // alert("City not found yet");
        });

    cityName.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            getTemp();
        }
    })


    function getTemp() {
        const city = cityName.value;
        if (city == '') {
            alert('Enter city name');
            return;
        }
        loader.style.display = 'block'

        fetch(`https://api.weatherapi.com/v1/current.json?q=${city}&key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {

                cityNam.innerHTML = 'Weather of ' + `<strong>${data.location.name}</strong>`
                temprature.innerText = data.current.temp_c + " ℃";
                temprature_f.innerText = data.current.temp_f + " ℉"
                feelslike_c.innerText = data.current.feelslike_c + " ℃"
                humidity.innerText = data.current.humidity + " %"
                wind.innerText = data.current.wind_kph + " km/h"
                loader.style.display = 'none'
            })
            .catch((error) => {
                console.error(error);
                alert("City not found. Please try again.");
                loader.style.display = 'none'
            });

        fetch(`https://api.weatherapi.com/v1/history.json?q=${city}&dt=${yestDate}&key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                avgtemp_c.innerText = data.forecast.forecastday[0].day.avgtemp_c + " ℃";
                avgtemp_f.innerText = data.forecast.forecastday[0].day.avgtemp_f + " ℉";
                avghumidity.innerText = data.forecast.forecastday[0].day.avghumidity + " %";
                maxwind.innerText = data.forecast.forecastday[0].day.maxwind_kph + " km/h";
                loader.style.display = 'none'

            })
            .catch((error) => {
                console.error(error);
                // alert("City not found");
            });


        fetch(`https://api.weatherapi.com/v1/forecast.json?q=${city}&dt=${tomDate}&key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                tom_avgtemp_c.innerText = data.forecast.forecastday[0].day.avgtemp_c + " ℃";
                tom_avgtemp_f.innerText = data.forecast.forecastday[0].day.avgtemp_f + " ℉";
                tom_avghumidity.innerText = data.forecast.forecastday[0].day.avghumidity + " %";
                tom_maxwind_kph.innerText = data.forecast.forecastday[0].day.maxwind_kph + " km/h";
                loader.style.display = 'none'
            })
            .catch((error) => {
                console.error(error);
                // alert("City not found yet");
            });
    }

})

searchButton.addEventListener('click', getTemp)


// 21.469537,70.371879