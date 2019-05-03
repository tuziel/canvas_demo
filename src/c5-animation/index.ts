import PeriodAni from '../lib/animation/period';
import '../lib/polyfill/polyfillRAF';

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

  // 控件元素
  const $pause = document.getElementById('iPause') as HTMLInputElement;
  const $start = document.getElementById('iStart') as HTMLInputElement;
  const $reset = document.getElementById('iReset') as HTMLInputElement;
  const $period = document.getElementById('iPeriod') as HTMLInputElement;
  /** 操作队列 */
  const commanQueue: Array<{
    name: 'start' | 'pause' | 'reset' | 'setPeriod',
    payload?: any,
  }> = [];

  // 缓存
  const x = appWidth / 2;
  const y = appHeight / 2;
  const radius = 100;

  /** 圆周运动动画 */
  const aniCircle = new PeriodAni(0, +$period.value || 1000, (phase: number) => {
    const theta = Math.PI * 2 * phase;
    const x2 = x + radius * Math.cos(theta);
    const y2 = y + radius * Math.sin(theta);
    context.fillStyle = '#000000';
    context.fillRect(x2, y2, 5, 5);
  });
  aniCircle.pause(0);

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
   * 初始化控件
   */
  function initForm(): void {
    // 只把操作加入队列，下次渲染时再操作
    $pause.addEventListener('click', () => commanQueue.push({ name: 'pause' }));
    $start.addEventListener('click', () => commanQueue.push({ name: 'start' }));
    $reset.addEventListener('click', () => commanQueue.push({ name: 'reset' }));
    $period.addEventListener('change', () => {
      const period = +$period.value || 0;
      commanQueue.push({
        name: 'setPeriod',
        payload: period,
      });
    });
  }

  /** 执行操作队列 */
  function execCommanQueue(time: number): void {
    let comman;
    while ((comman = commanQueue.pop())) {
      switch (comman.name) {
        case 'pause':
        case 'reset':
        case 'start': {
          aniCircle[comman.name](time);
          break;
        }
        case 'setPeriod': {
          aniCircle.setPeriod(comman.payload, time);
          break;
        }
      }
    }
  }

  function mainLoop(time: number): void {
    execCommanQueue(time);
    drawBackground();
    aniCircle.render(time);
    requestAnimationFrame(mainLoop);
  }

  function init(time: number): void {
    initForm();
    aniCircle.start(time);
    mainLoop(time);
  }

  (function main(): void {
    requestAnimationFrame(init);
  })();

});
