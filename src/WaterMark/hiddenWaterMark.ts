/**
 * 方法说明 这是一个创建隐水印的方法，直接在传入的本地图片中增加水印
 * @param {HTMLImageElement} imageRef 水印imgdom对象，该对象应该饱和(必填)
 * @param {Object} imgObj 需要加的本地图片对象(必填)
 * @param {string} content 水印内容(必填)
 * @param {number} width 水印canvas的宽度
 * @param {number} height 水印canvas的高度
 * @param {number} rotate 水印旋转角度
 * @param {number} textX 水印文本的X坐标
 * @param {number} textY 水印文本的Y坐标
 * @param {string} fillStyle 水印文字颜色和透明度
 * @param {string} font 水印文字大小和字体
 * @param {CanvasTextAlign} textAlign 水印文本的文本对齐方式
 * @param {CanvasTextBaseline} textBaseline 当前水印文本基线
 */

// 给图片加入隐水印
export const hiddenWaterMark = (
  imageRef: HTMLImageElement,
  imgObj: string,
  content: string,
  width = 200,
  height = 150,
  rotate = 0,
  textX = 0,
  textY = 0,
  fillStyle = 'rgba(184, 184, 184, 0.9)',
  font = '20px microsoft yahei',
  textAlign: CanvasTextAlign = 'center',
  textBaseline: CanvasTextBaseline = 'middle',
) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  // 水印样式
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.font = font;
  ctx.rotate((Math.PI / 180) * rotate);
  ctx.fillStyle = fillStyle;
  ctx.fillText(content, textX, textY);

  // 复制画布上指定矩形的像素数据
  const textData = ctx.getImageData(0, 0, width, height).data;

  const img = new Image();
  // 允许跨域获取该图片
  img.crossOrigin = 'anonymous';

  // 可以考虑在img.orrer中做图片加载失败时的处理
  img.onload = function() {
    ctx.drawImage(img, 0, 0, width, height);
    // 获取指定区域的图片像素信息
    const originImgData = ctx.getImageData(0, 0, width, height);
    mergeData(ctx, textData, 'R', originImgData)

    // 生成新图片的base64地址
    const base64Url = canvas.toDataURL();
    imageRef.src = base64Url;
  };

  img.src = imgObj;
};

/**
 * 方法说明 这是一个处理待加密图片的RGB像素方法
 * @param {CanvasRenderingContext2D} ctx canvas对象
 * @param {Uint8ClampedArray} textData 水印文字的像素数据
 * @param {'R'|'G'|'B'} colorPixel 像素字段
 * @param {data: Uint8ClampedArray, width: number, height: number} originImgData 图片的像素数据对象
 */
const mergeData = (
  ctx: CanvasRenderingContext2D, 
  textData: Uint8ClampedArray, 
  colorPixel: 'R' | 'G' | 'B',
  originImgData: { data: Uint8ClampedArray, width: number, height: number }
) => {
  const imgData = originImgData.data;
  // offset的作用是找到alpha通道值
  let bit, offset; 
  switch (colorPixel) {
    case 'R':
      bit = 0; offset = 3; break;
    case 'G':
      bit = 1; offset = 2; break;
    case 'B':
      bit = 2; offset = 1; break;
  }

  for (let i = 0; i < imgData.length; i++) {
    if (i % 4 === bit) {
      // 只处理目标通道
      if (textData[i + offset] === 0 && imgData[i] % 2 === 1) {
        if (imgData[i] === 255) {
          imgData[i]--;
        } else {
          imgData[i]++;
        }
      } else if (textData[i + offset] !== 0 && imgData[i] % 2 === 0) {
        // 有信息的像素，该通道最低位置1，可以想想上面的斑点效果是怎么实现的
        imgData[i]++;
      }
    }
  }

  // 将图像数据放回画布
  ctx.putImageData(originImgData, 0, 0);
}


/**
 * 方法说明 这是一个创建隐水印的方法，直接在传入的本地图片中增加水印
 * @param {HTMLImageElement} imageRef 水印imgdom对象，该对象应该饱和(必填)
 * @param {Object} imgObj 需要加的本地图片对象(必填)
 * @param {number} width 水印canvas的宽度
 * @param {number} height 水印canvas的高度
 */

// 显示图片的隐水印
export const showWaterMark = (
  imageRef: HTMLImageElement,
  imgObj: string,
  width = 200,
  height = 150,
) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  
  const img = new Image();
  // 允许跨域获取该图片
  img.crossOrigin = 'anonymous';

  // 可以考虑在img.orrer中做图片加载失败时的处理
  img.onload = function() {
    ctx.drawImage(img, 0, 0, width, height);
    // 获取指定区域的图片像素信息
    const originImgData = ctx.getImageData(0, 0, width, height);
    processData(ctx, originImgData);

    // 生成新图片的base64地址
    const base64Url = canvas.toDataURL();
    imageRef.src = base64Url;
  };

  img.src = imgObj;

}

/**
 * 方法说明 这是一个处理待解密图片的RGB像素方法
 * @param {CanvasRenderingContext2D} ctx canvas对象
 * @param {data: Uint8ClampedArray, width: number, height: number} originImgData 图片的像素数据对象
 */
const processData = (
  ctx: CanvasRenderingContext2D,
  originImgData: {data: Uint8ClampedArray, width: number, height: number}
) => {
  const imgData = originImgData.data;
  for (let i = 0; i < imgData.length; i++) {
    if (i % 4 === 0) {
      // R分量
      if (imgData[i] % 2 === 0) {
        imgData[i] = 0;
      } else {
        imgData[i] = 255;
      }
    } else if (i % 4 === 3) {
      // alpha通道不做处理
      continue;
    } else {
      // 关闭其他分量，不关闭也不影响答案
      imgData[i] = 0;
    }
  }

  // 将结果绘制到画布
  ctx.putImageData(originImgData, 0, 0);
}
  
