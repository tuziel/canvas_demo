window.addEventListener('load', (): void => {
  /** 打开页面的时间戳 */
  const __TIMESTAMP__ = +new Date();

  /**
   * 请求动画绘制
   *
   * 要求浏览器在下次重绘之前调用指定的回调函数更新动画
   * @param callback 更新动画帧所调用的函数
   */
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    (window as any).mozRequestAnimationFrame ||
    (window as any).oRequestAnimationFrame ||
    (window as any).msRequestAnimationFrame ||
    ((callback: FrameRequestCallback) =>
      window.setTimeout(() => {
        const time = +new Date() - __TIMESTAMP__;
        callback(time);
      }, 1000 / 60));

  /**
   * 取消动画绘制
   *
   * 取消一个先前通过调用window.requestAnimationFrame()方法添加到计划中的动画帧请求.
   * @param handel 取消回调的标识
   */
  // const cancelAnimationFrame =
  //   window.cancelAnimationFrame ||
  //   window.webkitCancelAnimationFrame ||
  //   (window as any).mozCancelAnimationFrame ||
  //   (window as any).oCancelAnimationFrame ||
  //   (window as any).msCancelAnimationFrame ||
  //   window.clearTimeout;

  const canUseCanvas = !!document.createElement('canvas').getContext;
  if (!canUseCanvas) {
    return;
  }

  const app = document.getElementById('app') as HTMLCanvasElement;
  const context = app.getContext('2d')!;

  /** 文字透明度 */
  let alpha = 0;
  /** 淡入还是淡出 */
  let isFadeIn = true;
  const text = 'Hello world!';
  /** hello world 背景图 */
  const hwImage = new Image();
  hwImage.src = 'bg-html5.jpg';

  /**
   * 绘制界面
   */
  function drawScreen() {
    // 背景
    context.globalAlpha = 1;
    context.fillStyle = '#000000';

    // 图像
    context.globalAlpha = .25;
    context.drawImage(hwImage, 0, 0);

    // 淡入淡出
    if (isFadeIn) {
      alpha += 0.1;
      if (alpha >= 1) {
        alpha = 1;
        isFadeIn = false;
      }
    } else {
      alpha -= .01;
      if (alpha < 0) {
        alpha = 0;
        isFadeIn = true;
      }
    }

    // 文本
    context.font = '72px _';
    context.textBaseline = 'top';
    context.globalAlpha = alpha;
    context.fillStyle = '#ffffff';
    context.fillText(text, 150, 200);
  }

  let count = 0;

  function mainLoop(time: number) {
    count++;
    console.log(time / count);
    requestAnimationFrame(mainLoop);
    drawScreen();
  }
  requestAnimationFrame(mainLoop);
});
