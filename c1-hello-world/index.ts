window.addEventListener('load', (): void => {
  // 判断兼容性
  const canUseCanvas = !!document.createElement('canvas').getContext;
  if (!canUseCanvas) {
    return;
  }

  // 获取canvas
  const app = document.getElementById('app') as HTMLCanvasElement;
  const context = app.getContext('2d')!;

  // 背景
  context.fillStyle = '#ffffaa';
  context.fillRect(0, 0, 500, 300);
  context.fillStyle = '#000000';

  // 边框
  context.strokeStyle = '#000000';
  context.strokeRect(5, 5, 490, 290);

  // 文字
  context.font = '20px Sans-Serif';
  context.textBaseline = 'top';
  context.fillText('Hello World!', 195, 80);

  // 图片
  const hwImg = new Image();
  hwImg.addEventListener('load', () => {
    context.drawImage(hwImg, 160, 130);
  });
  hwImg.src = 'hello-world.jpg';
});
