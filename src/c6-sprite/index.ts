import '../lib/polyfill/requestAnimationFrame';
// import Loop from '../lib/game/loop';
// import ImageLoader from '../lib/loader/imageLoader';
import Rect from '../lib/objects/rectangle';
import StrokeRect from '../lib/objects/decorator/strokeRect';

window.addEventListener('load', (): void => {
  // 判断兼容性
  const canUseCanvas = !!document.createElement('canvas').getContext;
  if (!canUseCanvas) {
    return;
  }

  // 获取canvas
  const app = document.getElementById('app') as HTMLCanvasElement;
  const context = app.getContext('2d')!;
  // const appWidth = app.width;
  // const appHeight = app.height;

  // const gameloop = new Loop();

  const rect = new StrokeRect(
    new Rect(10, 10, 100, 100, 'red'),
    'green',
  );
  rect.render(context);
});
