import React, { useRef, useEffect, memo } from 'react';
import styles from './index.module.scss';
import { textWatermark } from './textWaterMark';
import { imageWatermark } from './imageWaterMark';
import { hiddenWaterMark, showWaterMark } from './hiddenWaterMark';

const WaterMark: React.FC = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const hiddenContainerRef = useRef<HTMLImageElement>(null);
  const showContainerRef = useRef<HTMLImageElement>(null);
  const canvasBox = {
    width: 200, height: 150,
  };

  const catImage = require('./cat.jpg');
  const strongImage = require('./strong.jpg');
  const strongEncodeImage = require('./strong-encode.jpg');

  useEffect(() => {
    // 文字水印
    const containerElement = textContainerRef.current as HTMLDivElement;
    textWatermark(containerElement, '这是水印', canvasBox.width, canvasBox.height);

    // 图片水印
    const imageElement = imageRef.current as HTMLImageElement;
    imageWatermark(imageElement, catImage, '这是水印', 500, 300, 0, 100, 50);

     // 生成隐水印
     const hiddenElement = hiddenContainerRef.current as HTMLImageElement;
     hiddenWaterMark(hiddenElement, strongImage, '这是水印', 500, 300, 0, 100, 50);

     // 展示隐水印
     const showElement = showContainerRef.current as HTMLImageElement;
     showWaterMark(showElement, strongEncodeImage, 500, 300);
  });
  
  return (
    <div className={styles.container}>
      {/* 图片水印 */}
      <div className={styles.item}>
        <p className={styles.title}>图片水印</p>
        <div className={styles.imageContainer}>
          <img alt="图片明水印" ref={imageRef} />
        </div>
      </div>

      {/* 文字水印 */}
      <div className={styles.item}>
        <p className={styles.title}>文字水印</p>
        <div className={styles.textContainer} ref={textContainerRef} />
      </div>

      {/* 生成隐水印 */}
      <div className={styles.item}>
        <p className={styles.title}>生成隐水印</p>
        <div className={styles.imageContainer}>
          <img alt="隐水印" ref={hiddenContainerRef} />
        </div>
      </div>

      {/* 展示隐水印 */}
      <div className={styles.item}>
        <p className={styles.title}>展示隐水印</p>
        <div className={styles.imageContainer}>
          <img alt="隐水印" ref={showContainerRef} />
        </div>
      </div>
    </div>
  )
}

export default memo(WaterMark);