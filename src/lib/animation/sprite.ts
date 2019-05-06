import PeriodAni from './period';

export default class SpriteAni extends PeriodAni {
  /** 网格 */
  protected grids: Array<[number, number, number, number]> = [];

  /**
   * 渲染回调
   *
   * @param sourceX 网格开始坐标 X
   * @param sourceY 网格开始坐标 Y
   * @param sizeX 网格宽度
   * @param sizeY 网格高度
   */
  protected spriteRenderer: (
    sourceX: number,
    sourceY: number,
    sizeX: number,
    sizeY: number,
  ) => void;

  /**
   * 创建雪碧图动画
   *
   * @param startStamp 动画开始时间
   * @param frames 帧长度
   * @param periodRenderer 渲染回调
   */
  constructor(
    startStamp: number,
    frames: number,
    spriteRenderer: (
      sourceX: number,
      sourceY: number,
      sizeX: number,
      sizeY: number,
    ) => void,
  ) {
    super(startStamp, frames, SpriteAni.prototype.render);
    this.spriteRenderer = spriteRenderer;
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
    this.grids.push([sourceX, sourceY, sizeX, sizeY]);
  }

  /**
   * 渲染动画帧
   *
   * @param time 当前时间
   */
  public render(time: number): void {
    if (!this.state) {
      time = this.pauseStamp;
    }
    const period = PeriodAni.getPhase(this.period, this.startStamp, time) >>> 0;
    const sprite = this.grids[period % this.grids.length];
    this.spriteRenderer(sprite[0], sprite[1], sprite[2], sprite[3]);
  }
}
