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

  /** 物件 */
  const objects: ICollideObject2d[] = [];

  /** 生成墙壁 */
  function createWalls() {
    objects.push(
      new Wall(5, 5, appWidth - 10, 1),
      new Wall(5, 5, 1, appHeight - 10),
      new Wall(appWidth - 5, 5, 1, appHeight - 10),
      new Wall(5, appHeight - 5, appWidth - 10, 1),
      // ((ball) => {
      //   ball.setRotate(PI * 2 / 3);
      //   return ball;
      // })(new Wall(380.5, 180.5, 20, 140)),
    );
  }

  /**
   * 生成若干个小球
   *
   * @param count 数量
   */
  function createBalls(count: number) {
    while (count--) {
      const ball = new Ball(5 + random() * 10 >>> 0);
      ball.setArc(random() * PI2);
      ball.setSpeed((1 + random() * 14 >>> 0) / 10);

      do {
        ball.setPosition(random() * appWidth >>> 0, random() * appHeight >>> 0);
      } while (!canPutItDown(ball));
      objects.push(ball);
    }
  }

  /** 检测小球是否有空间被放置 */
  function canPutItDown(ball: Ball): boolean {
    let length = objects.length;
    while (length--) {
      if (ball.test(objects[length])) {
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
    let length = objects.length;
    while (length--) {
      const object = objects[length];
      object.update();
      let i = length;
      while (i--) {
        object.test(objects[i]) &&
          object.collide(objects[i]);
      }
    }
  }

  /**
   * 更新视图
   */
  function renderer(detla: number): void {
    drawBackground();
    let length = objects.length;
    while (length--) {
      objects[length].render(context, detla);
    }
  }

  (function main() {
    // 创建对象
    createWalls();
    createBalls(50);

    // 创建主循环
    const gameloop = new Loop();
    gameloop.update(updater);
    gameloop.render(renderer);
    gameloop.start();
  })();
});
