import React, { useEffect, useState, useCallback, memo } from 'react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
// import 'echarts/lib/chart/effectScatter';

import { china } from "../common/MapJson/data-china";
import { hainan } from "../common/MapJson/data-hainan";
import { xizang } from "../common/MapJson/data-xizang";
import { zhejiang } from "../common/MapJson/data-zhejiang";
import { yunnan } from "../common/MapJson/data-yunnan";
import { xinjiang } from "../common/MapJson/data-xinjiang";
import { tianjin } from "../common/MapJson/data-tianjin";
import { sichuan } from "../common/MapJson/data-sichuan";
import { shanxi } from "../common/MapJson/data-shanxi";
import { shangxi } from "../common/MapJson/data-shangxi";
import { shanghai } from "../common/MapJson/data-shanghai";
import { shangdong } from "../common/MapJson/data-shangdong";
import { qinghai } from "../common/MapJson/data-qinghai";
import { ningxia } from "../common/MapJson/data-ningxia";
import { neimenggu } from "../common/MapJson/data-neimenggu";
import { liaoning } from "../common/MapJson/data-liaoning";
import { jilin } from "../common/MapJson/data-jilin";
import { jiangxi } from "../common/MapJson/data-jiangxi";
import { jiangsu } from "../common/MapJson/data-jiangsu";
import { hunan } from "../common/MapJson/data-hunan";
import { hubei } from "../common/MapJson/data-hubei";
import { henan } from "../common/MapJson/data-henan";
import { heilongjiang } from "../common/MapJson/data-heilongjiang";
import { hebei } from "../common/MapJson/data-hebei";
import { guizhou } from "../common/MapJson/data-guizhou";
import { guangxi } from "../common/MapJson/data-guangxi";
import { guangdong } from "../common/MapJson/data-guangdong";
import { gansu } from "../common/MapJson/data-gansu";
import { chongqing } from "../common/MapJson/data-chongqing";
import { aomen } from "../common/MapJson/data-aomen";
import { anhui } from "../common/MapJson/data-anhui";
import { beijing } from "../common/MapJson/data-beijing";
import { fujian } from "../common/MapJson/data-fujian";
import { xianggang } from "../common/MapJson/data-xianggang";

const cityMap: Record<string, any> = {
  '中国': { name:'CHINA', data: china },
  '上海': { name:'shanghai', data: shanghai },
  '河北': { name:'hebei', data: hebei },
  '山西': { name:'shangxi', data: shangxi },
  '内蒙古': { name:'neimenggu', data: neimenggu },
  '辽宁': { name:'liaoning', data: liaoning },
  '吉林': { name:'jilin', data: jilin },
  '黑龙江': { name:'heilongjiang', data: heilongjiang },
  '江苏': { name:'jiangsu', data: jiangsu },
  '浙江': { name:'zhejiang', data: zhejiang },
  '安徽': { name:'anhui', data: anhui },
  '福建': { name:'fujian', data: fujian },
  '江西': { name:'jiangxi', data: jiangxi },
  '山东': { name:'shangdong', data: shangdong },
  '河南': { name:'henan', data: henan },
  '湖北': { name:'hubei', data: hubei },
  '湖南': { name:'hunan', data: hunan },
  '广东': { name:'guangdong', data: guangdong },
  '广西': { name:'guangxi', data: guangxi },
  '海南': { name:'hainan', data: hainan },
  '四川': { name:'sichuan', data: sichuan },
  '贵州': { name:'guizhou', data: guizhou },
  '云南': { name:'yunnan', data: yunnan },
  '西藏': { name:'xizang', data: xizang },
  '陕西': { name:'shanxi', data: shanxi },
  '甘肃': { name:'gansu', data: gansu },
  '青海': { name:'qinghai', data: qinghai },
  '宁夏': { name:'ningxia', data: ningxia },
  '新疆': { name:'xinjiang', data: xinjiang },
  '北京': { name:'beijing', data: beijing },
  '天津': { name:'tianjin', data: tianjin },
  '重庆': { name:'chongqing', data: chongqing },
  '香港': { name:'xianggang', data: xianggang },
  '澳门': { name:'aomen', data: aomen },
}

let name: string[] = [];
let idx = 0;
const zoom: number = 1.1; // 地图缩放比例
const line = [[0, 0], [8, 11], [0, 22]];
// style
const style = {
  font: '18px "Microsoft YaHei", sans-serif',
  textColor: "#eee",
  lineColor: "rgba(147, 235, 248, 0.8)" // 左上角地图位置边线
};

let handleEvents: any = {}

const MapDown: React.FC = () => {

  // const myEhartsRef = useRef<HTMLDivElement>(null);

  const [showMap, setShowMap] = useState('中国');
  const [option, setOption] = useState({});

  const dataRender = useCallback(() => {
    if(!cityMap[showMap]){
      setShowMap('中国');
      console.log(`${showMap}-没有该地图配置!!!`);
    }
    const geoJson = JSON.parse(JSON.stringify(cityMap[showMap].data));
    echarts.registerMap(showMap, geoJson);
    extendsMap({
     bgColor: '#154e90', // 画布背景色
      mapName: showMap, // 地图名
      goDown: true, // 是否下钻
      // data: chartData, // 也是配置标记点的
    });
  }, [showMap])

   const extendsMap = (opt: any) => {
    // const geoCoordMap: any = {};
  
    // opt.data.forEach((data: any) => {
    //   geoCoordMap[`${data.name}`] = [data.position[0], data.position[1]];
    // });
  
    // opt.activeArea = [];
  
    // 层级索引
    name = [opt.mapName];
    idx = 0;

    handleEvents = {
      /*
          i 实例对象
          o option
          n 地图名
      */
       resetOption: ( o: any, n: any)=> {
         const breadcrumb = handleEvents.createBreadcrumb(n);
         const j = name.indexOf(n);
         const l = o.graphic.length;
         if (j < 0) {
           o.graphic.push(breadcrumb);
           o.graphic[0].children[0].shape.x2 = 145;
           o.graphic[0].children[1].shape.x2 = 145;
        //    if (o.graphic.length > 2) {
        //      let cityData:any = [];
        //      let cityJson:any = null;
        //      for(const data of opt.data){
        //         cityJson = {};
        //        if (n.slice(0, 2) === data.city.slice(0, 2)) {
        //           for(const key in data){
        //              if (data.hasOwnProperty(key)) {
        //                 cityJson[key] = data[key];
        //              }
        //           }   
        //        }
        //        cityData.push(JSON.parse(JSON.stringify(cityJson)));
        //      }
  
        //      if (cityData != null) {
        //        o.series[0].data = handleEvents.initSeriesData(cityData);
        //      } else {
        //        o.series[0].data = [];
        //      }
        // }
  
           name.push(n);
           idx++;
         } else {
           o.graphic.splice(j + 2, l);
           if (o.graphic.length <= 2) {
             o.graphic[0].children[0].shape.x2 = 60;
             o.graphic[0].children[1].shape.x2 = 60;
            //  o.series[0].data = handleEvents.initSeriesData(opt.data);
           }
           name.splice(j + 1, l);
           idx = j;
         }
        // 中国地图时，不显示企业名
        // o.series[0].label.normal.show = n==='中国'?false:true;
         o.geo.map = n;
         o.geo.zoom = 0.4; // 地图切换时的初始比例
         
         handleEvents.zoomAnimation();
       },
    
       /*
         name 地图名
        */
       createBreadcrumb: (mapName: string)=> {
         // 左上角地图名称配置
         const cityToPinyin = cityMap;
         const breadcrumb = {
           type: "group",
           id: mapName,
           left: "16.5%",
           top: "10%",
           children: [
             {
               type: "polyline",
               left: -90,
               top: -5,
               shape: {
                 points: line
               },
               style: {
                 stroke: "#fff",
                 key: mapName
                 // lineWidth: 2,
               },
               onclick: ()=> {
                 const clickName = breadcrumb.children[0].style.key;
                 handleEvents.resetOption(initialOption, clickName);
               }
             },
             {
               type: "text",
               left: -68,
               top: "middle",
               style: {
                 text: mapName,
                 textAlign: "center",
                 fill: style.textColor,
                 font: style.font
               },
               onclick: () =>{
                 const clickName =  breadcrumb.children[1].style.text;
                 handleEvents.resetOption(initialOption, clickName);
               }
             },
             {
               type: "text",
               left: -68,
               top: 10,
               style: {
                 name: mapName,
                 text: cityToPinyin[mapName].name ? cityToPinyin[mapName].name.toUpperCase() : "",
                 textAlign: "center",
                 fill: style.textColor,
                 font: '12px "Microsoft YaHei", sans-serif'
               },
               onclick: ()=> {
                 const clickName = breadcrumb.children[2].style.name;
                 handleEvents.resetOption(initialOption, clickName);
               }
             }
           ]
         };
    
         return breadcrumb;
       },
    
      // 设置effectscatter标记点
      //  initSeriesData: (data: any)=> {
      //    const temp = [];
      //    for(const item of data){
      //       const geoCoord = geoCoordMap[item.name];
      //       if (geoCoord) {
      //         temp.push({
      //           name: item.name,
      //           value: geoCoord.concat(item.value),
      //           company: item.company,
      //           position: item.position,
      //       city: item.city,
      //       repeatNum: item.repeatNum,
      //         });
      //       }
      //    }
    
      //    return temp;
      //  },
        zoomAnimation: ()=> {
          initialOption.geo.zoom = zoom;
          setOption(prevState => {
            return {...prevState, ...initialOption};
          })
        }
    };
  
    const initialOption = {
      backgroundColor: opt.bgColor,
      tooltip: {
        show: true,
        trigger: "item",
        alwaysShowContent: false,
        backgroundColor: "rgba(21,84,151,0.9)", // 显示数据框底色
        hideDelay: 100,
        triggerOn: "mousemove",
        enterable: true,
        formatter: '{b}',
      },
  
      graphic: [
        {
          // 地图名词位置设置 => 中国／广州
          type: "group",
          left: "11.5%",
          top: "9%",
          children: [
            {
              type: "line",
              left: 0,
              top: -20,
              shape: {
                x1: 0,
                y1: 0,
                x2: 60,
                y2: 0
              },
              style: {
                stroke: style.lineColor
              }
            },
            {
              type: "line",
              left: 0,
              top: 20,
              shape: {
                x1: 0,
                y1: 0,
                x2: 60,
                y2: 0
              },
              style: {
                stroke: style.lineColor
              }
            }
          ]
        },
        {
          id: name[idx],
          type: "group",
          left: "12%",
          top: "9.6%",
          children: [
            {
              type: "polyline",
              left: 90,
              top: -12,
              shape: {
                points: line
              },
              style: {
                stroke: "transparent",
                key: name[0]
              },
              onclick: ()=> {
                const clickName = (initialOption.graphic[1].children[0].style as any).key;
                handleEvents.resetOption(initialOption, clickName);
              }
            },
            {
              type: "text",
              left: 0,
              top: "middle",
              style: {
                text: opt.mapName,
                textAlign: "center",
                fill: style.textColor,
                font: style.font
              },
              onclick: ()=> {
                handleEvents.resetOption(initialOption, opt.mapName);
              }
            },
            {
              type: "text",
              left: 0,
              top: 10,
              style: {
                text: cityMap[opt.mapName].name,
                textAlign: "center",
                fill: style.textColor,
                font: '12px "Microsoft YaHei", sans-serif'
              },
              onclick: ()=> {
                handleEvents.resetOption(initialOption, opt.mapName);
              }
            }
          ]
        }
      ],
      geo: { 
        // 地图底色设置
        map: opt.mapName,
        roam: true,
        zoom: zoom as number, // 初始地图显示比例
        top:'center',
        left:'center',
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "rgb(17, 67, 131,0)"
            }
          },
          emphasis: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: "rgb(13, 110, 178)",
            borderWidth: 1,
            areaColor: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(17, 67, 131, 0.8)" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(17, 67, 131, 0.8)" // 100% 处的颜色
                }
              ],
              globalCoord: true // 缺省为 false
            },
            shadowColor: "rgba(128, 217, 248, 1)" // 地图阴影
          },
          emphasis: {
            areaColor: "#389BB7", // 鼠标移动到地图颜色
            borderWidth: 0
          }
        },
        // 选中的区域设置，如设置某个点在地图的任何位置
        // regions: opt.activeArea.map((item:any)=> {
        //   if (typeof item !== "string") {
        //     return {
        //       name: item.name,
        //       itemStyle: {
        //         normal: {
        //           areaColor: item.areaColor || "#389BB7"
        //         }
        //       },
        //       label: {
        //         normal: {
        //           show: item.showLabel,
        //           textStyle: {
        //             color: "#fff"
        //           }
        //         }
        //       }
        //     };
        //   } else {
        //     return {
        //       name: item,
        //       itemStyle: {
        //         normal: {
        //           borderColor: "#91e6ff",
        //           areaColor: "#389BB7"
        //         }
        //       }
        //     };
        //   }
        // })
      },
      series: [
        // effectScatter 可以在地图上做点的标记
        // {
        //   type: "effectScatter",
        //   coordinateSystem: "geo",
        //   showEffectOn: "render",
        //   rippleEffect: { // 涟漪特效相关配置
        //     period: 15,
        //     scale: 4,
        //     brushType: "stroke"
        //   },
        //   hoverAnimation: true,
        //   label: {
        //       normal: {
        //           formatter: (params: any) => {
        //             const str = '\n'
        //             let str1 = ''
        //             for(let i = 0; i<params.data.repeatNum*3; i++){
        //               str1 = str1 + str;
        //             }
        //             return `${str1}${params.name}`
        //           },
        //           position: 'right',
        //           offset:[15,0],
        //           show: opt.mapName==='中国'?false:true,
        //           color: '#fff',
        //           fontSize: 16,
        //       }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: "rgb(81, 239, 239)", // 攻击点颜色设置
        //       shadowBlur: 10,
        //       shadowColor: '#00f9ff'
        //     }
        //   },
        // }
      ]
    };
    setOption(prevState => {
      return {...prevState, ...initialOption};
    })
  
  };


  useEffect(() => {
    dataRender();
  }, [dataRender]);

  const onEventFun = (...data:any[]): void => {
    const params = data[0];
    if ( params.name !== name[idx]) {
        if (cityMap[params.name]) {
          const response = cityMap[params.name].data;
          echarts.registerMap(params.name, response);
          handleEvents.resetOption(option, params.name);
        }
    }
  }

  const onEvents = {
    'click': onEventFun,
  }
  
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* <div ref={myEhartsRef} style={{ width: '100vw', height: '100vh' }} /> */}
      <ReactEcharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        onEvents={ onEvents }
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  )
}

export default memo(MapDown);
