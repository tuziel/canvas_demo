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

  /** 生成边框 */
  function createBorder(): void {
    objects.push(
      new Wall(0, 0, appWidth, 5),
      new Wall(0, 0, 5, appHeight),
      new Wall(appWidth - 5, 0, 5, appHeight),
      new Wall(0, appHeight - 5, appWidth, 5),
    );
  }

  /** 生成随机墙壁 */
  function createWalls(count: number): void {
    while (count--) {
      const wall = new Wall(0, 0, 20 + random() * 80 >>> 0, 20 + random() * 80 >>> 0);
      wall.setRotate(random() * PI2);
      wall.setStyle(`#${Array.from('      ', () => (Math.random() * 16).toString(16)[0]).join('')}`);

      do {
        wall.setPosition(random() * appWidth >>> 0, random() * appHeight >>> 0);
      } while (!canPutItDown(wall));
      objects.push(wall);
    }
  }

  /**
   * 生成若干个小球
   *
   * @param count 数量
   */
  function createBalls(count: number): void {
    while (count--) {
      const ball = new Ball(5 + random() * 10 >>> 0);
      ball.setArc(random() * PI2);
      ball.setSpeed((10 + random() * 25 >>> 0) / 10);
      ball.setStyle(`#${Array.from('      ', () => (Math.random() * 16).toString(16)[0]).join('')}`);

      do {
        ball.setPosition(random() * appWidth >>> 0, random() * appHeight >>> 0);
      } while (!canPutItDown(ball));
      objects.push(ball);
    }
  }

  /** 检测物件是否有空间被放置 */
  function canPutItDown(object: ICollideObject2d): boolean {
    let length = objects.length;
    while (length--) {
      if (object.testCollide(objects[length])) {
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
    context.fillStyle = '#ffc6c6';
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
        object.testCollide(objects[i], true);
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

  (function main(): void {
    // 创建对象
    createBorder();
    createWalls(10);
    createBalls(100);

    // 创建主循环
    const gameloop = new Loop();
    gameloop.update(updater);
    gameloop.render(renderer);
    gameloop.start();
  })();
});
