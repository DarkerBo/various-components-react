/**
 * 方法说明 这是一个创建文字水印的方法，直接在传入的dom元素内增加水印Canvas
 * @param {HTMLDivElement} containerRef 水印dom对象，该对象应该饱和(必填)
 * @param {string} content 水印内容(必填)
 * @param {number} width 水印canvas的宽度
 * @param {number} height 水印canvas的高度
 * @param {number} rotate 水印旋转角度
 * @param {number} textX 水印文本的X坐标
 * @param {number} textY 水印文本的Y坐标
 * @param {number} zIndex 水印层级
 * @param {string} fillStyle 水印文字颜色和透明度
 * @param {string} font 水印文字大小和字体
 * @param {CanvasTextAlign} textAlign 水印文本的文本对齐方式
 * @param {CanvasTextBaseline} textBaseline 当前水印文本基线
 */

export const textWatermark = (
  containerRef: HTMLDivElement,
  content: string,
  width = 200,
  height = 150,
  rotate = 30,
  textX = width / 2,
  textY = height / 2,
  zIndex = 1000,
  fillStyle = 'rgba(184, 184, 184, 0.9)',
  font = '20px microsoft yahei',
  textAlign: CanvasTextAlign = 'center',
  textBaseline: CanvasTextBaseline = 'middle',
) => {
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.rotate((Math.PI / 180) * rotate);
  ctx.fillText(content, textX, textY);

  // 生成base64图片地址
  const base64Url = canvas.toDataURL();

  // 将base64图片地址设置为水印div的背景图片
  containerRef.style.position = 'relative'; // 开启父组件定位

  // 样式字符串
  const styleStr = `
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: ${zIndex};
    pointer-events: none;
    background-repeat: repeat;
    background-image: url('${base64Url}');
  `;

  const watermarkDiv = document.createElement('div');

  watermarkDiv.style.cssText = styleStr;
  watermarkDiv.classList.add('watermark');
  containerRef.appendChild(watermarkDiv);

  // 稍微懂一点浏览器的使用或者网页知识的用户，可以用浏览器的开发者工具来动态更改DOM的属性或者结构就可以去掉了
  // 就需要MutationObserver API提供的一种能在某个范围内的DOM树发生变化时作出适当反应的能力。

  // MutationObserver监测到诸如属性改变、增删子结点等
  // 若被删除了，在container里面重新加回水印div。

  let mutationObserver: MutationObserver | null = new MutationObserver((mutations, observer) => {
    for (const mutationItem of mutations) {
      // 当水印节点被删除时或者当属性被改变时删除该水印div并重新调用createWatermark方法
      if ((mutationItem.removedNodes[0] 
        && (mutationItem.removedNodes[0] as Element).className === 'watermark')
        || mutationItem.attributeName) {
        // 避免一直触发，关闭连接，观察器设为null，重新调用方法
        (mutationObserver as MutationObserver).disconnect();
        mutationObserver = null;
        textWatermark(
          containerRef,
          content,
          width,
          height,
          rotate,
          textX,
          textY,
          zIndex,
          fillStyle,
          font,
          textAlign,
          textBaseline,
        );
      }
    }
  });

  // 启动元素监测
  mutationObserver.observe(containerRef, {
    attributes: true,
    subtree: true,
    childList: true,
    characterData: true,
    attributeOldValue: true,
    characterDataOldValue: true,
  });
};
