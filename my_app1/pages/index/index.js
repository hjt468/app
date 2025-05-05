// index.js
Page({
  data: {
    highScore: 0
  },

  onLoad() {
    // 从本地存储获取最高分
    const highScore = wx.getStorageSync('highScore') || 0
    this.setData({ highScore })
  },

  startGame() {
    wx.navigateTo({
      url: '/pages/game/game'
    })
  },

  showRules() {
    wx.navigateTo({
      url: '/pages/rules/rules'
    })
  }
})
