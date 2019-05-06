export default class Rectangle implements IObject2d {
  /** 矩形起点的 x 轴坐标 */
  protected x: number;
  /** 矩形起点的 y 轴坐标 */
  protected y: number;
  /** 矩形的宽度 */
  protected width: number;
  /** 矩形的高度 */
  protected height: number;
  /** 填充样式 */
  protected fillStyle: string | CanvasGradient | CanvasPattern;

  /**
   * 创建一个矩形
   * @param x 矩形起点的 x 轴坐标
   * @param y 矩形起点的 y 轴坐标
   * @param width 矩形的宽度
   * @param height 矩形的高度
   * @param style 填充样式
   */
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    style: string | CanvasGradient | CanvasPattern = '#000000',
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fillStyle = style;
  }

  /**
   * 渲染物件
   *
   * @param context 要渲染的上下文
   */
  public render(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.fillStyle;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  /**
   * 获取矩形宽高
   */
  public getSize(): { width: number, height: number } {
    return {
      width: this.width,
      height: this.height,
    };
  }

  /**
   * 设置矩形宽高
   *
   * @param width 矩形的宽度
   * @param height 矩形的高度
   */
  public setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  /**
   * 获取矩形起点
   */
  public getPosition(): { x: number, y: number } {
    return {
      x: this.x,
      y: this.y,
    };
  }

  /**
   * 设置矩形起点
   *
   * @param width 矩形起点的 x 轴坐标
   * @param height 矩形起点的 y 轴坐标
   */
  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  /**
   * 设置填充样式
   * @param style 填充样式
   */
  public setStyle(style: string | CanvasGradient | CanvasPattern): void {
    this.fillStyle = style;
  }
}
