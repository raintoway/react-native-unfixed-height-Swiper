import React, { Component } from 'react';
import { Animated,View, Text,Dimensions,PanResponder,UIManager,findNodeHandle} from 'react-native';


export default class Test extends Component {
  // 高度随内容变化的剧情滑板 
  // 比上面那个还要难理解 你注意吧 
  pan7 =  PanResponder.create({
    onMoveShouldSetPanResponder: (evt,gestureState) => {
      if (Math.abs(gestureState.dx)>=1&&Math.abs(gestureState.dy)<=3) {
        return true
      }
      return false
    },
    onPanResponderTerminate:(evt,gestureState)=>{
        // 不切换
        // 还原
        Animated.timing(                  // 随时间变化而执行动画
          this.state.detailAnim,            // 动画中的变量值
          {
            toValue: gestureState.dx,                   // 透明度最终变为1，即完全不透明
            duration: 0,              // 让动画持续一段时间
            useNativeDriver:true
          }
        ).start();
        Animated.timing(                  // 随时间变化而执行动画
          this.state.detailAnim,            // 动画中的变量值
          {
            toValue: 0,                   // 透明度最终变为1，即完全不透明
            duration: 300,              // 让动画持续一段时间
            useNativeDriver:true
          }
        ).start();
        if (this.state.whichBox ==1) {
          this._moveBox.setNativeProps({
            style:{height:this.state.firstHeight}
          })
        }else if(this.state.whichBox ==2){
          this._moveBox.setNativeProps({
            style:{height:this.state.secHeight}
          })
        }else{
          this._moveBox.setNativeProps({
            style:{height:this.state.zeroHeight}
          })
        }
    },
    onPanResponderMove:(evt,gestureState)=>{
      let temp1 = 0
      let temp2 = 0
      if (gestureState.dx>0) {
        temp1 = gestureState.dx>=100?100:gestureState.dx
      }else{
        temp2 = gestureState.dx<=-100?-100:gestureState.dx
      }
      // 1板子在中间
      if (this.state.whichBox==1 ) {
        if (gestureState.dx<0) {
          // 左滑
          this._detailPlot1.setNativeProps({
            style:{translateX:gestureState.dx}
          })
          this._detailPlot2.setNativeProps({
            style:{translateX:gestureState.dx}
          })
          this._moveBox.setNativeProps({
            style:{height:temp2/100*(this.state.firstHeight - this.state.secHeight) + this.state.firstHeight}
          })
        }else{
          // 右滑
          this._detailPlot1.setNativeProps({
            style:{translateX:gestureState.dx}
          })
          this._detailPlot0.setNativeProps({
            style:{translateX:gestureState.dx}
          })
          this._moveBox.setNativeProps({
            style:{height:-temp1/100*(this.state.firstHeight - this.state.zeroHeight) + this.state.firstHeight}
          })
        }
      }else if(this.state.whichBox ==2){
          // 第二个板子在中间
          if (gestureState.dx<0) {
            // 左滑
            this._detailPlot2.setNativeProps({
              style:{translateX:gestureState.dx}
            })
            this._detailPlot0.setNativeProps({
              style:{translateX:gestureState.dx}
            })
            this._moveBox.setNativeProps({
              style:{height:temp2/100*(this.state.secHeight - this.state.zeroHeight) + this.state.secHeight}
            })
          }else{
            // 右滑
            this._detailPlot2.setNativeProps({
              style:{translateX:gestureState.dx}
            })
            this._detailPlot1.setNativeProps({
              style:{translateX:gestureState.dx}
            })
            this._moveBox.setNativeProps({
              style:{height:-temp1/100*(this.state.secHeight - this.state.firstHeight) + this.state.secHeight}
            })
          }
      }else{
          // 第0个板子在中间
          if (gestureState.dx<0) {
            // 左滑
            this._detailPlot0.setNativeProps({
              style:{translateX:gestureState.dx}
            })
            this._detailPlot1.setNativeProps({
              style:{translateX:gestureState.dx}
            })
            this._moveBox.setNativeProps({
              style:{height:temp2/100*(this.state.zeroHeight - this.state.firstHeight) + this.state.zeroHeight}
            })
          }else{
            // 右滑
            this._detailPlot0.setNativeProps({
              style:{translateX:gestureState.dx}
            })
            this._detailPlot2.setNativeProps({
              style:{translateX:gestureState.dx}
            })
            this._moveBox.setNativeProps({
              style:{height:-temp1/100*(this.state.zeroHeight - this.state.secHeight) + this.state.zeroHeight}
            })
          }
      }
    },
    onPanResponderRelease: (evt,gestureState) => {
      if (gestureState.dx>=100||gestureState.dx<=-100) {
        // 确认切换
        if (gestureState.dx<0) {
          // 往左滑
          if (this.state.whichBox==1) {
            // 第一个板子 
            Animated.timing(                  // 随时间变化而执行动画
                this.state.detailAnim,            // 动画中的变量值
                {
                  toValue:gestureState.dx ,                   // 透明度最终变为1，即完全不透明
                  duration: 0,              // 让动画持续一段时间
                  useNativeDriver:true
                }
              ).start(()=>{
                  Animated.timing(                  // 随时间变化而执行动画
                    this.state.detailAnim,            // 动画中的变量值
                    {
                      toValue: -this.state.width,                   // 透明度最终变为1，即完全不透明
                      duration: 300,              // 让动画持续一段时间
                      useNativeDriver:true
                    }
                  ).start(()=>{
                    Animated.timing(                  // 随时间变化而执行动画
                      this.state.detailAnim,            // 动画中的变量值
                      {
                        toValue:0 ,                   // 透明度最终变为1，即完全不透明
                        duration: 0,              // 让动画持续一段时间
                        useNativeDriver:true
                      }
                    ).start();
                    this.setState({zeroIndex:(this.state.index+2)%this.state.detailPlotNumber,whichBox:2,index:(this.state.index+1)%this.state.detailPlotNumber})
                    this._detailPlot0.setNativeProps({
                      style:{left:this.state.width}
                    })
                    this._detailPlot1.setNativeProps({
                      style:{left:-this.state.width}
                    })
                    this._detailPlot2.setNativeProps({
                      style:{left:0}
                    })
                  });

              });

            
            this._moveBox.setNativeProps({
              style:{height:this.state.secHeight}
            })
            
          }else if(this.state.whichBox == 2){
            // 第二个板子
            this._moveBox.setNativeProps({ 
              style:{height:this.state.zeroHeight}
            })
            Animated.timing(                  // 随时间变化而执行动画
              this.state.detailAnim,            // 动画中的变量值
              {
                toValue: gestureState.dx,                   // 透明度最终变为1，即完全不透明
                duration: 0,              // 让动画持续一段时间
                useNativeDriver:true
              }
            ).start(()=>{
                Animated.timing(                  // 随时间变化而执行动画
                  this.state.detailAnim,            // 动画中的变量值
                  {
                    toValue: -this.state.width,                   // 透明度最终变为1，即完全不透明
                    duration: 300,              // 让动画持续一段时间
                    useNativeDriver:true

                  }
                ).start(()=>{
                  Animated.timing(                  // 随时间变化而执行动画
                    this.state.detailAnim,            // 动画中的变量值
                    {
                      toValue: 0,                   // 透明度最终变为1，即完全不透明
                      duration: 0,              // 让动画持续一段时间
                      useNativeDriver:true
                    }
                  ).start();
                  this.setState({firstIndex:(this.state.index+2)%this.state.detailPlotNumber,whichBox:0,index:(this.state.index+1)%this.state.detailPlotNumber})
                  this._detailPlot0.setNativeProps({
                    style:{left:0,translateX:0}
                  })
                  this._detailPlot1.setNativeProps({
                    style:{left:this.state.width}
                  })
                  this._detailPlot2.setNativeProps({
                    style:{left:-this.state.width}
                  })
                });

            });
          }else{
            // 第0个板子         
            this._moveBox.setNativeProps({
              style:{height:this.state.firstHeight}
            })
            Animated.timing(                  // 随时间变化而执行动画
              this.state.detailAnim,            // 动画中的变量值
              {
                toValue: gestureState.dx,                   // 透明度最终变为1，即完全不透明
                duration: 0,              // 让动画持续一段时间
                useNativeDriver:true
              }
            ).start(()=>{
              Animated.timing(                  // 随时间变化而执行动画
                this.state.detailAnim,            // 动画中的变量值
                {
                  toValue: -this.state.width,                   // 透明度最终变为1，即完全不透明
                  duration: 300,              // 让动画持续一段时间
                  useNativeDriver:true
                }
              ).start(()=>{
                Animated.timing(                  // 随时间变化而执行动画
                  this.state.detailAnim,            // 动画中的变量值
                  {
                    toValue: gestureState.dx,                   // 透明度最终变为1，即完全不透明
                    duration: 0,              // 让动画持续一段时间
                    useNativeDriver:true
                  }
                ).start();
                this.setState({secIndex:(this.state.index+2)%this.state.detailPlotNumber,whichBox:1,index:(this.state.index+1)%this.state.detailPlotNumber})
                this._detailPlot0.setNativeProps({
                  style:{left:-this.state.width,translateX:0}
                })
                this._detailPlot1.setNativeProps({
                  style:{left:0,translateX:0}
                })
                this._detailPlot2.setNativeProps({
                  style:{left:this.state.width,translateX:0}
                })
              }); 

            });

          }
        }else{
          // 往右滑
          if (this.state.whichBox==1) {
            // 第一个板子
            this._moveBox.setNativeProps({
              style:{height:this.state.zeroHeight}
            })
            Animated.timing(                  // 随时间变化而执行动画
              this.state.detailAnim,            // 动画中的变量值
              {
                toValue: gestureState.dx,                   // 透明度最终变为1，即完全不透明
                duration: 0,              // 让动画持续一段时间
                useNativeDriver:true
              }
            ).start(()=>{
                Animated.timing(                  // 随时间变化而执行动画
                  this.state.detailAnim,            // 动画中的变量值
                  {
                    toValue: this.state.width,                   // 透明度最终变为1，即完全不透明
                    duration: 300,              // 让动画持续一段时间
                    useNativeDriver:true

                  }
                ).start(()=>{
                  Animated.timing(                  // 随时间变化而执行动画
                    this.state.detailAnim,            // 动画中的变量值
                    {
                      toValue: gestureState.dx,                   // 透明度最终变为1，即完全不透明
                      duration: 0,              // 让动画持续一段时间
                      useNativeDriver:true
                    }
                  ).start();
                  this.setState({secIndex:((this.state.index-2)+this.state.detailPlotNumber)%this.state.detailPlotNumber,whichBox:0,index:(this.state.index-1+this.state.detailPlotNumber)%this.state.detailPlotNumber})
                  this._detailPlot0.setNativeProps({
                    style:{left:0,translateX:0}
                  })
                  this._detailPlot1.setNativeProps({
                    style:{left:this.state.width,translateX:0}
                  })
                  this._detailPlot2.setNativeProps({
                    style:{left:-this.state.width,translateX:0}
                  })
                }); 
            });
           
            
          }else if(this.state.whichBox == 2){
            // 第二个板子
            this._moveBox.setNativeProps({
              style:{height:this.state.firstHeight}
            })
            Animated.timing(                  // 随时间变化而执行动画
              this.state.detailAnim,            // 动画中的变量值
              {
                toValue: gestureState.dx,                   // 透明度最终变为1，即完全不透明
                duration: 0,              // 让动画持续一段时间
                useNativeDriver:true
              }
            ).start(()=>{
                Animated.timing(                  // 随时间变化而执行动画
                  this.state.detailAnim,            // 动画中的变量值
                  {
                    toValue: this.state.width,                   // 透明度最终变为1，即完全不透明
                    duration: 300,              // 让动画持续一段时间
                    useNativeDriver:true

                  }
                ).start(()=>{
                  Animated.timing(                  // 随时间变化而执行动画
                    this.state.detailAnim,            // 动画中的变量值
                    {
                      toValue: gestureState.dx,                   // 透明度最终变为1，即完全不透明
                      duration: 0,              // 让动画持续一段时间
                      useNativeDriver:true
                    }
                  ).start();
                  this.setState({secIndex:(this.state.index+2)%this.state.detailPlotNumber,whichBox:1,index:(this.state.index+1)%this.state.detailPlotNumber})
                  this._detailPlot0.setNativeProps({
                    style:{left:-this.state.width,translateX:0}
                  })
                  this._detailPlot1.setNativeProps({
                    style:{left:0,translateX:0}
                  })
                  this._detailPlot2.setNativeProps({
                    style:{left:this.state.width,translateX:0}
                  })
                });
            });
          }else{
            // 第0个板子
            this._moveBox.setNativeProps({
              style:{height:this.state.secHeight}
            })
            Animated.timing(                  // 随时间变化而执行动画
              this.state.detailAnim,            // 动画中的变量值
              {
                toValue: gestureState.dx,                   // 透明度最终变为1，即完全不透明
                duration: 0,              // 让动画持续一段时间
                useNativeDriver:true
              }
            ).start(()=>{
                Animated.timing(                  // 随时间变化而执行动画
                  this.state.detailAnim,            // 动画中的变量值
                  {
                    toValue: this.state.width,                   // 透明度最终变为1，即完全不透明
                    duration: 300,              // 让动画持续一段时间
                    useNativeDriver:true
                  }
                ).start(()=>{
                  Animated.timing(                  // 随时间变化而执行动画
                    this.state.detailAnim,            // 动画中的变量值
                    {
                      toValue: gestureState.dx,                   // 透明度最终变为1，即完全不透明
                      duration: 0,              // 让动画持续一段时间
                      useNativeDriver:true
                    }
                  ).start();
                  this.setState({secIndex:(this.state.index+2)%this.state.detailPlotNumber,whichBox:1,index:(this.state.index+1)%this.state.detailPlotNumber})
                  this._detailPlot0.setNativeProps({
                    style:{left:this.state.width,translateX:0}
                  })
                  this._detailPlot1.setNativeProps({
                    style:{left:-this.state.width,translateX:0}
                  })
                  this._detailPlot2.setNativeProps({
                    style:{left:0,translateX:0}
                  })
                }); 
            });
          }
        }
      }else{
        // 不切换
        // 还原
        Animated.timing(                  // 随时间变化而执行动画
          this.state.detailAnim,            // 动画中的变量值
          {
            toValue: gestureState.dx,                   // 透明度最终变为1，即完全不透明
            duration: 0,              // 让动画持续一段时间
            useNativeDriver:true
          }
        ).start(()=>{
          Animated.timing(                  // 随时间变化而执行动画
            this.state.detailAnim,            // 动画中的变量值
            {
              toValue: 0,                   // 透明度最终变为1，即完全不透明
              duration: 300,              // 让动画持续一段时间
              useNativeDriver:true
            }
          ).start();
        });
       
        if (this.state.whichBox ==1) {
          this._moveBox.setNativeProps({
            style:{height:this.state.firstHeight}
          })
        }else if(this.state.whichBox ==2){
          this._moveBox.setNativeProps({
            style:{height:this.state.secHeight}
          })
        }else{
          this._moveBox.setNativeProps({
            style:{height:this.state.zeroHeight}
          })
        }
      }
  }
  })
  constructor(props) {
    super(props);
    this.state = {
      detailPlots:[{index : 0,name : '填补中',contents : '由于作者过于懒惰 所以没填充剧情 嘤嘤嘤 别打我 (╥╯^╰╥)'},
      {index : 1,name : '填补中',contents : '由于作者过于懒惰 所以没填充剧情 嘤嘤嘤 别打我 (╥╯^╰╥)'},
      {index : 2,name : '填补中',contents : '由于作者过于懒惰 所以没填充剧情 嘤嘤嘤 别打我 (╥╯^╰╥)'}
    ],
      width:Dimensions.get('window').width,
      // 集数 从0开始
      index:0,
      whichBox:1,
      // 三个班子对应的高度
      zeroHeight:0,
      firstHeight:0,
      secHeight:0,
      detailPlotNumber:3,
      // 剧情板子对应的index
      zeroIndex:2,
      firstIndex:0,
      secIndex:1,
      detailFlag:true,
      tempFlag:true,
      // 动画参数
      detailAnim: new Animated.Value(0),
    };
  }
  componentWillReceiveProps =  (nextProps)=>{
    // 由于父组件刷新自身都会将传递进来的参数更新(哪怕相同)  这个函数就会执行多次
    if (nextProps.detailPlotNumber!=this.state.detailPlotNumber) {
      this.setState({detailPlotNumber:nextProps.detailPlotNumber,detailPlots:[...nextProps.detailPlots]})
    }
   }
  render() {
    return (
      <View {...this.pan7.panHandlers} >
      {this.state.detailFlag?
          <Animated.View  ref={ref => this._moveBox = ref} style={{height:80,width:'100%',position:'relative'}}>
          
           {/* 剧情第0个板子 */}
          <Animated.View  ref={ref => this._detailPlot0 = ref}  style={{borderRadius:6,translateX:this.state.detailAnim,paddingLeft:10,paddingVertical:10,width:'100%',backgroundColor:'#FFD39B',position:'absolute',left:-this.state.width}} onLayout={() => {
            let handle0 = findNodeHandle(this._detailPlot0);
            UIManager.measure(handle0,(x, y, width, height, pageX, pageY) => {
                this.setState({zeroHeight:height})
                })
              }} >
              <Text style={{fontSize:17,lineHeight:20}}>第{this.state.detailPlots[this.state.zeroIndex].index+1}级   {this.state.detailPlots[this.state.zeroIndex].name}</Text>
              <Text  style={{fontSize:16}}>{this.state.detailPlots[this.state.zeroIndex].contents}</Text>
          </Animated.View>
          
           {/* 剧情第一个板子 */}
          <Animated.View  ref={ref => this._detailPlot1 = ref}  style={{borderRadius:6,translateX:this.state.detailAnim,paddingLeft:10,paddingVertical:10,width:'100%',backgroundColor:'#FFD39B',position:'absolute',left:0}} onLayout={() => {
            let handle = findNodeHandle(this._detailPlot1);
            UIManager.measure(handle,(x, y, width, height, pageX, pageY) => {
                this.state.tempFlag?this._moveBox.setNativeProps({style:{height:height}}):null
                this.setState({firstHeight:height,tempFlag:false})
                })
              }} >
              <Text  style={{fontSize:17,lineHeight:20}}>第{this.state.detailPlots[this.state.firstIndex].index+1}级   {this.state.detailPlots[this.state.firstIndex].name}</Text>
              <Text style={{fontSize:16}}>{this.state.detailPlots[this.state.firstIndex].contents}</Text>
          </Animated.View>

           {/* 剧情第二个板子 */}
          <Animated.View  ref={ref => this._detailPlot2 = ref}  style={{borderRadius:6,translateX:this.state.detailAnim,paddingLeft:10,paddingVertical:10,width:'100%',backgroundColor:'#FFD39B',position:'absolute',left:this.state.width}} onLayout={() => {
            let handle2 = findNodeHandle(this._detailPlot2);
            UIManager.measure(handle2,(x, y, width, height, pageX, pageY) => {
                this.setState({secHeight:height})
            })
          }} >
              <Text  style={{fontSize:17,lineHeight:20}}>第{this.state.detailPlots[this.state.secIndex].index+1}级   {this.state.detailPlots[this.state.secIndex].name}</Text>
              <Text style={{fontSize:16}}>{this.state.detailPlots[this.state.secIndex].contents}</Text>
          </Animated.View>
          </Animated.View >
      :<View style={{width:'100%',height:200,backgroundColor:'#FFD39B'}}></View>}
      </View>
    );
  }
  
}
