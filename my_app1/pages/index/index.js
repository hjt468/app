// index.js
Page({
  data: {
    highScore: 0
  },

  onLoad() {
    try {
      // 从本地存储获取最高分
      const highScore = wx.getStorageSync('highScore') || 0
      this.setData({ highScore })
    } catch (error) {
      console.error('获取最高分失败:', error)
    }
  },

  startGame() {
    console.log('开始游戏按钮被点击')
    try {
      wx.navigateTo({
        url: '/pages/game/game',
        success: () => {
          console.log('跳转到游戏页面成功')
        },
        fail: (error) => {
          console.error('跳转到游戏页面失败:', error)
          wx.showToast({
            title: '启动游戏失败，请重试',
            icon: 'none'
          })
        }
      })
    } catch (error) {
      console.error('启动游戏时发生错误:', error)
      wx.showToast({
        title: '启动游戏失败，请重试',
        icon: 'none'
      })
    }
  },

  showRules() {
    try {
      wx.navigateTo({
        url: '/pages/rules/rules',
        fail: (error) => {
          console.error('跳转到规则页面失败:', error)
          wx.showToast({
            title: '打开规则失败，请重试',
            icon: 'none'
          })
        }
      })
    } catch (error) {
      console.error('显示规则时发生错误:', error)
      wx.showToast({
        title: '打开规则失败，请重试',
        icon: 'none'
      })
    }
  }
})
