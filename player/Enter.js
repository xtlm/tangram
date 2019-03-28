
let canvas  = document.getElementById("drawing");
let ctx  = canvas.getContext("2d");


/**
 * 入口
 */
class Enter {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId    = 0;
    // canvas.width = 1080;   
    // canvas.height = 1920;
    this.W = 360;
    this.H = 640;
    this.SW = 200*this.W/1080;
    this.MW = Math.sqrt(Math.pow(this.SW * 2, 2) / 2);
    this.LW = this.SW * 2;
    this.PW = Math.sqrt(this.SW * this.SW * 2);
    this.PH = Math.sqrt(this.SW * this.SW / 2);
    this.unit = [];
    // wx.setPreferredFramesPerSecond(10);
    // 动态保存点击的优先级，作为重叠点击的依据
    this.allSeq;
    this.restart();
    // 安装菜单栏事件
    // this.touchHandler = this.touchEventHandler.bind(this);
    // canvas.addEventListener('touchstart', this.touchHandler);
    this.selectCategory = false;
    this.selectItem = false;
    this.category = [];
    this.setTouchEvent();
    
  }

  restart(aTemplet = 0) {
    this.gameOver = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.bindLoop = this.loop.bind(this);
    // this.menu = new Menu("images/menu.jpg", 1080, 160, 1080, 1920, 1 / 12); 
    // this.Home = new Home();
    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);
    this.templet = new Templet();
    this.tangram = this.templet.getOneTemplet(aTemplet);

    this.question = new Question(ctx, this.tangram, "#333333",canvas.width, canvas.height);

    this.unit[0] = new Triangle(ctx, 0, this.SW, this.SW, this.W / 30, this.H / 30, "#009900", this.W, this.H, this.tangram);
    this.unit[1] = new Triangle(ctx, 1, this.SW, this.SW, this.W / 30, this.H / 10, "#808000", this.W, this.H, this.tangram);
    this.unit[2] = new Triangle(ctx, 2, this.MW, this.MW, this.W - 0.8 * this.MW, this.H / 30, "#990000", this.W, this.H, this.tangram);
    this.unit[3] = new Triangle(ctx, 3, this.LW, this.LW, -this.W / 30, this.H / 5, "#009999", this.W, this.H, this.tangram);
    this.unit[4] = new Triangle(ctx, 4, this.LW, this.LW, -this.W / 30, this.H / 3, "#DDC700", this.W, this.H, this.tangram);
    this.unit[5] = new Square(ctx, 5, this.SW, this.SW, this.W - this.SW, this.H / 2, "#995500", this.W, this.H, this.tangram);
    this.unit[6] = new Parallelogram(ctx, 6, this.PW, this.PH, this.W - this.SW, this.H / 1.5, "#CCCC99", this.W, this.H, this.tangram);
    this.allSeq = [0,1,2,3,4,5,6];
    this.unit.forEach((item) => {
      item.setAllUnit(this.allSeq);
    });
    this.loop();
  }

  selectTemplat(cate) {
    // this.gameOver = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    this.menu = new Menu("images/menu.jpg", 1080, 160, 1080, 1920, 1 / 12); 
    this.templet = new Templet();
    this.category = this.templet.getCategoryTemplet(cate);
    let x = 0;
    let y = 0;
    for(let i = 0, il = this.category.length; i < il; i++) {
      x = i / 4 - Math.floor(i / 4);
      y = Math.floor(i / 4)/4;
      new Category(ctx, this.category[i], "#333333", canvas.width, canvas.height).render(0.25, x, y);
    }

    // this.question = new Question(ctx, this.tangram, "#333333", canvas.width, canvas.height);
  }

  setTouchEvent() {
    // 绑定点击
    canvas.onmousedown  = (e) => {
      let ev  = e || window.event; 
      this.x = ev.clientX;
      this.y = ev.clientY;
      this.touchStart = true;
      this.touchMove = false;
      this.touchEnd = false;
    };
    // 绑定鼠标移动
    canvas.onmousemove  = (e) => {
      if(this.touchStart || this.touchMove) {
        let ev  = e || window.event; 
        this.x = ev.clientX;
        this.y = ev.clientY;
        this.touchStart = false;
        this.touchMove = true;
        this.touchEnd = false;
      }
    };
    // 绑定鼠标释放
    canvas.onmouseup    = (e) => {
      this.touchStart = false;
      this.touchMove = false;
      this.touchEnd = true;
    };
  }



  // 游戏逻辑更新主函数
  update() {
    if(this.gameOver) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0, il = this.unit.length; i < il; i++) {
      if (this.touchStart) {
        if (this.unit[i].touchStartEvent(this.x, this.y))
          break
      } else if (this.touchMove) {
        if (this.unit[i].touchMoveEvent(this.x, this.y))
          break
      } else if (this.touchEnd) {
        // this.touchEnd = false;
        this.unit[i].touchEndEvent()
      }
    };
    
    ctx.globalCompositeOperation = "source-over";
    // this.question.render();

    ctx.globalCompositeOperation = "lighter";
    this.unit.forEach((item) => {
      item.render();
    })


    let currentItem = this.unit[0];
    for (let i = this.unit.length-1; i >= 0; i--) {
      if (this.unit[this.allSeq[i]].touchedUnit || this.unit[this.allSeq[i]].touchedRotate) {
        currentItem = this.unit[this.allSeq[i]];
        break;
      }
    }

    this.unit.forEach((item) => {
      if (currentItem !== item) {
        item.touchedUnit = false;
        item.touchedRotate = false;
      }
    })


  }
 

  consoleLog(category='',name='') {
    let a ='\r\n,{p:[';
      this.unit.forEach((item,index) => {
        // item.render();
        // item.consoleLog();
        for(let i = 0; i < index; i++) {
          this.unit[i].tangram[0].p.forEach((ite) =>{
            item.tangram[0].p.forEach((it) => {
              if(Math.abs(it.x-ite.x) < 10) {
                it.x = ite.x;
              }
              if(Math.abs(it.y-ite.y) < 10) {
                it.y = ite.y;
              }
            });
          });

        }
        if(3 == item.tangram[0].p.length) {
          a += 
            "\r\n[{x:" + item.tangram[0].p[0].x * 3
          + ", y:" +item.tangram[0].p[0].y * 3 + "},"
          +  "{x:" + item.tangram[0].p[1].x  * 3
          + ", y:" +item.tangram[0].p[1].y * 3 + "},"
          +  "{x:" + item.tangram[0].p[2].x * 3 
          + ", y:" +item.tangram[0].p[2].y  * 3+ "}],";
        } else {
          a += 
            "\r\n[{x:" + item.tangram[0].p[0].x * 3 
          + ", y:" +item.tangram[0].p[0].y * 3 + "},"
          +  "{x:" + item.tangram[0].p[1].x * 3 
          + ", y:" +item.tangram[0].p[1].y  * 3+ "},"
          +  "{x:" + item.tangram[0].p[2].x * 3 
          + ", y:" +item.tangram[0].p[2].y  * 3+ "},"
          +  "{x:" + item.tangram[0].p[3].x  * 3
          + ", y:" +item.tangram[0].p[3].y * 3 + "}],";
        }
      });
      a += "],\r\ncategory: '" + category + "',\r\nname: '" + name + "'\r\n}";

      // let fs = require("fs");
      // fs.writeFile('templet.txt', a, {flag:'a'}, function (err) {
      //     if (err) {
      //         return console.error(err);
      //     }
      //     fs.readFile('templet.txt', function (err, data) {
      //         if (err) {
      //           return console.error(err);
      //         }
      //         console.log("异步读取文件数据: " + data.toString());
      //     });
      // });
      console.log(a);
      
  }

  // 实现游戏帧循环
  loop() {

    this.update();
    
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
