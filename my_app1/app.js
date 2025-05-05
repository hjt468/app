// app.js
App({
  globalData: {
    userInfo: null,
    highScore: 0
  },

  onLaunch() {
    // 获取本地存储的最高分
    try {
      const highScore = wx.getStorageSync('highScore') || 0
      this.globalData.highScore = highScore
    } catch (error) {
      console.error('获取最高分失败:', error)
    }

    // 检查更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
        }
      })
    }
  },

  onError(error) {
    // 监控全局错误
    console.error('应用发生错误:', error)
    // 可以在这里添加错误上报逻辑
  }
})
