import '../lib/polyfill/requestAnimationFrame';
import Loop from '../lib/game/loop';
import ImageLoader from '../lib/loader/imageLoader';
// import PeriodAni from '../lib/animation/period';
import SpriteAni from '../lib/animation/sprite';

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

  const STEP = 10;
  const UP = 0;
  // const RIGHT = 1;
  // const DOWN = 2;
  // const LEFT = 3;

  const tank = {
    /** 坐标 X */
    x: 280,
    /** 坐标 Y */
    y: 280,
    /** 宽度 */
    sizeX: 32,
    /** 高度 */
    sizeY: 32,
    /** 方向 */
    dir: UP,
    /** 移动速度 */
    speed: 0.1,
  };

  /** 坦克动画 */
  // const tankSportAni = new PeriodAni(0, 10000);
  const tankSpriteAni = new SpriteAni(0, 200);
  // 添加雪碧图网格
  tankSpriteAni.push(32, 0, 32, 32);
  tankSpriteAni.push(64, 0, 32, 32);
  tankSpriteAni.push(96, 0, 32, 32);
  tankSpriteAni.push(128, 0, 32, 32);
  tankSpriteAni.push(160, 0, 32, 32);
  tankSpriteAni.push(192, 0, 32, 32);
  tankSpriteAni.push(224, 0, 32, 32);
  tankSpriteAni.push(0, 32, 32, 32);

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
   * 绘制坦克
   */
  function drawTank(detla: number, time: number) {
    const tankX = tank.x;
    const tankY = tank.y - detla * tank.speed / STEP;
    tankSpriteAni.render(time, (
      sourceX: number,
      sourceY: number,
      sizeX: number,
      sizeY: number,
    ) => {
      context.drawImage(tanks, sourceX, sourceY, sizeX, sizeY, tankX, tankY, 32, 32);
    });
  }

  /**
   * 更新游戏
   */
  function updater(): void {
    tank.y -= tank.speed;
  }

  /**
   * 更新视图
   */
  function renderer(detla: number, time: number): void {
    drawBackground();
    drawTank(detla, time);
  }

  // 等待图片加载完成
  tanksLoader.then(() => {
    // 创建主循环
    const gameloop = new Loop(STEP);
    gameloop.update(updater);
    gameloop.render(renderer);
  });
});
