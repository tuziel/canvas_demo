import './index.css';
import '../lib/polyfill/requestAnimationFrame';

window.addEventListener('load', (): void => {
  const canUseCanvas = !!document.createElement('canvas').getContext;
  if (!canUseCanvas) {
    return;
  }

  const app = document.getElementById('app') as HTMLCanvasElement;
  const context = app.getContext('2d')!;

  // 表单
  const $createImageData = document.getElementById('createImageData') as HTMLInputElement;
  const $imageData = document.getElementById('imageData') as HTMLTextAreaElement;
  /** 表单项数据 */
  const data: { [key: string]: string } = {
    iText: '',
    iFont: '',
    iFontWeight: '',
    iFontStyle: '',
    iFontSize: '',
    iFillType: '',
    iColor: '',
    iColor2: '',
    iStrokeType: '',
    iStrokeColor: '',
    iStrokeColor2: '',
    iTextBaseline: '',
    iTextAling: '',
    iAlpha: '',
    iShadowX: '',
    iShadowY: '',
    iShadowBlur: '',
    iShadowColor: '',
  };

  /** 文字背景图 */
  const pattern = new Image();
  /** 动画周期 */
  const period = 3000;

  /**
   * 表单项发生变化
   * @param e 事件
   */
  function formItemChange(e: Event) {
    const target = (e.target as any);
    const id = target.id as keyof typeof data;

    data[id] = target.value;
  }

  /**
   * 初始化表单
   */
  function initForm(): void {
    for (const item in data) {
      if (data.hasOwnProperty(item)) {
        const $el = document.getElementById(item) as HTMLInputElement;
        // 监听变化
        $el.addEventListener('change', formItemChange);
        // 初始化数据
        data[item as keyof typeof data] = $el.value;
      }
    }
  }

  /**
   * 绘制界面
   */
  function drawScreen(time: number): void {
    // 缓存
    const text = data.iText;
    const color = data.iColor;
    const color2 = data.iColor2;
    const StrokeColor = data.iStrokeColor;
    const StrokeColor2 = data.iStrokeColor2;
    const fontSize = +data.iFontSize;
    /** 周期中的位置 */
    const phase = time % period / period;

    // 背景
    context.globalAlpha = 1;
    context.shadowColor = '#707070';
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;
    context.fillStyle = '#ffffaa';
    context.fillRect(0, 0, 500, 300);

    // 边框
    context.strokeStyle = '#000000';
    context.strokeRect(5, 5, 490, 290);

    // 文本
    context.textBaseline = data.iTextBaseline as CanvasTextBaseline;
    context.textAlign = data.iTextAling as CanvasTextAlign;
    context.font = `${data.iFontStyle} ${data.iFontWeight} ${fontSize}px ${data.iFont}`;
    context.shadowColor = data.iShadowColor;
    context.shadowOffsetX = +data.iShadowX;
    context.shadowOffsetY = +data.iShadowY;
    context.shadowBlur = +data.iShadowBlur;
    context.globalAlpha = +data.iAlpha;

    /** 文本信息 */
    const metrics = context.measureText(text);
    const textWidth = metrics.width;
    const textWidthHalf = textWidth / 2;
    const x = app.width / 2;
    const y = app.height / 2;
    const theta = Math.PI * 2 * phase;
    const x2 = x + textWidthHalf * Math.cos(theta);
    const y2 = y + textWidthHalf * Math.sin(theta);

    // 填充
    let style;
    switch (data.iFillType) {
      case 'linearGradient': {
        style = context.createLinearGradient(x, y, x2, y2);
        style.addColorStop(0, color);
        style.addColorStop(1, color2);
        break;
      } case 'radialGradient': {
        style = context.createRadialGradient(x, y, 0, x2, y2, textWidth);
        style.addColorStop(0, color);
        style.addColorStop(1, color2);
        break;
      } case 'pattern': {
        style = context.createPattern(pattern, 'repeat')!;
        break;
      } default: {
        style = color;
      }
    }
    context.fillStyle = style;
    context.fillText(text, x, y);

    if (data.iStrokeType) {
      // 描边
      switch (data.iStrokeType) {
        case 'linearGradient': {
          style = context.createLinearGradient(x, y, x2, y2);
          style.addColorStop(0, StrokeColor);
          style.addColorStop(1, StrokeColor2);
          break;
        } case 'radialGradient': {
          style = context.createRadialGradient(x, y, 0, x2, y2, textWidth);
          style.addColorStop(0, StrokeColor);
          style.addColorStop(1, StrokeColor2);
          break;
        } case 'pattern': {
          style = context.createPattern(pattern, 'repeat')!;
          break;
        } default: {
          style = StrokeColor;
        }
      }
      context.strokeStyle = style;
      context.strokeText(text, x, y);
    }
  }

  /**
   * 点击导出
   * @param e 事件
   */
  function createImageDataPressed(): void {
    const $a = document.createElement('a');
    $a.download = '画布';
    $a.href = $imageData.innerText = app.toDataURL();
    $a.click();
  }

  function mainLoop(time: number): void {
    requestAnimationFrame(mainLoop);
    drawScreen(time);
  }

  (function main(): void {
    $createImageData.addEventListener('click', createImageDataPressed);
    pattern.addEventListener('load', () => requestAnimationFrame(mainLoop));
    pattern.src = require('./noise.png');
    initForm();
  })();

});
