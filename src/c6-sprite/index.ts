import '../lib/polyfill/requestAnimationFrame';
// import Loop from '../lib/game/loop';
import ImageLoader from '../lib/loader/imageLoader';

window.addEventListener('load', (): void => {
  // 判断兼容性
  const canUseCanvas = !!document.createElement('canvas').getContext;
  if (!canUseCanvas) {
    return;
  }

  // 获取canvas
  // const app = document.getElementById('app') as HTMLCanvasElement;
  // const context = app.getContext('2d')!;
  // const appWidth = app.width;
  // const appHeight = app.height;

  // const gameloop = new Loop();

  new ImageLoader(require('./tanks_sheet.png'))
    .use((image) => {
      document.body.append(image);
    });
});
