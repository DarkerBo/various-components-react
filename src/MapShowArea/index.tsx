import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

import { china } from "../common/MapJson/data-china";

const cityMap: Record<string, any> = {
  '中国': { name:'CHINA', data: china },
}

const MapShowArea: React.FC = () => {

  const [showMap, setShowMap] = useState('中国');
  const [option, setOption] = useState({});

const cityList = useRef<{ name: string; value: number }[]>([
    {name: "广东", value: 120},
    {name: "黑龙江", value: 33},
    {name: "山东", value: 55},
    {name: "河南", value: 120},
    {name: "江苏", value: 77},
    {name: "安徽", value: 33},
    {name: "江西", value: 55},
    {name: "福建", value: 33},
    {name: "四川", value: 55},
    {name: "贵州", value: 5},
])

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
    });
  }, [showMap])

   const extendsMap = (opt: any) => {
  
    const initialOption = {
      backgroundColor: opt.bgColor,
      tooltip: {
        show: true,
        trigger: "item",
        formatter: function(params: any) {
          return params.name + '：' + (params.data ? params.data['value'] : 0);
        },
      },
      visualMap: { // 左下角的图标及地图区域
        min: 0,
        max: 100000,
        left: 26,
        bottom: 30,
        showLabel: true,
        text: ["高", "低"],
        textStyle: {
          color: '#fff',
        },
        pieces: [{
          gt: 100,
          label: "> 100家",
          color: "#ff6f00"
        }, {
          gte: 80,
          lte: 100,
          label: "80 - 100 家",
          color: "#fcc029"
        }, {
          gte: 60,
          lt: 80,
          label: "60 - 80家",
          color: "#ff8c71"
        }, {
          gt: 40,
          lt: 60,
          label: "40 - 60家",
          color: "#fdd836"
        }, {
          gt: 20,
          lt: 40,
          label: "40 - 60家",
          color: "#ffee5a"
        }, {
          gt: 0,
          lt: 20,
          label: "20 - 40家",
          color: "#fff9c5"
        }, {
          value: 0,
          label: "0家",
          color: "#ffffff"
        }],
      },
      geo: { 
        // 地图底色设置
        map: opt.mapName,
        roam: true,
        zoom: 1.1, // 初始地图显示比例
        top:'center',
        left:'center',
        label: {
          normal: {
            show: true,
            textStyle: {
              color: '#fff', // 省份字体颜色
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
            borderColor: "#01e5ed",
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
        regions: cityList.current.map((item:any)=> { // 选中的区域设置，如设置区域字体颜色为黑色
          return {
            name: item.name,
            label: {
              normal: {
                textStyle: {
                  color: "#000"
                }
              }
            }
          }
        })
      },
      series: [
        {
          type: "map",
          geoIndex: 0,
          data: cityList.current,
        }
      ]
    };
    setOption(prevState => {
      return {...prevState, ...initialOption};
    })
  
  };


  useEffect(() => {
    dataRender();
  }, [dataRender]);

  
  return (
    <div>
      <ReactEcharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  )
}

export default memo(MapShowArea);
