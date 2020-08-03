import React, { memo, useRef, useCallback, useEffect, useState }  from 'react';

type IProps = {
  direction: 'vertical' | 'horizontal'; // 方向，vertical代表垂直，horizontal代表水平
  children: React.ReactNode;
  listClassName?:string; // 最外层容器的className
  speed?: number; // 每秒移动的速度
  percentage?: number; // 百分比,与下面的totalCount一起用，代表每个子元素占最外层容器宽度或者高度的百分比
  totalCount?: number; // 子元素个数的总数
}

const LoopPlayback: React.FC<IProps> = (props) => {
  const listRef = useRef<HTMLDivElement>(null);
  const scorllRef = useRef<HTMLDivElement>(null);

  const { direction, speed = 200, listClassName, percentage, totalCount } = props;

  // 是否需要循环播放,若存放数据的容器大于外层容器listRef，则循环播放
  const [isSwiper, setIsSwiper] = useState(true);

  // 播放函数
  const scrollData = useCallback(() => {
    const listElement = listRef.current as HTMLDivElement;
    const scrollElement = scorllRef.current as HTMLDivElement;

    const scrollDirection = direction === 'vertical' ? 'scrollHeight' : 'scrollWidth';
    const offsetDirection = direction === 'vertical' ? 'offsetHeight' : 'offsetWidth';
    const translateDirection = direction === 'vertical' ? 'translateY' : 'translateX';


    // state存储的数据data一开始渲染为空，因此为了性能刚开始的这个情况return掉
    // if (scrollElement[scrollDirection] === 0) return;

    // 若内容高度小于外框高度，则不循环滚动,改成只包含一个内容
    if (listElement[offsetDirection] >= (scrollElement[scrollDirection] / 2)) {
      setIsSwiper(false);
      return;
    }

    // 生成随机动画事件名，避免重复，不能直接用Math.random，有小数点的话keyframes的name无法解析
    const keyframesName = `scroll${new Date().valueOf()}`;
    scrollElement.style.animation = `${keyframesName} ${scrollElement[scrollDirection] / speed}s linear infinite`;

    // 这里使用定位top的话会出现字会颤抖的现象
    const keyframesValue = `@keyframes ${keyframesName}{
              0% { transform: ${translateDirection}(0px) }
              100%{
                transform: ${translateDirection}(-${scrollElement[scrollDirection] / 2}px);
              }`;

    const stylesheet = document.styleSheets[document.styleSheets.length - 1] as CSSStyleSheet;
    stylesheet.insertRule(keyframesValue, stylesheet.cssRules.length);
  }, [direction, speed])

  useEffect(() => {
    scrollData();
  }, [scrollData]);

  return (
    <div className={listClassName} ref={listRef}>
      <div 
        ref={scorllRef}
        style={{ 
          height: direction === 'vertical' && percentage && totalCount ? 
          `${ totalCount * percentage * 100 }%` : '100%',
          width: direction === 'horizontal' && percentage && totalCount ? 
            `${ totalCount * percentage * 100 }%` : '100%',
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