
class Templet {
  constructor() {
    this.category = [];
    this.templet = [
      {
        p: [
          [{ x: 630, y: 1187 }, { x: 488, y: 1329 }, { x: 488, y: 1046 }],
          [{ x: 347, y: 1187 }, { x: 488, y: 1046 }, { x: 488, y: 1329 }],
          [{ x: 347, y: 1468 }, { x: 347, y: 1185 }, { x: 627, y: 1468 }],
          [{ x: 488, y: 770 }, { x: 488, y: 370 }, { x: 888, y: 770 }],
          [{ x: 488, y: 772 }, { x: 91, y: 772 }, { x: 488, y: 372 }],
          [{ x: 488, y: 767 }, { x: 629, y: 908 }, { x: 488, y: 1049 }, { x: 347, y: 908 }],
          [{ x: 488, y: 1329 }, { x: 772, y: 1329 }, { x: 913, y: 1469 }, { x: 625, y: 1469 }]
        ],
        category: '物品',
        name: '台灯'
      },

      { 
        p: [
          [{ x: 491, y: 740 }, { x: 491, y: 540 }, { x: 691, y: 740 }],
          [{ x: 491, y: 937 }, { x: 691, y: 937 }, { x: 491, y: 1137 }],
          [{ x: 691, y: 737 }, { x: 891, y: 537 }, { x: 891, y: 937}],
          [{ x: 491, y: 841 }, { x: 91, y: 841 }, { x: 491, y: 441 }],
          [{ x: 491, y: 841 }, { x: 491, y: 1241 }, { x: 91, y: 841 }],
          [{ x: 491, y: 737 }, { x: 691, y: 737 }, { x: 691, y: 937 }, { x: 491, y: 937 }],
          [{ x: 691, y: 736 }, { x: 891, y: 936 }, { x: 891, y: 1136 }, { x: 691, y: 936 }]
        ],
        category: '动物',
        name: '鱼'
      },

    ];
  }

  // 
  getOneTemplet(i) {
    return this.templet[i];
  }

  // 
  getCategoryTemplet(cate) {
    this.templet.forEach((item,index) => {
      if (item.category == cate )
      this.category.push([item,index]);
    })
    return this.category;
  }



}
