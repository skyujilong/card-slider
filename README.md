# card-slider
card-slider，一种动态的左右切换效果。
### 依赖 ###
- zepto

### 使用例子 ###
```
//初始化操作,需要传递zepto选择的元素，第二个参数可以不写，默认bar为true开启下面的滚动条。
var slider = new Slider($("#demo"),{bar:true});
//目前仅提供了 一个事件，就是当用户滚动slider的时候，会调用如下的方法。返回值是当前滚动的页码下标
slider.on('change',function(num){
    console.log(num);
});

```
### 后续支持功能 ###
- 支持自动滚动功能。
- 添加更多事件的支持。
- 打包好源码，目前没有打包。

### 例子在assets文件夹内 ###
checkout 项目之后打开assets目录，然后用浏览器运行assets文件夹下的demo.html文件。
