Component({

  behaviors: [],

  properties: {
   
  },
  data: {

  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { },
  moved: function () { },
  detached: function () { },

  methods: {
    onMyEvent:function(e){
      this.setData({
        paramBtoA: e.detail.paramBtoA
      })
    }
  }

})