export default class Wall implements ICollideObject2d {
  /** 起点的 X 坐标 */
  protected x: number;
  /** 起点的 Y 坐标 */
  protected y: number;
  /** 宽度 */
  protected width: number;
  /** 高度 */
  protected height: number;
  /** 旋转角度 */
  protected rotate: number = 0;
  /** 填充样式 */
  protected fillStyle: string | CanvasGradient | CanvasPattern = '#000000';

  /**
   * 创建一面墙
   *
   * @param x 起点的 X 坐标
   * @param y 起点的 Y 坐标
   * @param width 宽度
   * @param height 高度
   */
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * 渲染
   *
   * @param renderer
   */
  public render(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.fillStyle;
    context.strokeRect(this.x, this.y, this.width, this.height);
  }

  /**
   * 碰撞检测
   *
   * @param target 测试的目标
   */
  public test(_target: IObject2d): boolean {
    // TODO: 检测与球的碰撞
    return false;
  }
}
