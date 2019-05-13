import Ball from './balls';

export default class Wall implements ICollideObject2d {
  /** 起点的 X 坐标 */
  protected x: number;
  /** 起点的 Y 坐标 */
  protected y: number;
  /** 中点的 X 坐标 */
  protected centerX: number;
  /** 中点的 Y 坐标 */
  protected centerY: number;
  /** 宽度 */
  protected width: number;
  protected halfWidth: number;
  /** 高度 */
  protected height: number;
  protected halfHeight: number;
  /** 旋转角度（暂时不管啦） */
  // protected rotate: number = 0;
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
    const halfWidth = this.halfWidth = width / 2;
    const halfHeight = this.halfHeight = height / 2;
    this.centerX = x + halfWidth;
    this.centerY = y + halfHeight;
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
   * 设置起点
   *
   * @param x 起点的 X 坐标
   * @param y 起点的 Y 坐标
   */
  public setPosition(x: number, y: number) {
    const detlaX = x - this.x;
    const detlaY = y - this.y;
    this.x = x;
    this.y = y;
    this.centerX += detlaX;
    this.centerY += detlaY;
  }

  /**
   * 设置起点
   *
   * @param x 起点的 X 坐标
   * @param y 起点的 Y 坐标
   */
  public setPositionOnly(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * 设置大小
   *
   * @param width 宽度
   * @param height 高度
   */
  public setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.centerX = this.x + width / 2;
    this.centerY = this.y + height / 2;
  }

  /**
   * 设置大小
   *
   * @param width 宽度
   * @param height 高度
   */
  public setSizeOnly(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public getCollideData(): {
    centerX: number,
    centerY: number,
    halfWidth: number,
    halfHeight: number,
  } {
    return {
      centerX: this.centerX,
      centerY: this.centerY,
      halfWidth: this.halfWidth,
      halfHeight: this.halfHeight,
    };
  }

  /**
   * 碰撞检测
   *
   * @param target 测试的目标
   */
  public test(target: IObject2d): boolean {
    if (target instanceof Ball) {
      return target.testWall(this);
    }
    return false;
  }

  /**
   * 撞击
   *
   * @param target 撞击目标
   */
  public collide(target: IObject2d): void {
    if (target instanceof Ball) {
      target.collideWall(this);
    }
  }
}
