import '../style.css';
import '../lib/polyfill/requestAnimationFrame';
import Loop from '../lib/game/loop';
import Wall from './wall';
import Ball from './balls';

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

  // 常量
  const PI = Math.PI;
  const PI2 = PI * 2;
  const random = Math.random;

  /** 存放所有物件的列表 */
  const ballList: Ball[] = [];
  const wallList = [
    new Wall(5.5, 5.5, appWidth - 11, 0),
    new Wall(5.5, 5.5, 0, appHeight - 11),
    new Wall(appWidth - 5.5, 5.5, 0, appHeight - 11),
    new Wall(5.5, appHeight - 5.5, appWidth - 11, 0),
  ];

  let count = 50;
  while (count--) {
    const ball = new Ball(5 + random() * 10 >>> 0);
    ball.setArc(random() * PI2);
    ball.setSpeed((1 + random() * 14 >>> 0) / 10);

    do {
      ball.setPosition(random() * appWidth >>> 0, random() * appHeight >>> 0);
    } while (!canPutItDown(ball));
    ballList.push(ball);
  }

  function canPutItDown(ball: Ball): boolean {
    let length = ballList.length;
    while (length--) {
      if (ball.test(ballList[length])) {
        return false;
      }
    }
    return true;
  }

  /**
   * 绘制背景
   */
  function drawBackground(): void {
    // 背景
    context.fillStyle = '#ffffaa';
    context.fillRect(0, 0, appWidth, appHeight);
  }

  /**
   * 更新游戏
   */
  function updater(): void {
    let length = ballList.length;
    while (length--) {
      const ball = ballList[length];
      ball.update();
      let i = length;
      while (i--) {
        ball.test(ballList[i]) &&
          ball.collideBall(ballList[i]);
      }
    }
  }

  /**
   * 更新视图
   */
  function renderer(detla: number): void {
    drawBackground();
    let length = ballList.length;
    while (length--) {
      ballList[length].render(context, detla);
    }
    length = wallList.length;
    while (length--) {
      wallList[length].render(context);
    }
  }

  // 创建主循环
  const gameloop = new Loop();
  gameloop.update(updater);
  gameloop.render(renderer);
  gameloop.start();
});
