function getWeather() {
    var cityInput = document.getElementById("city-input");
    var city = cityInput.value;

    // API'ye istek göndermek için Fetch API kullanacağız
    var apiKey = "47b8c411cbaefbb5c821ccfce0e210fa"; // OpenWeatherMap API anahtarını buraya ekleyin

    // Şehir adını kullanarak hava durumu verilerini almak için API'ye GET isteği gönderiyoruz
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.log("Hava durumu bilgisi alınamadı.", error);
        });
}

function displayWeather(weatherData) {
    var weatherResults = document.getElementById("weather-results");

    if (weatherData.cod !== 200) {
        weatherResults.innerHTML = "Hava durumu bilgisi bulunamadı.";
        return;
    }

    var temperature = Math.round(weatherData.main.temp - 273.15); // Kelvin'i Celsius'a dönüştürme
    var description = weatherData.weather[0].description;
    var humidity = weatherData.main.humidity;

    weatherResults.innerHTML = "Sıcaklık: " + temperature + "°C<br>" +
                               "Durum: " + description + "<br>" +
                               "Nem: " + humidity + "%";
}
