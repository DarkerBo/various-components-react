import React, { useRef, useEffect } from 'react';
import styles from './index.module.scss';
import { textWatermark } from './textWaterMark';
import { imageWatermark } from './imageWaterMark';

const WaterMark: React.FC = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasBox = {
    width: 200, height: 150,
  };

  const catImage = require('./cat.jpg');

  useEffect(() => {
    // 文字水印
    const containerElement = textContainerRef.current as HTMLDivElement;
    textWatermark(containerElement, '这是水印', canvasBox.width, canvasBox.height);

    // 图片水印
    const imageElement = imageRef.current as HTMLImageElement;
    imageWatermark(
      imageElement,
      catImage,
      '这是水印',
      0,
      100,
      50
    )
  });
  
  return (
    <div className={styles.container}>
      {/* 文字水印测试Div */}
      <div className={styles.textContainer} ref={textContainerRef} />
      <div className={styles.imageContainer}>
        <img alt="图片" ref={imageRef} />
      </div>
    </div>
  )
}

export default WaterMark;