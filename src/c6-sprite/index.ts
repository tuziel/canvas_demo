import '../lib/polyfill/requestAnimationFrame';
import Loop from '../lib/game/loop';
import ImageLoader from '../lib/loader/imageLoader';
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

  const tank = {
    x: 280,
    y: 280,
    relaX: 280,
    relaY: 280,
    sizeX: 32,
    sizeY: 32,
  };

  /** 坦克动画 */
  const tanksAni = new SpriteAni(0, 200, (
    sourceX: number,
    sourceY: number,
    sizeX: number,
    sizeY: number,
  ) => {
    context.drawImage(tanks, sourceX, sourceY, sizeX, sizeY, tank.relaX, tank.relaY, 32, 32);
  });
  // 添加雪碧图网格
  tanksAni.push(32, 0, 32, 32);
  tanksAni.push(64, 0, 32, 32);
  tanksAni.push(96, 0, 32, 32);
  tanksAni.push(128, 0, 32, 32);
  tanksAni.push(160, 0, 32, 32);
  tanksAni.push(192, 0, 32, 32);
  tanksAni.push(224, 0, 32, 32);
  tanksAni.push(0, 32, 32, 32);

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
    tank.relaX = tank.x;
    tank.relaY = tank.y - detla / 100;
    tanksAni.render(time);
  }

  /**
   * 更新游戏
   */
  function updater(): void {
    tank.y -= 1;
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
    const gameloop = new Loop(100);
    gameloop.update(updater);
    gameloop.render(renderer);
  });
});
