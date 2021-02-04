const 
  apiKey = 'c6d3274323a8201fd1939ef229fc0078',
  exclude = 'current,hourly,daily,alerts',
  list = document.querySelector('ul'),
  form = document.querySelector('form')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const 
    inputs = e.target.querySelectorAll('input'),
    lat = inputs[0].value,
    lon = inputs[1].value

  fetchWeatherData(lat, lon)
})

const fetchWeatherData = (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${apiKey}`

  fetch(url)
    .then(
      (res) => {
        res.json().then((data) => {
          displayAllMinuteData(data.minutely)
        })
      }
    )
    .catch((err) => {
      console.log(`Error: ${err}`)
    })
}

const displayAllMinuteData = (data) => {
  const t = new Date()

  data.forEach((data, index) => {
    const 
      minute = t.getMinutes() + index >= 60 ? t.getMinutes()+index - 60 : t.getMinutes() + index,
      formattedMinute = minute < 10 ? `0${minute}` : minute,
      hour = t.getMinutes() + index >= 60 ? t.getHours() + 1 : t.getHours()

    const li = document.createElement('li')
    li.innerHTML = `${hour}:${formattedMinute}: ${data.precipitation}mm`
    list.appendChild(li)
  }) 
}