Page({
  data: {
    timeLeft: 60,
    score: 0,
    currentWord: '',
    isReady: false,
    words: [
      '苹果', '香蕉', '橙子', '西瓜', '葡萄',
      '大象', '老虎', '狮子', '熊猫', '长颈鹿',
      '足球', '篮球', '排球', '网球', '乒乓球',
      '电脑', '手机', '电视', '冰箱', '洗衣机'
    ]
  },

  onLoad(options) {
    console.log('游戏页面加载，参数：', options)
    try {
      // 检查渲染器是否支持
      const systemInfo = wx.getSystemInfoSync()
      console.log('系统信息：', systemInfo)
      
      // 初始化游戏状态
      this.setData({ 
        isReady: true,
        timeLeft: 60,
        score: 0,
        currentWord: ''
      }, () => {
        console.log('游戏状态初始化成功')
        // 确保数据更新后再开始游戏
        wx.nextTick(() => {
          this.startGame()
        })
      })
    } catch (error) {
      console.error('游戏页面初始化失败:', error)
      wx.showToast({
        title: '游戏加载失败',
        icon: 'none',
        duration: 2000
      })
    }
  },

  onShow() {
    console.log('游戏页面显示')
    // 如果页面已经准备好，重新开始游戏
    if (this.data.isReady) {
      console.log('页面已准备好，重新开始游戏')
      this.startGame()
    } else {
      console.log('页面未准备好，等待初始化')
    }
  },

  startGame() {
    console.log('开始游戏')
    if (!this.data.isReady) {
      console.error('页面未准备好')
      wx.showToast({
        title: '游戏未准备好',
        icon: 'none',
        duration: 2000
      })
      return
    }

    // 清除可能存在的旧计时器
    if (this.timer) {
      console.log('清除旧计时器')
      clearInterval(this.timer)
      this.timer = null
    }

    try {
      console.log('重置游戏状态')
      this.setData({
        timeLeft: 60,
        score: 0,
        currentWord: ''
      }, () => {
        console.log('游戏状态重置成功')
        // 确保数据更新后再进行下一步
        wx.nextTick(() => {
          this.nextWord()
          this.startTimer()
        })
      })
    } catch (error) {
      console.error('开始游戏失败:', error)
      wx.showToast({
        title: '游戏启动失败',
        icon: 'none',
        duration: 2000
      })
    }
  },

  startTimer() {
    console.log('启动计时器')
    if (this.timer) {
      console.log('清除已存在的计时器')
      clearInterval(this.timer)
    }

    try {
      this.timer = setInterval(() => {
        console.log('计时器触发，剩余时间：', this.data.timeLeft)
        if (this.data.timeLeft <= 0) {
          console.log('时间到，结束游戏')
          this.endGame()
          return
        }
        this.setData({
          timeLeft: this.data.timeLeft - 1
        })
      }, 1000)
      console.log('计时器启动成功')
    } catch (error) {
      console.error('启动计时器失败:', error)
      wx.showToast({
        title: '计时器启动失败',
        icon: 'none',
        duration: 2000
      })
    }
  },

  nextWord() {
    console.log('获取下一个词')
    try {
      const randomIndex = Math.floor(Math.random() * this.data.words.length)
      const nextWord = this.data.words[randomIndex]
      console.log('下一个词：', nextWord)
      this.setData({
        currentWord: nextWord
      }, () => {
        console.log('词语更新成功')
      })
    } catch (error) {
      console.error('获取下一个词失败:', error)
      wx.showToast({
        title: '获取词语失败',
        icon: 'none',
        duration: 2000
      })
    }
  },

  handleCorrect() {
    console.log('猜对了')
    try {
      this.setData({
        score: this.data.score + 1
      }, () => {
        console.log('分数更新成功')
        this.nextWord()
      })
    } catch (error) {
      console.error('处理猜对失败:', error)
    }
  },

  handleSkip() {
    console.log('跳过')
    try {
      this.nextWord()
    } catch (error) {
      console.error('处理跳过失败:', error)
    }
  },

  endGame() {
    console.log('游戏结束')
    if (this.timer) {
      console.log('清除计时器')
      clearInterval(this.timer)
      this.timer = null
    }

    try {
      console.log('保存最高分')
      const highScore = wx.getStorageSync('highScore') || 0
      if (this.data.score > highScore) {
        wx.setStorageSync('highScore', this.data.score)
      }
      console.log('跳转到结果页')
      wx.redirectTo({
        url: `/pages/result/result?score=${this.data.score}`,
        success: () => {
          console.log('跳转结果页成功')
        },
        fail: (error) => {
          console.error('跳转结果页失败:', error)
          wx.showToast({
            title: '跳转失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    } catch (error) {
      console.error('结束游戏失败:', error)
      wx.showToast({
        title: '游戏结束失败',
        icon: 'none',
        duration: 2000
      })
    }
  },

  onHide() {
    console.log('游戏页面隐藏')
    if (this.timer) {
      console.log('清除计时器')
      clearInterval(this.timer)
      this.timer = null
    }
  },

  onUnload() {
    console.log('游戏页面卸载')
    if (this.timer) {
      console.log('清除计时器')
      clearInterval(this.timer)
      this.timer = null
    }
  },

  exitGame() {
    console.log('退出游戏')
    wx.showModal({
      title: '确认退出',
      content: '确定要退出游戏吗？当前进度将不会保存。',
      success: (res) => {
        if (res.confirm) {
          console.log('用户确认退出')
          if (this.timer) {
            console.log('清除计时器')
            clearInterval(this.timer)
            this.timer = null
          }
          wx.navigateBack({
            success: () => {
              console.log('退出游戏成功')
            },
            fail: (error) => {
              console.error('退出游戏失败:', error)
              wx.showToast({
                title: '退出失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      }
    })
  }
}) 