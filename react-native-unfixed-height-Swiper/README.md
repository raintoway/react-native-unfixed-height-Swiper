## 高度随每片内容的高度变化的Swiper## 高度随每片内容的高度变化的Swiper

### 内容可以文本 图片 视频 
本例里面的为文本

### 使用方式
1. npm i react-native-unfixed-height-swiper --save-dev
2. 给组件传入文本数组，每个元素为对象{contents:'',name:''} 即可
```javascript
<DetailSwiper detailPlotNumber={this.state.detailPlotNumber} detailPlots={this.state.detailPlots} />    
```
### 欢迎pull request

### 推荐将代码直接插入自己项目中 而不是require
这是因为要刷新 放入项目中的话 刷新会快很多 
