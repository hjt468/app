Page({
  data: {
    timeLeft: 60,
    score: 0,
    currentWord: '',
    words: [
      '苹果', '香蕉', '橙子', '西瓜', '葡萄',
      '大象', '老虎', '狮子', '熊猫', '长颈鹿',
      '足球', '篮球', '排球', '网球', '乒乓球',
      '电脑', '手机', '电视', '冰箱', '洗衣机'
    ]
  },

  onLoad() {
    this.startGame()
  },

  startGame() {
    this.setData({
      timeLeft: 60,
      score: 0
    })
    this.nextWord()
    this.startTimer()
  },

  startTimer() {
    this.timer = setInterval(() => {
      if (this.data.timeLeft <= 0) {
        this.endGame()
        return
      }
      this.setData({
        timeLeft: this.data.timeLeft - 1
      })
    }, 1000)
  },

  nextWord() {
    const randomIndex = Math.floor(Math.random() * this.data.words.length)
    this.setData({
      currentWord: this.data.words[randomIndex]
    })
  },

  handleCorrect() {
    this.setData({
      score: this.data.score + 1
    })
    this.nextWord()
  },

  handleSkip() {
    this.nextWord()
  },

  endGame() {
    clearInterval(this.timer)
    // 更新最高分
    const highScore = wx.getStorageSync('highScore') || 0
    if (this.data.score > highScore) {
      wx.setStorageSync('highScore', this.data.score)
    }
    // 跳转到结果页
    wx.redirectTo({
      url: `/pages/result/result?score=${this.data.score}`
    })
  },

  onUnload() {
    clearInterval(this.timer)
  }
}) 