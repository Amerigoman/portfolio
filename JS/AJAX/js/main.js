(function() {

function initForm() {
	var form = document.querySelector('#select-city');
	var cityInput = form.querySelector('#city');
	cityInput.value = 'Kharkiv';

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		flush();
		var value = cityInput.value;
		if (value) {
			sendAjax(value);
		}

	});
}
initForm();



function sendAjax(cityName) {

	var protocol = "http://",
			mainUrl = "api.openweathermap.org/data/2.5/",
			action = "weather",
			appId="71d986044b7c37761c0dbbe4f6ec0a50";
	cityName = cityName || 'Kharkiv';

	var url = protocol + mainUrl + action + '?q=' + cityName + '&APPID=' + appId;

	var xhr = new XMLHttpRequest();

	xhr.open('GET', url, true);

	xhr.send();

	xhr.onload = function() {
		var data = JSON.parse(xhr.responseText);
		render(data);
	};
}


function render(data) {
		var temp = document.querySelector('#temp');
		var clouds = document.querySelector('#clouds');
		var hum = document.querySelector('#hum');
		var cityName = document.querySelector('#city-name');
		var dt = document.querySelector('#dt');

		var KELVIN = 273.15;

		temp.textContent = Math.floor(data.main.temp - KELVIN);
		clouds.textContent = data.clouds.all;
		hum.textContent = data.main.humidity;
		cityName.textContent = data.name + ", " + data.sys.country;
		var date = new Date(data.dt * 1000);
		var h = ("0" + date.getHours()).slice(-2);
		var m = ("0" + date.getMinutes()).slice(-2);
		var s = ("0" + date.getSeconds()).slice(-2);
		dt.textContent = h + ':' + m + ':' + s;
}
function flush() {
		var temp = document.querySelector('#temp');
		var clouds = document.querySelector('#clouds');
		var hum = document.querySelector('#hum');
		var cityName = document.querySelector('#city-name');
		var dt = document.querySelector('#dt');

		temp.textContent = "";
		clouds.textContent = "";
		hum.textContent = "";
		cityName.textContent = "";
		dt.textContent = "";
}









})();