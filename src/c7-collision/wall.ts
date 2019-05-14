import Ball from './balls';

const min = Math.min;
const max = Math.max;
const cos = Math.cos;
const sin = Math.sin;

export default class Wall implements ICollideObject2d {
  /** 起点的 X 坐标 */
  protected x: number;
  /** 起点的 Y 坐标 */
  protected y: number;
  /** 宽度 */
  protected width: number;
  /** 高度 */
  protected height: number;
  /** 最高点 */
  protected outerTop: number = 0;
  /** 最右点 */
  protected outerRight: number = 0;
  /** 最低点 */
  protected outerBottom: number = 0;
  /** 最左点 */
  protected outerLeft: number = 0;
  /** 旋转角度 */
  protected rotate: number = 0;
  /** 填充样式 */
  protected fillStyle: string | CanvasGradient | CanvasPattern = '#000000';

  /** 碰撞记录 */
  protected record: [ICollideObject2d[], ICollideObject2d[]] = [[], []];
  protected recordIndex: number = 0;

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
    this.resetOuter();
  }

  public update(): void {
    this.swapRecord();
  }

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
    context.setTransform(1, 0, 0, 1, 0, 0);
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
    this.resetOuter();
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
    this.resetOuter();
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

  /**
   * 设置旋转角度
   *
   * @param rotate 旋转角
   */
  public setRotate(rotate: number): void {
    this.rotate = rotate;
    this.resetOuter();
  }

  /**
   * 设置填充样式
   *
   * @param style  填充样式
   */
  public setStyle(style: string | CanvasGradient | CanvasPattern): void {
    this.fillStyle = style;
  }

  /**
   * 获取用于计算碰撞的数据
   */
  public getCollideData(): { [x: string]: number } {
    return {
      /** 起点的 X 坐标 */
      x: this.x,
      /** 起点的 Y 坐标 */
      y: this.y,
      /** 宽度 */
      width: this.width,
      /** 高度 */
      height: this.height,
      /** 旋转角度 */
      rotate: this.rotate,
      /** 最高点 */
      outerTop: this.outerTop,
      /** 最右点 */
      outerRight: this.outerRight,
      /** 最低点 */
      outerBottom: this.outerBottom,
      /** 最左点 */
      outerLeft: this.outerLeft,
    };
  }

  /**
   * 碰撞检测
   *
   * @param target 测试的目标
   */
  public test(target: IObject2d, effect?: boolean): boolean {
    if (target instanceof Ball) {
      return target.testWall(this, effect);
    }
    return false;
  }

  /**
   * 记录碰撞过的物件
   *
   * @param object 物件
   */
  public setRecord(object: ICollideObject2d): void {
    this.record[this.recordIndex].push(object);
  }

  /**
   * 检查是否在上一次更新时碰撞过
   *
   * @param object 物件
   */
  public hasRecord(object: ICollideObject2d): boolean {
    return this.record[1 - this.recordIndex].indexOf(object) >= 0;
  }

  /**
   * 交换记录表
   */
  protected swapRecord(): void {
    this.recordIndex = 1 - this.recordIndex;
    this.record[this.recordIndex].length = 0;
  }

  /**
   * 重置AABB盒
   */
  protected resetOuter(): void {
    const cosTheta = cos(this.rotate);
    const sinTheta = sin(this.rotate);
    const relativeBX = this.width * cosTheta;
    const relativeBY = this.width * sinTheta;
    const relativeDX = -(this.height * sinTheta);
    const relativeDY = this.height * cosTheta;
    const relativeCX = relativeBX + relativeDX;
    const relativeCY = relativeBY + relativeDY;
    this.outerTop = this.y + min(0, min(relativeBY, min(relativeCY, min(relativeDY))));
    this.outerRight = this.x + max(0, max(relativeBX, max(relativeCX, max(relativeDX))));
    this.outerBottom = this.y + max(0, max(relativeBY, max(relativeCY, max(relativeDY))));
    this.outerLeft = this.x + min(0, min(relativeBX, min(relativeCX, min(relativeDX))));
  }
}
