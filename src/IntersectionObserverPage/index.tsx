import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.scss';

const IntersectionObserverTest: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const scrollImations = (entries: any[], observer: any) => {
      for (const item of entries) {
        if (item.isIntersecting && item.intersectionRatio >= 0) {
          setShow(true);
        } else {
          setShow(false);
        }
      }
    };

    const options: IntersectionObserverInit = {
      root: parentRef.current,
      threshold: 0,
    };

    const observer = new IntersectionObserver(scrollImations, options);
    observer.observe(boxRef.current as Element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* 外部容器 */}
      <div className={styles.bigBox}>
        {/* 监听容器 */}
        <div className={styles.parent} ref={parentRef}>
          {/* 滚动容器 */}
          <div className={styles.children} ref={childrenRef}>
            {/* 目标容器 */}
            <div className={styles.box} ref={boxRef}></div>
          </div>
        </div>

        {show && <div className={styles.title}>I am in</div>}
      </div>
    </div>
  );
};

export default IntersectionObserverTest;
