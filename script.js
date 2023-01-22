const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city')
const warning = document.querySelector('.warning')
const icon = document.querySelector('.icon')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const realFeel = document.querySelector('.realfeel')
const day = document.querySelector('.day')
const date = document.querySelector('.date')
const DAY = document.querySelectorAll('.DAY')
const TEMP = document.querySelectorAll('.TEMP')
const ICON = document.querySelectorAll('.ICON')
let curentday
const API_LINK = 'https://api.openweathermap.org/data/2.5/forecast?q='
const API_KEY = '&appid=5900893ec7ee6f20a04f870c985298ae'
const API_UNITS = '&units=metric'
//Card with current weather
const getWeather = () => {
	const place = input.value || 'Krasnystaw'
	const URL = API_LINK + place + API_KEY + API_UNITS

	axios
		.get(URL)
		.then(res => {
			temperature.textContent = Math.floor(res.data.list[0].main.temp) + '°C'
			humidity.textContent = res.data.list[0].main.humidity + '%'
			realFeel.textContent = Math.floor(res.data.list[0].main.feels_like) + '°C'
			weather.textContent = res.data.list[0].weather[0].main
			cityName.textContent = res.data.city.name
			icon.innerHTML = weatherIcon(res.data.list[0].weather[0].id)
			icon.setAttribute('class', 'fa-7x my-2')
			const time = res.data.list[0].dt_txt
			getDay(time)
			//API returns weather with a 3-hour step so must find next day at 12am
			const Day12 = res.data.list.filter(el => el.dt_txt.slice(11, 19) == '12:00:00')
			if (Day12[0].dt_txt.slice(8, 10) == curentday) {
				const upload = Day12.splice(0, 1)
				for (let i = 0; i < 4; i++) {
					getWeatherNextDay(Day12, i)
				}
			} else {
				for (let i = 0; i < 4; i++) {
					getWeatherNextDay(Day12, i)
				}
			}
		})
		.catch(() => (warning.textContent = 'Enter a valid city name'))
}
//Create next 4 cards
const getWeatherNextDay = (data, num) => {
	TEMP[num].textContent = Math.floor(data[num].main.temp) + '°C'
	console.log(data)
	DAY[num].textContent = stringDay(curentday + num + 1)
	ICON[num].innerHTML = weatherIcon(data[num].weather[0].id)
	ICON[num].setAttribute('class', 'fa-4x')
	console.log(ICON)
}
// change Date time
const getDay = dateString => {
	var monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	const d = new Date()
	curentday = d.getDay()
	stringDay(curentday)
	const month = monthShort[d.getMonth()]
	day.textContent = dayName
	date.textContent = month + ' ' + dateString.slice(8, 16)
}
//change day number to string
const stringDay = day => {
	if (day > 6) day = day - 7
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	return (dayName = days[day])
}
// change to ID weather to ICON
const weatherIcon = id => {
	if (id >= 200 && id < 300) {
		return '<i class="bi bi-cloud-lightning-rain-fill "></i>"></i>'
	} else if (id >= 300 && id < 400) {
		return '<i class="bi bi-cloud-drizzle-fill "></i>'
	} else if (id >= 500 && id < 600) {
		return '<i class="bi bi-cloud-rain-heavy-fill "></i>'
	} else if (id >= 600 && id < 700) {
		return '<i class="bi bi-cloud-snow-fill "></i>'
	} else if (id >= 700 && id < 800) {
		return '<i class="bi bi-cloud-haze2-fill "></i>'
	} else if (id === 800) {
		return '<i class="bi bi-sun-fill "></i>'
	} else if (id >= 800) {
		return '<i class="bi bi-cloud-fill "></i>'
	}
}

const enterCheck = e => {
	if (e.key === 'Enter') {
		getWeather()
	}
}
window.addEventListener('load', getWeather)
button.addEventListener('click', getWeather)
input.addEventListener('keyup', enterCheck)
