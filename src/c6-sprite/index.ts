import '../lib/polyfill/requestAnimationFrame';
import Loop from '../lib/game/loop';

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
  }

  const gameloop = new Loop(step);
  gameloop.update(() => {
    updateCount();
  });
  gameloop.render((detla) => {
    drawBackground();
    drawaNum(detla);
  });
});
