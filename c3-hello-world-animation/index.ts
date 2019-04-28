window.addEventListener('load', (): void => {
  /** 打开页面的时间戳 */
  const __TIMESTAMP__ = +new Date();

  /**
   * 请求动画绘制
   *
   * 要求浏览器在下次重绘之前调用指定的回调函数更新动画
   * XXX: 可以使用订阅发布模式避免开多个定时器
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

  const elmFps = document.getElementById('fps') as HTMLDivElement;
  /** 时间戳取样个数 */
  const sampling = 50;
  /** 记录之前渲染时的时间戳 */
  const timestampList: number[] = new Array(sampling).fill(Infinity);
  /** 当前时间戳指针 */
  let pointer = 0;
  /**
   * 特定值
   *
   * 1000 / ((end - start) / (sampling - 1)) 的优化 =>
   * 1000 * (sampling - 1) / (end - start)
   */
  const detla = 1000 * (sampling - 1);

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
  function drawScreen(): void {
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
    context.font = '72px serif';
    context.textBaseline = 'top';
    context.globalAlpha = alpha;
    context.fillStyle = '#ffffff';
    context.fillText(text, 150, 200);
  }

  /**
   * @param time 主循环
   *
   * XXX: 没有分离计算和渲染，不同设备表现不一致（如144HZ屏）
   */
  function mainLoop(time: number): void {
    // 计算帧数
    const end = timestampList[pointer] = time;
    if (++pointer >= sampling) {
      pointer = 0;
    }
    const start = timestampList[pointer];
    const fps = detla / (end - start);
    elmFps.innerText = `FPS: ${fps.toFixed(1)}`;

    requestAnimationFrame(mainLoop);
    drawScreen();
  }

  /**
   * 开始主循环
   */
  requestAnimationFrame(mainLoop);
});
