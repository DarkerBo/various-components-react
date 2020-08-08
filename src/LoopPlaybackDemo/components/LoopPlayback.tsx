import React, { memo, useRef, useCallback, useEffect, useState }  from 'react';

type IProps = {
  direction: 'vertical' | 'horizontal'; // 方向，vertical代表垂直，horizontal代表水平
  children: React.ReactNode;
  listenData: any[]; // 需要监听的数组
  listClassName?:string; // 最外层容器的className
  speed?: number; // 每秒移动的速度
}

const LoopPlayback: React.FC<IProps> = (props) => {
  const listRef = useRef<HTMLDivElement>(null);
  const scorllRef = useRef<HTMLDivElement>(null);

  const { direction, speed = 100, listenData, listClassName } = props;

  // 是否需要循环播放,若存放数据的容器大于外层容器listRef，则循环播放
  const [isSwiper, setIsSwiper] = useState(false);

  // 播放函数
  const scrollData = useCallback(() => {
    const listElement = listRef.current as HTMLDivElement;
    const scrollElement = scorllRef.current as HTMLDivElement;

    const scrollDirection = direction === 'vertical' ? 'scrollHeight' : 'scrollWidth';
    const offsetDirection = direction === 'vertical' ? 'offsetHeight' : 'offsetWidth';
    const translateDirection = direction === 'vertical' ? 'translateY' : 'translateX';


    // state存储的数据data一开始渲染为空，因此为了性能刚开始的这个情况return掉
    // if (scrollElement[scrollDirection] === 0) return;

    console.log(scrollElement[scrollDirection], scrollDirection, direction);
    console.log(listElement[offsetDirection], offsetDirection, direction);

    // 若内容高度小于外框高度，则不循环滚动,改成只包含一个内容
    if (listElement[offsetDirection] >= scrollElement[scrollDirection]) {
      setIsSwiper(false);
      return;
    } else {
      setIsSwiper(true);
    }

    // 生成随机动画事件名，避免重复，不能直接用Math.random，有小数点的话keyframes的name无法解析
    const keyframesName = `scroll${new Date().valueOf()}`;
    scrollElement.style.animation = `${keyframesName} ${scrollElement[scrollDirection] / speed}s linear infinite`;

    // 这里使用定位top的话会出现字会颤抖的现象
    const keyframesValue = `@keyframes ${keyframesName}{
              0% { transform: ${translateDirection}(0px) }
              100%{
                transform: ${translateDirection}(-${scrollElement[scrollDirection]}px);
              }`;

    const stylesheet = document.styleSheets[document.styleSheets.length - 1] as CSSStyleSheet;
    stylesheet.insertRule(keyframesValue, stylesheet.cssRules.length);
  }, [direction, speed])

  useEffect(() => {
    scrollData();
  }, [scrollData, listenData]);

  return (
    <div className={listClassName} ref={listRef}>
      <div 
        ref={scorllRef}
        style={{
          height: '100%',
          width: '100%',
          display: 'flex', 
          flexDirection: direction === 'vertical' ? 'column' : 'row',
        }}
      >
        {/* 这里要放两个相同的内容,然后瞬间变化时才不会有感觉,达到真正的无缝连接 */}
        { props.children }
        { isSwiper && props.children }
      </div>
    </div>
  )

}

export default memo(LoopPlayback);