Page({
  data: {
    score: 0,
    highScore: 0
  },

  onLoad(options) {
    const score = parseInt(options.score) || 0
    const highScore = wx.getStorageSync('highScore') || 0
    this.setData({ score, highScore })
  },

  playAgain() {
    wx.redirectTo({
      url: '/pages/game/game'
    })
  },

  backToHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
}) 