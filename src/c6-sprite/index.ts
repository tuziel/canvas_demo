import '../lib/polyfill/requestAnimationFrame';
import Loop from '../lib/game/loop';
import ImageLoader from '../lib/loader/imageLoader';

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

  // 加载图片
  const tanksLoader = new ImageLoader(require('./tanks_sheet.png'));
  const tanks = tanksLoader.getMedia();

  // 游戏步长
  const step = 10;

  // 坦克的数据
  const frameX = [32, 64, 96, 128, 160, 192, 224, 0];
  const frameY = [0, 0, 0, 0, 0, 0, 0, 32];
  let frameCounter = 0;

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

  // 绘制坦克
  function drawTank(detla: number) {
    const frameIndex = (frameCounter + detla / step >>> 0) % 8;
    context.drawImage(tanks,
      frameX[frameIndex], frameY[frameIndex], 32, 32,
      50, 50, 256, 256,
    );
  }

  /**
   * 更新游戏
   */
  function updater(ticks: number): void {
    frameCounter += +!(ticks % 6);
  }

  /**
   * 更新视图
   */
  function renderer(detla: number): void {
    drawBackground();
    drawTank(detla);
  }

  // 等待图片加载完成
  tanksLoader.then(() => {
    // 创建主循环
    const gameloop = new Loop();
    gameloop.update(updater);
    gameloop.render(renderer);
  });
});
