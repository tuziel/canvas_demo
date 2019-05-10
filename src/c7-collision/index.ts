import '../lib/polyfill/requestAnimationFrame';
import Loop from '../lib/game/loop';
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

  let count = 10;
  while (count--) {
    const ball = new Ball(5 + random() * 10 >>> 0);
    ball.setPosition(random() * appWidth >>> 0, random() * appHeight >>> 0);
    ball.setArc(random() * PI2);
    ball.setSpeed(0.1 + random() * 1.1);
    ballList.push(ball);
  }

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
   * 更新游戏
   */
  function updater(): void {
    let length = ballList.length;
    while (length--) {
      ballList[length].update();
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
  }

  // 创建主循环
  const gameloop = new Loop();
  gameloop.update(updater);
  gameloop.render(renderer);
  gameloop.start();
});
