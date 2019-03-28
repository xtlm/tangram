const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let atlas = new Image()
atlas.src = 'images/select.png'

class Home {
  renderGameScore(ctx, score) {
    ctx.fillStyle = "#ffffff"
    ctx.font = "60px Arial"

    ctx.fillText(
      score,
      10,
      30
    )
  }

  renderGameOver(ctx, score) {
    ctx.drawImage(atlas, 0, 0, 1080, 1920, 0, 0, 1080, 1920)

    ctx.fillStyle = "#ffffff"
    ctx.font = "60px Arial"

    // ctx.fillText(
    //   '游戏结束',
    //   screenWidth / 4,
    //   screenHeight / 4
    // )

    // ctx.fillText(
    //   '得分: ' + score,
    //   screenWidth / 4,
    //   screenHeight * 2 /4
    // )


    // ctx.fillText(
    //   '重新开始',
    //   screenWidth / 4,
    //   screenHeight *3 / 4
    // )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btn0 = {
      startX: 50,
      startY: 288,
      endX: 1028,
      endY: 470
    }

    this.btn1 = {
      startX: 50,
      startY: 582,
      endX: 1028,
      endY: 762
    }
  }
}

