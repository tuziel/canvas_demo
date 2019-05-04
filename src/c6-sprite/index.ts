import '../lib/polyfill/requestAnimationFrame';

window.addEventListener('load', (): void => {
  // 判断兼容性
  const canUseCanvas = !!document.createElement('canvas').getContext;
  if (!canUseCanvas) {
    return;
  }

  // 获取canvas
  const app = document.getElementById('app') as HTMLCanvasElement;
  const context = app.getContext('2d')!;
  const appWidth = app.width;
  const appHeight = app.height;

  /** 步长 */
  const step = 100;
  /** 游戏时钟 */
  let gameTime = 0;
  /** 现实时钟 */
  let relaTime = 0;
  console.log(`游戏步长为: ${step}`);

  /** 游戏数据 */
  let count = 0;

  /**
   * 绘制背景
   */
  function drawBackground(): void {
    // 背景
    context.fillStyle = '#ffffaa';
    context.fillRect(0, 0, appWidth, appHeight);

    // 边框
    context.strokeStyle = '#000000';
    context.strokeRect(5, 5, appWidth - 10, appHeight - 10);
  }

  /**
   * 渲染数字
   *
   * @param detla 当前时间领先游戏时间的长度
   */
  function drawaNum(detla: number) {
    const text = (count + detla).toFixed(2);

    context.font = '40px sans-serif';
    context.fillStyle = '#000000';
    context.fillText(text, 20, 100);
    console.log(`！更新视图到: ${text}, 游戏时钟为: ${gameTime}, 现实时钟为: ${relaTime}`);
  }

  /**
   * 更新游戏
   */
  function update(): void {
    count += step;
    console.log(`更新数据到: ${count}, 游戏时钟为: ${gameTime}, 现实时钟为: ${relaTime}`);
  }

  /**
   * 渲染视图
   *
   * @param detla 当前时间领先游戏时间的长度
   */
  function render(detla: number): void {
    drawBackground();
    drawaNum(detla);
  }

  /** 主循环 */
  function mainLoop(time: number): void {
    relaTime = time;
    // 请求下一帧
    requestAnimationFrame(mainLoop);

    /** 上一帧到现在的时间间隔 */
    const detla = time - gameTime;
    /** 游戏更新次数 */
    let ticks = detla > step ? Math.floor(detla / step) : 0;
    /** 游戏时间流动 */
    gameTime += ticks * step;

    // 如果 ticks 过大则认为游戏睡着了
    if (ticks > 50) {
      return;
    }

    // 更新游戏
    while (ticks--) {
      update();
    }
    // 更新视图
    render(time - gameTime);
  }

  /** 初始化函数 */
  function init(time: number): void {
    // 初始化时钟
    gameTime = time;
    console.log(`游戏初始化, 当前时钟为: ${time}`);

    // 开始主循环
    mainLoop(time);
  }

  /** 入口函数 */
  (function main(): void {
    requestAnimationFrame(init);
  })();

});
