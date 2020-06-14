import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';

const LoopPlayback: React.FC = () => {

  const listRef = useRef<HTMLDivElement>(null);
  const dataContainerRef = useRef<HTMLDivElement>(null);


  const playData = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh', 'iii', 'jjj', 'kkk', 'lll', 'mmm'];

  // 是否需要循环播放
  const [isSwiper, setIsSwiper] = useState(true);

  // 播放函数
  const scrollData = () => {
    const listElement = listRef.current as HTMLDivElement;
    const dataContainerElement = dataContainerRef.current as HTMLDivElement;
    // state中的data一开始为空
    if (dataContainerElement.offsetHeight === 0) return;

    // 若内容高度小于外框高度，则不循环滚动,改成只包含一个内容
    if (listElement.offsetHeight >= dataContainerElement.offsetHeight / 2) {
      setIsSwiper(false);
      return;
    }

    // 滚动的速度值
    const speed = 200;

    // 生成随机动画事件名，避免重复，不能直接用Math.random，有小数点的话keyframes的name无法解析
    const keyframesName = `scroll${new Date().valueOf()}`;
    dataContainerElement.style.animation = `${keyframesName} ${dataContainerElement.offsetHeight / speed}s linear infinite`;

    // 这里使用定位top的话会出现字会颤抖的现象
    const keyframesValue = `@keyframes ${keyframesName}{
    					0% { transform: translateY(0px) }
    					100%{
    						transform: translateY(-${dataContainerElement.offsetHeight / 2}px);
              }`;

    const stylesheet = document.styleSheets[document.styleSheets.length - 1] as CSSStyleSheet;
    stylesheet.insertRule(keyframesValue, stylesheet.cssRules.length);
  };

  useEffect(() => {
    scrollData();
  });

  return (
    <div className={styles.container}>
      <div className={styles.listContainer} ref={listRef}>
        <div ref={dataContainerRef}>
          {/* 这里要放两个相同的内容,然后瞬间变化时才不会有感觉,达到真正的无缝连接 */}
          <ul className={styles.ul}>
            {playData.map((item, index) => (
              <li className={styles.li} key={index}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {isSwiper && (
            <ul className={styles.ul}>
              {playData.map((item, index) => (
                <li className={styles.li} key={index}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
  
}

export default LoopPlayback;