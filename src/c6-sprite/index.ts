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
  const commandQueue: Array<() => void> = [];

  // 加载图片
  const tanksLoader = new ImageLoader(require('./tanks_sheet.png'));
  const tanks = tanksLoader.getMedia();

  const STEP = 800;
  const UP = 0;
  const RIGHT = 1;
  const DOWN = 2;
  const LEFT = 3;

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
    /** 方向 */
    dir: UP,
    /** 移动速度 */
    speed: 0.1 * STEP,
    /**
     * 转向
     *
     * @param dir 方向
     */
    turn(dir: 0 | 1 | 2 | 3) {
      this.dir = dir;
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
    let tankX = tank.x;
    let tankY = tank.y;

    switch (tank.dir) {
      case UP: { tankY -= speed; break; }
      case DOWN: { tankY += speed; break; }
      case RIGHT: { tankX += speed; break; }
      case LEFT: { tankX -= speed; break; }
    }

    return {
      x: Math.min(Math.max(tankX, 5), appWidth - 5),
      y: Math.min(Math.max(tankY, 5), appHeight - 5),
    };
  }

  /**
   * 绘制坦克
   */
  function drawTank(detla: number, time: number) {
    const pos = getTankPosition(detla * tank.speed / STEP);
    tankSpriteAni.render(time, (
      sourceX: number,
      sourceY: number,
      sizeX: number,
      sizeY: number,
    ) => {
      context.drawImage(tanks, sourceX, sourceY, sizeX, sizeY, pos.x, pos.y, 32, 32);
    });
  }

  /**
   * 更新坦克数据
   */
  function updateTank() {
    const pos = getTankPosition(tank.speed);
    tank.x = pos.x;
    tank.y = pos.y;
  }

  /** 更新操作 */
  function execCommand() {
    let cmd;
    while ((cmd = commandQueue.shift())) {
      cmd();
    }
  }

  /**
   * 更新游戏
   */
  function updater(): void {
    updateTank();
    execCommand();
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
        case 37: { commandQueue.push(() => tank.turn(LEFT)); break; }
        case 38: { commandQueue.push(() => tank.turn(UP)); break; }
        case 39: { commandQueue.push(() => tank.turn(RIGHT)); break; }
        case 40: { commandQueue.push(() => tank.turn(DOWN)); break; }
      }
    });
  }

  (function main() {
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
