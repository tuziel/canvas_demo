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
  const step = 10;
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
   * 更新数字
   */
  function updateCount() {
    count += step;
    console.log(`更新数据到: ${count}, 游戏时钟为: ${gameTime}, 现实时钟为: ${relaTime}`);
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
    gameTime += step;
    updateCount();
  }

  /**
   * 更新视图
   */
  function render(): void {
    const detla = relaTime - gameTime;
    drawBackground();
    drawaNum(detla);
  }

  /** 主循环 */
  function mainLoop(time: number): void {
    // 请求下一帧
    requestAnimationFrame(mainLoop);

    /** 上一帧到现在的时间间隔 */
    const detla = time - gameTime;
    /** 游戏更新次数 */
    let ticks = detla > step ? Math.floor(detla / step) : 0;

    // 如果 ticks 过大则认为游戏处于休眠状态
    if (ticks > 50) {
      gameTime = time - (relaTime - gameTime);
      console.log(`游戏休眠, 游戏时钟: ${gameTime}, 现实时钟: ${time}`);
      return;
    }
    relaTime = time;
    console.log(`loop! 游戏时钟: ${gameTime}, 现实时钟: ${relaTime}`);

    // 更新游戏
    while (ticks--) {
      update();
    }
    // 更新视图
    render();
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
