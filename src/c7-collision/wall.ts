import Ball from './balls';

export default class Wall implements ICollideObject2d {
  /** 起点的 X 坐标 */
  protected x: number;
  /** 起点的 Y 坐标 */
  protected y: number;
  /** 宽度 */
  protected width: number;
  /** 高度 */
  protected height: number;
  /** 外接圆半径的平方 */
  protected radiusSqua: number;
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
    this.radiusSqua = width * width + height * height;
  }

  public update() { /* nop*/ }

  /**
   * 渲染
   *
   * @param renderer
   */
  public render(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.fillStyle;
    context.translate(this.x, this.y);
    context.rotate(this.rotate);
    context.fillRect(0, 0, this.width, this.height);
    context.resetTransform();
  }

  /**
   * 设置起点
   *
   * @param x 起点的 X 坐标
   * @param y 起点的 Y 坐标
   */
  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  /**
   * 设置大小
   *
   * @param width 宽度
   * @param height 高度
   */
  public setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.radiusSqua = width * width + height * height;
  }

  /**
   * 设置大小
   *
   * @param width 宽度
   * @param height 高度
   */
  public setSizeOnly(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  public setRotate(rotate: number): void {
    this.rotate = rotate;
  }

  public getCollideData() {
    return {
      /** 起点的 X 坐标 */
      x: this.x,
      /** 起点的 Y 坐标 */
      y: this.y,
      /** 宽度 */
      width: this.width,
      /** 高度 */
      height: this.height,
      /** 外接圆半径的平方 */
      radiusSqua: this.radiusSqua,
      /** 旋转角度 */
      rotate: this.rotate,
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
