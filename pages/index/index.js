// pages/index/index.js
const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data:{
    nowTemp: '',
    nowWeather: '',
    hourlyWeather: [],
    dateToday: '',
    minTemp: 2,
    maxTemp: 5,
  },
  onPullDownRefresh(){
    this.getNow(()=>{
      wx.stopPullDownRefresh()
    })
  },
  onLoad(){
    this.getNow()
  },
  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '广州市'
      },
      success: res => {
        let result = res.data.result
        //console.log(result)
        this.setNow(result)
        this.setForecast(result)
        this.setToday(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setNow(result){
    let temp = result.now.temp
    let weather = result.now.weather
    this.setData({
      nowTemp: temp + '°',
      nowWeather: weatherMap[weather],
      imageSrc: '/images/' + weather + '-bg.png',
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[weather]
    })
  },
  setForecast(result){
    let forecast = result.forecast
    let nowHour = new Date().getHours()
    let hourlyWeather = []
    for (let i = 0; i < 8; i += 1) {
      hourlyWeather.push({
        time: (i * 3 + nowHour) % 24 + '时',
        iconPath: '/images/' + forecast[i].weather + '-icon.png',
        temp: forecast[i].temp + '°'
      })
    }
    hourlyWeather[0].time = '现在'
    this.setData({
      hourlyWeather: hourlyWeather
    })
  },
  setToday(result){
    let date = new Date()
    let today = result.today
    let minTemp = today.minTemp
    let maxTemp = today.maxTemp
    this.setData({
      dateToday: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 今天`,
      minTemp: minTemp + '°' + '到',
      maxTemp: maxTemp + '°',
    })
  },
  onTapExpand(){
    wx.showToast({
      title: '我爱你',
    })
  }
})