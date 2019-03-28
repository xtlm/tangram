
class Category {
  constructor(ctx, points, color, W, H) {
    this.ctx = ctx;

    // 初始化事件监听
    this.initEvent();

    this.points = points;
    this.W = W;
    this.H = H;
    this.color = color;
  }


  // 画图
  render(rate = 1, seqx = 0, seqy = 0) {
    for (var i = 0; i < this.points[0].p.length; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(seqx * this.W + this.points[0].p[i][0].x * rate, seqy * this.H + this.points[0].p[i][0].y * rate);
      for (var j = 0; j < this.points[0].p[i].length; j++) {
        this.ctx.lineTo(seqx * this.W + this.points[0].p[i][j].x * rate, seqy * this.H + this.points[0].p[i][j].y * rate);
      }
      this.ctx.lineTo(seqx * this.W + this.points[0].p[i][0].x * rate, seqy * this.H + this.points[0].p[i][0].y * rate);
      this.ctx.fillStyle = this.color;

      this.ctx.fill();
      this.ctx.closePath();
    }



  }
  /**
   * 玩家响应手指的触摸事件
   * 改变位置
   */
  initEvent() {
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault();
      let x = e.touches[0].clientX * this.W / window.innerWidth;
      let y = e.touches[0].clientY * this.H / window.innerHeight;


    }).bind(this))


    canvas.addEventListener('touchend', ((e) => {


    }).bind(this))
  }
  // eraseOverlap() {
  //   let a = this.ctx.getImageData(0, 0, this.W, this.H);

  // }


}
