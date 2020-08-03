import React, { useRef } from 'react';
import styles from './index.module.scss';
import LoopPlayback from './components/LoopPlayback';

const LoopPlaybackDemo: React.FC = () => {

  const verticalData = useRef<string[]>(['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh', 'iii', 'jjj', 'kkk', 'lll', 'mmm', 'lll', 'ooo']);

  const horizontalData = useRef<{label: string, color: string}[]>([
    { label: 'aaa', color: 'pink' },
    { label: 'bbb', color: 'skyblue' },
    { label: 'ccc', color: 'yellow' },
    { label: 'ddd', color: 'purple' },
    { label: 'eee', color: 'green' },
    { label: 'fff', color: 'orange' },
    { label: 'ggg', color: '#bfa' },
  ]);


  return (
    <div className={styles.container}>
      {/* 
        * 垂直 + 子项高度（或宽度）百分比例子
        百分比需要定义LoopPlayback里面的scorllRef的高度（或宽度），通过percentage和totalCount计算它的百分比 
        子项（这里就是li）的高度或（宽度）百分比是根据ul，ul是scorllRef的高度或（宽度）的100%
        则每个子项的高度或（宽度）应该为100 / 子项的总数得出每个子项的高度或（宽度）的百分比
      */}
      <LoopPlayback
        direction="vertical"
        listClassName={styles.verticalContainer}
        percentage={0.2}
        totalCount={verticalData.current.length}
      >
        <ul className={styles.ul}>
          {verticalData.current.map((item, index) => (
            <li 
              className={styles.li} 
              key={index}
              style={{ height: `${100 / verticalData.current.length}%` }}
            >
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </LoopPlayback>

      {/* 
        * 水平 + 子项宽度（或高度）固定值
      */}
      <LoopPlayback
        direction="horizontal"
        listClassName={styles.horizontalContainer}
      >
        <div className={styles.labelContainer}>
          {
            horizontalData.current.map((item, index) => (
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