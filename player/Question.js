
class Question {
  constructor(ctx,points, color, W, H) {
    this.ctx = ctx;

    //初始化事件监听
    // this.initEvent();

    this.points = points;
    this.W = W;
    this.H = H;
    this.color = color;
  }


  // 画图
  render(rate = 1) {
    for (var i = 0; i < this.points.p.length; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.points.p[i][0].x * rate, this.points.p[i][0].y * rate);
      for (var j = 0; j < this.points.p[i].length; j++) {
        this.ctx.lineTo(this.points.p[i][j].x * rate, this.points.p[i][j].y * rate);
      }
      this.ctx.lineTo(this.points.p[i][0].x * rate, this.points.p[i][0].y * rate);
      // this.ctx.strokeStyle = "#FFFFFF";
      // this.ctx.lineWidth = "2";
      this.ctx.fillStyle = this.color;
      // this.ctx.stroke();
      this.ctx.fill();
      this.ctx.closePath();
      // this.eraseOverlap()
    }



  }

  // eraseOverlap() {
  //   let a = this.ctx.getImageData(0, 0, this.W, this.H);

  // }


}
