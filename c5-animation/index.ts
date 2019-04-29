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
    comman: (a: any, b: any) => void,
    args: [any, any];
  }> = [];

  // 缓存
  const x = appWidth / 2;
  const y = appHeight / 2;
  const radius = 100;

  /** 圆周运动动画 */
  const aniCircle = new Ani(0, +$period.value || 0, (phase: number) => {
    const theta = Math.PI * 2 * phase;
    const x2 = x + radius * Math.cos(theta);
    const y2 = y + radius * Math.sin(theta);
    context.fillStyle = '#000000';
    context.fillRect(x2, y2, 5, 5);
  });

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
    $pause.addEventListener('click', () => {
      commanQueue.push({
        comman: aniCircle.pause.bind(aniCircle),
        args: ['$time', null],
      });
    });
    $start.addEventListener('click', () => {
      commanQueue.push({
        comman: aniCircle.start.bind(aniCircle),
        args: ['$time', null],
      });
    });
    $reset.addEventListener('click', () => {
      commanQueue.push({
        comman: aniCircle.reset.bind(aniCircle),
        args: ['$time', null],
      });
    });
    $period.addEventListener('change', () => {
      const period = +$period.value || 0;
      commanQueue.push({
        comman: aniCircle.setPeriod.bind(aniCircle),
        args: [period, '$time'],
      });
    });
  }

  /** 执行操作队列 */
  function execCommanQueue(time: number): void {
    let comman;
    while ((comman = commanQueue.pop())) {
      // XXX: 好吧我承认这段写得很垃圾，以后学完命令模式再看看怎么优化吧
      const args = comman.args;
      const a = args[0] === '$time' ? time : args[0];
      const b = args[1] === '$time' ? time : args[1];
      comman.comman(a, b);
    }
  }

  function mainLoop(time: number): void {
    requestAnimationFrame(mainLoop);
    execCommanQueue(time);
    drawBackground();
    aniCircle.render(time);
  }

  (function main(): void {
    initForm();
    requestAnimationFrame(mainLoop);
  })();

});
