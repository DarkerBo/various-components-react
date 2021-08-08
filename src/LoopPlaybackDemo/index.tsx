import React, { useState, useEffect, useCallback } from 'react';
import styles from './index.module.scss';
import LoopPlayback from './components/LoopPlayback';

type ItemType = {
  label: string;
  color: string;
}

const LoopPlaybackDemo: React.FC = () => {

  const [verticalData, setVerticalData] = useState<ItemType[]>([]);

  const [horizontalData, setHorizontalData] = useState<ItemType[]>([]);

  const getInitialData = useCallback(() => {
    // 垂直容器数据

    const verticalArr = [
      { label: 'aaa', color: 'pink' },
      { label: 'bbb', color: 'skyblue' },
      { label: 'ccc', color: 'yellow' },
      { label: 'ddd', color: 'purple' },
      { label: 'eee', color: 'green' },
      { label: 'fff', color: 'orange' },
      { label: 'ggg', color: '#bfa' },
    ];

    setVerticalData(() => verticalArr); // 修改对象类state要用函数式

    // 水平容器数据
    const horizontalArr = [
      { label: 'aaa', color: 'pink' },
      { label: 'bbb', color: 'skyblue' },
      { label: 'ccc', color: 'yellow' },
      { label: 'ddd', color: 'purple' },
      { label: 'eee', color: 'green' },
      { label: 'fff', color: 'orange' },
      { label: 'ggg', color: '#bfa' },
    ];

    setHorizontalData(() => horizontalArr);// 修改对象类state要用函数式

  }, [])

  useEffect(() => {
    getInitialData();
  }, [getInitialData])


  return (
    <div className={styles.container}>
      {/* 使用 animation 实现 */}
      <div className={styles.animationHorizontal}>
        <div className={styles.animationScroll}>
          { verticalData.map(item => (
            <div 
              className={styles.animationScrollItem} 
              key={item.label}
              style={{
                backgroundColor: item.color,
              }}
            >
              <span>{ item.label }</span>
            </div>
          )) }
        </div>

        {/* 需要两份数据，以此来起到无缝效果 */}
        <div className={`${styles.animationScroll} ${styles.horizontalPosition}`}>
          { verticalData.map(item => (
            <div 
              className={styles.animationScrollItem} 
              key={item.label}
              style={{
                backgroundColor: item.color,
              }}
            >
              <span>{ item.label }</span>
            </div>
          )) }
        </div>

      </div>

      {/* 
        * 使用 insertRule 注入样式
        * 垂直 + 子项高度（或宽度）固定值例子
      */}
      <LoopPlayback
        direction="vertical"
        listenData={verticalData}
        listClassName={styles.verticalContainer}
      >
        <ul className={styles.ul}>
          {verticalData.map((item, index) => (
            <li 
              className={styles.li} 
              key={index}
              style={{
                backgroundColor: item.color,
              }}
            >
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </LoopPlayback>

      {/* 
        * 使用 insertRule 注入样式
        * 水平 + 子项宽度（或高度）固定值
      */}
      <LoopPlayback
        direction="horizontal"
        listenData={horizontalData}
        listClassName={styles.horizontalContainer}
      >
        <div className={styles.labelContainer}>
          {
            horizontalData.map((item, index) => (
              <div 
                className={styles.labelItem} 
                key={index}
                style={{ backgroundColor: item.color }}
              >{ item.label }</div>
            ))
          }
        </div>
      </LoopPlayback>

    </div>
  );
  
}

export default LoopPlaybackDemo;