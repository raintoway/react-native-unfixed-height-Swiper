## 高度随每片内容的高度变化的滑动swiper

### 内容可以文本 图片 视频 
本例里面的为文本   

### 使用方式
1. npm i react-native-unfixed-height-swiper --save-dev
2. 给组件传入文本数组，每个元素为对象{contents:'',name:''} 即可
3. detailPlots:[{index : 0,name : '填补中',contents : '由于作者过于懒惰 所以没填充剧情 嘤嘤嘤 别打我 (╥╯^╰╥)'},
      {index : 1,name : '填补中',contents : '由于作者过于懒惰 所以没填充剧情 嘤嘤嘤 别打我 (╥╯^╰╥)'},
      {index : 2,name : '填补中',contents : '由于作者过于懒惰 所以没填充剧情 嘤嘤嘤 别打我 (╥╯^╰╥)'}]
```javascript
// 本例子为文字类  参数有文本数组，数组大小
// 还没进行图片判定  如果想组价是图片swiper可以在 @/lib/detailPlots 里面修改Text组件为Iamge组件即可  
<DetailSwiper detailPlotNumber={this.state.detailPlotNumber} detailPlots={this.state.detailPlots} />    
```
### 欢迎pull request

### 性能不错

### 推荐将代码直接插入自己项目中 而不是require
这是因为要刷新 放入项目中的话 刷新会快很多
因为是父子组件  如果想跳过初始的默认数据阶段  就将@/lib/detailPlots的代码放入项目中  这样能很快的加载数据 
