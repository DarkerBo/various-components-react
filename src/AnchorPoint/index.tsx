import React, { useState, useRef, RefObject } from 'react';
import styles from './index.module.scss';

const AnchorPoint: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const btnGroupRef = useRef<HTMLDivElement>(null);
  const Page1 = useRef<HTMLDivElement>(null);
  const Page2 = useRef<HTMLDivElement>(null);
  const Page3 = useRef<HTMLDivElement>(null);
  const Page4 = useRef<HTMLDivElement>(null);

  // 是否正在滚动
  const [isSlide, setIsSlide] = useState(false);

  const handleClick = (PageRef: RefObject<HTMLDivElement>) => {
    const element = PageRef.current as HTMLDivElement;
    const scrollElement = scrollRef.current as HTMLDivElement;
    const btnGroupElement = btnGroupRef.current as HTMLDivElement;
    slideTo(element, scrollElement, btnGroupElement);
  }

  const slideTo = (element: HTMLDivElement, scrollElement: HTMLDivElement, btnGroupElement:       HTMLDivElement) => {

    // 如果正在滚动，不能触发滚动事件，否则开多个定时器会滚动得越来越快
    if (isSlide) return;
    setIsSlide(true);

    const step = () => {
      // 需要滚动的距离为元素高度 - 按钮组的高度(用了sticky定位还占空间)
      const distance = element.offsetTop - btnGroupElement.offsetHeight;
      let speed = Math.abs(scrollElement.scrollTop - distance) / 10;

      // 加这个是因为测试发现scrollTop减去小于1的值就不会变
      if (speed < 1) speed = 1; 

      if (scrollElement.scrollTop > distance) {
        speed = -speed;
      }

      scrollElement.scrollTop += speed;
      // 判断是否已经滚动到元素起始处
      if ((speed >= 0 && scrollElement.scrollTop >= distance) 
        || (speed < 0 && scrollElement.scrollTop <= distance)) 
      {
        // 如果滚动超过了，回到原位
        scrollElement.scrollTop = distance;
        setIsSlide(false);
        return;
      }

      // 是否滚动到页面底部（一些元素高度不够，滚到页面底部也停止）
      // TODO：scrollTop底部为1377.59997，而scrollHeight-clientHeight = 1378，问题还在定位中
      // if (Math.round(scrollElement.scrollTop) >= scrollElement.scrollHeight - scrollElement.clientHeight) 
      if (scrollElement.scrollTop >= scrollElement.scrollHeight - scrollElement.clientHeight) {
        scrollElement.scrollTop = scrollElement.scrollHeight - scrollElement.clientHeight;
        setIsSlide(false);
        return;
      }

      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  return (
    <div className={styles.container} ref={scrollRef}>
      <div className={styles['btn-group']} ref={btnGroupRef}>
        <button onClick={() => handleClick(Page1)}>Page1</button>
        <button onClick={() => handleClick(Page2)}>Page2</button>
        <button onClick={() => handleClick(Page3)}>Page3</button>
        <button onClick={() => handleClick(Page4)}>Page4</button>
      </div>

      <div className={`${styles.page} ${styles.page1}`} ref={Page1}>Page1</div>
      <div className={`${styles.page} ${styles.page2}`} ref={Page2}>Page2</div>
      <div className={`${styles.page} ${styles.page3}`} ref={Page3}>Page3</div>
      <div className={`${styles.page} ${styles.page4}`} ref={Page4}>Page4</div>
    </div>
  )
}

export default AnchorPoint;