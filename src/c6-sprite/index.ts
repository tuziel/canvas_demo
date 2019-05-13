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

  /** 操作队列 */
  const commandQueue: Array<(time: number) => void> = [];

  // 加载图片
  const tanksLoader = new ImageLoader(require('./tanks_sheet.png'));
  const tanks = tanksLoader.getMedia();

  const STEP = 10;
  const PI = Math.PI;
  const RIGHT = 0;
  const DOWN = PI / 2;
  const LEFT = PI;
  const UP = PI * 3 / 2;

  /** 坦克对象 */
  const tank = {
    /** 坐标 X */
    x: 290,
    /** 坐标 Y */
    y: 290,
    /** 宽度 */
    sizeX: 32,
    /** 高度 */
    sizeY: 32,
    /** 宽度 */
    halfSizeX: 16,
    /** 高度 */
    halfSizeY: 16,
    /** 方向 */
    arc: UP,
    /** 移动速度 */
    speed: 0.1 * STEP,
    /**
     * 设置速度
     *
     * @param speed 速度
     */
    setSpeed(speed: number) {
      this.speed = speed;
    },
    /**
     * 转向
     *
     * @param arc 弧度
     */
    turn(arc: number) {
      this.arc = arc;
    },
  };

  /** 坦克动画 */
  const tankSpriteAni = new SpriteAni(0, 80);
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
   * 计算坦克位置
   *
   * @param speed 移动速度
   */
  function getTankPosition(speed: number): { x: number, y: number } {
    const tankX = tank.x + Math.cos(tank.arc) * speed;
    const tankY = tank.y + Math.sin(tank.arc) * speed;

    return {
      x: Math.min(Math.max(tankX, 5), appWidth - 5 - tank.sizeX),
      y: Math.min(Math.max(tankY, 5), appHeight - 5 - tank.sizeY),
    };
  }

  /**
   * 绘制坦克
   */
  function drawTank(detla: number, time: number): void {
    const pos = getTankPosition(detla * tank.speed);
    const halfSizeX = tank.halfSizeX;
    const halfSizeY = tank.halfSizeY;
    tankSpriteAni.render(time, (
      sourceX: number,
      sourceY: number,
      sizeX: number,
      sizeY: number,
    ) => {
      context.translate(pos.x + halfSizeX, pos.y + halfSizeY);
      context.rotate(tank.arc + PI / 2);
      context.drawImage(tanks, sourceX, sourceY, sizeX, sizeY, -halfSizeX, -halfSizeY, tank.sizeX, tank.sizeY);
      context.setTransform(1, 0, 0, 1, 0, 0);
    });
  }

  /**
   * 更新坦克数据
   */
  function updateTank(): void {
    const pos = getTankPosition(tank.speed);
    tank.x = pos.x;
    tank.y = pos.y;
  }

  /**
   * 更新操作
   *
   * @param 更新时间
   */
  function execCommand(time: number): void {
    let cmd;
    while ((cmd = commandQueue.shift())) {
      cmd(time);
    }
  }

  /**
   * 更新游戏
   */
  function updater(_ticks: number, time: number): void {
    updateTank();
    execCommand(time);
  }

  /**
   * 更新视图
   */
  function renderer(detla: number, time: number): void {
    drawBackground();
    drawTank(detla, time);
  }

  /**
   * 初始化键盘输入
   */
  function initEvent() {
    window.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 32: {
          commandQueue.push((time) => {
            tank.setSpeed(0.2 * STEP);
            tankSpriteAni.setPeriod(40, time);
          });
          break;
        }
        case 37: { commandQueue.push(() => tank.turn(LEFT)); break; }
        case 38: { commandQueue.push(() => tank.turn(UP)); break; }
        case 39: { commandQueue.push(() => tank.turn(RIGHT)); break; }
        case 40: { commandQueue.push(() => tank.turn(DOWN)); break; }
      }
    });
    window.addEventListener('keyup', (e) => {
      switch (e.keyCode) {
        case 32: {
          commandQueue.push((time) => {
            tank.setSpeed(0.1 * STEP);
            tankSpriteAni.setPeriod(80, time);
          });
          break;
        }
      }
    });
  }

  (function main(): void {
    initEvent();

    // 创建主循环
    const gameloop = new Loop(STEP);
    gameloop.update(updater);
    gameloop.render(renderer);

    // 等待图片加载完成
    tanksLoader.then(() => {
      gameloop.start();
    });
  })();
});
