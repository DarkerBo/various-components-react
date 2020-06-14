/**
 * 方法说明 这是一个创建图片水印的方法，直接在传入的本地图片中增加水印
 * @param {HTMLImageElement} imageRef 水印imgdom对象，该对象应该饱和(必填)
 * @param {Object} imgObj 需要加的本地图片对象(必填)
 * @param {string} content 水印内容(必填)
 * @param {number} rotate 水印旋转角度
 * @param {number} textX 水印文本的X坐标
 * @param {number} textY 水印文本的Y坐标
 * @param {string} fillStyle 水印文字颜色和透明度
 * @param {string} font 水印文字大小和字体
 * @param {CanvasTextAlign} textAlign 水印文本的文本对齐方式
 * @param {CanvasTextBaseline} textBaseline 当前水印文本基线
 */

export const imageWatermark = (
  imageRef: HTMLImageElement,
  imgObj: string,
  content: string,
  rotate = 0,
  textX = 0,
  textY = 0,
  fillStyle = 'rgba(184, 184, 184, 0.9)',
  font = '20px microsoft yahei',
  textAlign: CanvasTextAlign = 'center',
  textBaseline: CanvasTextBaseline = 'middle',
) => {
  const img = new Image();
  // 允许跨域获取该图片
  img.crossOrigin = 'anonymous';

  // 可以考虑在img.orrer中做图片加载失败时的处理
  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(img, 0, 0);
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.rotate((Math.PI / 180) * rotate);
    ctx.fillStyle = fillStyle;
    ctx.fillText(content, textX, textY);

    // 生成base64图片地址
    const base64Url = canvas.toDataURL();
    imageRef.src = base64Url;
  };

  img.src = imgObj;
};
