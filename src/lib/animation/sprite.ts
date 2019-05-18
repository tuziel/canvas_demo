import PeriodAni from './period';

type SpriteImage = HTMLImageElement | ImageBitmap;

const createBitmap =
  window.createImageBitmap ||
  ((image: HTMLImageElement, sx: number, sy: number, sw: number, sh: number) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = sw;
    canvas.height = sh;
    context.drawImage(image, -sx, -sy, image.width, image.height);
    const grid = new Image();
    grid.src = canvas.toDataURL();

    return {
      then: (callback: (sprite: SpriteImage) => void): void => {
        callback(grid);
      },
    };
  });

export default class SpriteAni extends PeriodAni {
  /** 网格 */
  protected grids: SpriteImage[] = [];
  /** 图源 */
  protected origin: HTMLImageElement;

  /**
   * 创建雪碧图动画
   *
   * @param startStamp 动画开始时间
   * @param frames 帧长度
   */
  constructor(
    startStamp: number,
    frames: number,
    origin: HTMLImageElement,
  ) {
    super(startStamp, frames);
    this.origin = origin;
  }

  /**
   * 添加网格
   *
   * @param sourceX 网格开始坐标 X
   * @param sourceY 网格开始坐标 Y
   * @param sizeX 网格宽度
   * @param sizeY 网格高度
   */
  public push(
    sourceX: number,
    sourceY: number,
    sizeX: number,
    sizeY: number,
  ) {
    createBitmap(this.origin, sourceX, sourceY, sizeX, sizeY)
      .then((grid) => {
        this.grids.push(grid);
      });
  }

  /**
   * 渲染动画帧
   *
   * @param time 当前时间
   * @param callback 渲染回调
   */
  public render(
    time: number,
    callback: (phase: number, sprite: SpriteImage) => void,
  ): void {
    if (!this.state) {
      time = this.pauseStamp;
    }
    const phase = PeriodAni.getPhase(this.period, this.startStamp, time);
    const period = phase >>> 0;
    const sprite = this.grids[period % this.grids.length];
    callback(phase, sprite);
  }
}
