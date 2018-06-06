const weekdaysMap = {
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  7: '星期日',
}

Page({
  data: {
    futureWeather: [],
  },
  onPullDownRefresh() {
    this.getNow(() => {
      wx.stopPullDownRefresh()
    })
  },
  onLoad() {
    this.getNow()
  },
  getNow(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/future',
      data: {
        city: '广州市',
        time: new Date()
      },
      success: res => {
        let result = res.data.result
        //console.log(result)
        this.setForecast(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setForecast(result) {
    let futureWeather = []
    let date = new Date()
    for (let i = 0; i < 7; i += 1) {
      futureWeather.push({
        weekdays: weekdaysMap[new Date().getDay+i],
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        tempRange: result[i].minTemp + '°' + '-' + result[i].maxTemp + '°',
        iconPath: '/images/' + result[i].weather + '-icon.png',
      })
    }
    //futureWeather[0].date = '今天'; CSS Issues of the first row unsolved
    this.setData({
      futureWeather: futureWeather
    })
  }
})