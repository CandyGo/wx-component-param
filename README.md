## 1.创建组件
打开微信开发者工具，创建组件，会生成四个文件：wxml,wxss,js,json

在wxml中：

```
<view>我是组件A</view>
```

在js中：


```
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
   
  }

})
```

在json中：


```
{
  "component": true,
  "usingComponents": {}
}
```

即组件创建完成

## 2.引入组件

要在index中引入组件，则

在index.json中：


```
{
  "usingComponents": {
    "componentA": "../../components/child1/child1"
  }
}
```

在index.wxml中：


```
<view>
    <view>微信小程序组件传参</view>
    <componentA />
</view>
```

则组件就能够显示，要使得组件引入，先要在json中去给组件定义一下才可在wxml中显示

## 3.父组件向子组件传参
声明：A组件为父组件，B组件为子组件，以下是A组件向B组件传参：

**在A组件中引入B组件**

在A组件的json中写入：

```
{
  "component": true,
  "usingComponents": {
    "componentB": "../child2/child2"
  }
}
```
在A组件的wxml中写入：

```

<view>我是组件A</view>
<view>
   <view>子组件内容：</view>
   <componentB paramAtoB='我是A向B中传入的参数'/>
</view>

```

在B组件的js中写入：


```
Component({

  behaviors: [],

  properties: {
    paramAtoB:String
  },
  data: {

  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { },
  moved: function () { },
  detached: function () { },

  methods: {

  }

})
```

即在properties中定义A组件要传过来的参数类型

在B组件的wxml中写入：


```
<view style='border:2px solid gray;'>
<view style='text-align:center;'>我是组件B</view>
<view>A中传入的参数：{{paramAtoB}}</view>
</view>

```

**总结：** A组件向B组件传参，实际上就是在A组件中引入B组件的时候，带上一个属性paramAtoB，并且给其赋值，然后B组件通过这个属性名称paramAtoB，获取其值

## 4.子组件向父组件传参
声明：A组件为父组件，B组件为子组件，以下是B组件向A组件传参：

要让子组件给父组件传参，首先得在父组件引入子组件的时候，加个触发事件，如下：

**在父组件A中wxml:**

```
<view style='padding:20px;border:2px solid red;'>
<view style='text-align:center;'>我是组件A</view>
<view>
   <view>A组件内容：</view>
   <view>B组件传入参数：{{paramBtoA}}</view>
   <componentB paramAtoB='我是A向B中传入的参数' bind:myevent="onMyEvent"/>
</view>

</view>
```
myevent就是绑定的触发事件

**在父组件A中js:**


```
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
```
onMyEvent就是当被子组件触发时的函数

**在子组件B中wxml:**


```
<view style='border:2px solid gray;'>
<view style='text-align:center;'>我是组件B</view>
<view>A中传入的参数：{{paramAtoB}}</view>
  <button bindtap='change'>向A中传入参数</button>
</view>

```

button按钮点击事件一触发，就可以传入参数进入父组件A中，在子组件B中js:


```
Component({

  behaviors: [],

  properties: {
    paramAtoB:String
  },
  data: {

  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { },
  moved: function () { },
  detached: function () { },

  methods: {
    change:function(){
      this.triggerEvent('myevent', { paramBtoA:123});
    }
  }

})
```

this.triggerEvent就是按钮点击之后执行的事件，触发myevent事件，传入参数paramBtoA进入父组件

以上就是微信小程序父子组件之间的传参，后期如果有新发现会不定期更新！

















