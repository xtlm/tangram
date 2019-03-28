
class Triangle {
  constructor(ctx, seq, w, h, rightAngleX, rightAngleY, color = "#009900", W, H, answer) {
    this.ctx = ctx;

    // 初始化事件监听
    // this.initEvent();
    this.rotateXDeviation = 0;
    this.rotateYDeviation = 0;
    // this.ctx.translate(this.rotateXDeviation, this.rotateYDeviation);

    // 画图
    // this.render();
    this.W = W;
    this.H = H;
    this.w = w;
    this.h = h;
    this.color = color;
    this.rightAngleX = rightAngleX;
    this.rightAngleY = rightAngleY;
    this.rotateX = this.rightAngleX + this.w;
    this.rotateY = this.rightAngleY;
    this.rotateRadius = W / 15;
    this.touchedUnit = false;
    this.touchMove = false;
    this.touchedRotate = false;
    this.seq = seq;
    this.answer = answer;
    this.all = [];
    this.threshold = W/40;
    // 对应三角形两种摆法
    this.answer1 = false;
    this.answer2 = false;
    this.complete = false;
    this.getAllPoints();
  }

  getAllPoints() {
    const a = this.answer;
    let points = [];
    let k = 0;
    for(let i = 0,il = a.p.length;i < il; i++) {
      for (let j = 0, jl = a.p[i].length; j < jl; j++) {
        points[k] = a.p[i][j];
        k++;
      }
    }

    let length = points.length
    let q = 0;
    for (let m = 0; m < length; m++) {
      for (let n = 0; n < length; n++) {
        if(n != m) {
          for (let p = 0; p < length; p++) {
            if(p != m && p != n) {
              this.all[q] = [points[m],points[n],points[p]]; 
              q++;
            }
          }
        }
      }           
    }
  }

  // 画图
  render() {
    this.tangram = [
      { p: [{ x: this.rightAngleX, y: this.rightAngleY }, 
            { x: this.rotateX, y: this.rotateY },
            { x: this.rightAngleX - (this.rotateY - this.rightAngleY), y: this.rotateX + (this.rightAngleY - this.rightAngleX) }            ],          
        color: this.color
        },
    ]

    this.ctx.beginPath();
    this.ctx.moveTo(this.tangram[0].p[0].x, this.tangram[0].p[0].y);
    for (var j = 1; j < this.tangram[0].p.length; j++) {
      this.ctx.lineTo(this.tangram[0].p[j].x, this.tangram[0].p[j].y);
    }
    this.ctx.closePath();

    this.ctx.fillStyle = this.tangram[0].color;
    this.ctx.strokeStyle = this.tangram[0].color;
    this.ctx.fill();
    this.ctx.stroke();
    if((this.touchedUnit || this.touchedRotate) && !this.touchMove) {
      this.ctx.fillStyle = "#CC8800";
      this.ctx.strokeStyle = "#CC8800";
      this.ctx.beginPath();
      this.ctx.arc(this.rotateX, this.rotateY, this.rotateRadius, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    }

  }

  setAllUnit(allUnitSeq) {
    this.allUnitSeq = allUnitSeq;
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变位置
   */
  touchStartEvent(x, y) {
    this.touchMove = false;
    this.answer1 = false;
    this.answer2 = false;
    this.answer3 = false;
    this.answer4 = false;
    this.complete = false;
    if (this.checkFingerOnRotate(x, y)) {
      this.touchedRotate = true;
      this.touchedUnit = false;
      this.sx = this.rotateX;
      this.sy = this.rotateY;
    }else if (this.checkFingerOnUnit(x, y)) {
      this.touchStartX = x;
      this.touchStartY = y;
      this.rightAngleXToX = this.rightAngleX - this.rotateX;
      this.rightAngleYToY = this.rightAngleY - this.rotateY;
      this.xTorightAngle = x - this.rightAngleX;
      this.yTorightAngle = y - this.rightAngleY;
      this.touchedUnit = true;
      this.touchedRotate = false;
    } else {
      this.touchedUnit = false;
      this.touchedRotate = false;
    }    

  }

  touchMoveEvent(x, y) {  

    if (this.touchedRotate) {
      this.touchMove = false;
      this.touchedUnit = false;
      this.exchangeUnitToTop();  
      this.rotateX = this.getRotateX(x);
      // this.rotateX = x;
      this.rightAngleXToX = this.rightAngleX - this.rotateX;
      
      if (y > this.rightAngleY) {
        this.rotateY = this.rightAngleY + Math.sqrt(Math.abs(this.w * this.w - (this.rotateX - this.rightAngleX) * (this.rotateX - this.rightAngleX)));
      } else {
        this.rotateY = this.rightAngleY - Math.sqrt(Math.abs(this.w * this.w - (this.rotateX - this.rightAngleX) * (this.rotateX - this.rightAngleX)));
      }
      this.rightAngleYToY = this.rightAngleY - this.rotateY;
    } else if (this.touchedUnit) {
      // 降低灵敏度
      if(Math.abs(x - this.touchStartX) > 1 || Math.abs(y - this.touchStartY) > 1) {
        this.touchedRotate = false;
        this.touchMove = true;
        this.exchangeUnitToTop();  
      }
      this.rightAngleX = x - this.xTorightAngle;
      this.rightAngleY = y - this.yTorightAngle;
      this.rotateX = this.rightAngleX - this.rightAngleXToX;
      this.rotateY = this.rightAngleY - this.rightAngleYToY;

    }  
    this.rightAngleX = Math.round(this.rightAngleX);
    this.rightAngleY = Math.round(this.rightAngleY);
    this.rotateX = Math.round(this.rotateX);
    this.rotateY = Math.round(this.rotateY);      

  }

  touchEndEvent() {
    let find = this.checkInAnswer(this.tangram[0].p,this.all);
    if (find) {
      this.rightAngleX = find[0].x;
      this.rightAngleY = find[0].y;
      this.rotateX = find[1].x;
      this.rotateY = find[1].y;

      this.complete = true;
    }
    this.touchedUnit = false;
    // this.touchedRotate = false;

  }

  getRotateX(x) {
    let fixed = [-1, -Math.cos(Math.PI / 4), 0, Math.cos(Math.PI / 4), 1];
    // let rx = 0;
    let rx = (x - this.rightAngleX)/this.w;
    let il = fixed.length;

    if (rx >= fixed[il - 1]) {
      rx = fixed[il - 1];
    } else if (rx <= fixed[0]) {
      rx = fixed[0];
    } else {
      for (let i = 0; i < il-1; i++) {
        if (rx > fixed[i] && rx <= fixed[i+1]) {
          rx = fixed[i];
          break;
        }
      }
    }

    return rx * this.w + this.rightAngleX;
    // let rx;
    // if (x > this.rightAngleX+ this.w) {
    //   rx = this.rightAngleX + this.w;
    // } else if (x < this.rightAngleX - this.w) {
    //   rx = this.rightAngleX - this.w;
    // } else {
    //   rx = x;
    // }
    // return rx;
  }

  checkInAnswer(p,all) {

    let r = all.length;
    for (let s = 0; s < r; s++) {
      if (Math.abs(all[s][0].x - p[0].x) < this.threshold && Math.abs(all[s][0].y - p[0].y) < this.threshold
        && Math.abs(all[s][1].x - p[1].x) < this.threshold && Math.abs(all[s][1].y - p[1].y) < this.threshold
        && Math.abs(all[s][2].x - p[2].x) < this.threshold && Math.abs(all[s][2].y - p[2].y) < this.threshold 
        ) 
      {
        return all[s];
        break
      }
    }
    return false;
  }

  consoleLog() {
    // this.tangram[0].p.forEach((item) => {
    //   console.log(item);
    // })
    console.log(this.tangram[0].p);
  }

  // 把本单元提到序列号第一位
  exchangeUnitToTop() {
    let index = this.allUnitSeq.findIndex((n) => n == this.seq);
    this.allUnitSeq.splice(index,1);
    this.allUnitSeq.push(this.seq);
  }
  /**
   * 当手指触摸屏幕的时候
   * 判断手指是否在单元块上
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   * @return {Boolean}: 用于标识手指是否在单元块上的布尔值
   */
  checkFingerOnRotate(x, y) {
    return Math.pow((x - this.rotateX), 2) + Math.pow((y - this.rotateY), 2) <= Math.pow(this.rotateRadius,2)      
  }

  checkFingerOnUnit(x, y) {
    if (this.checkFingerOnRotate(x, y)){
      return false;
    } else {
      return this.isInTriangle(this.tangram[0].p[0], this.tangram[0].p[1], this.tangram[0].p[2],{x:x,y:y});
    }
  }

  
  // 获取三角形面积
  getTriangleArea(p0, p1, p2) {
    let ab, bc;
    ab = {x:p1.x - p0.x, y:p1.y - p0.y};
    bc = {x:p2.x - p1.x, y:p2.y - p1.y};
    return Math.abs((ab.x * bc.y - ab.y * bc.x) / 2.0);
  }
  // 是否在三角形内
  isInTriangle(a, b, c, d) {
    let sabc, sadb, sbdc, sadc;
    sabc = this.getTriangleArea(a, b, c);
    sadb = this.getTriangleArea(a, d, b);
    sbdc = this.getTriangleArea(b, d, c);
    sadc = this.getTriangleArea(a, d, c);

    let sumSuqar = sadb + sbdc + sadc;

    if (-0.0001 < (sabc - sumSuqar) && (sabc - sumSuqar) < 0.0001) {
      return true;
    } else {
      return false;
    }
  }

}