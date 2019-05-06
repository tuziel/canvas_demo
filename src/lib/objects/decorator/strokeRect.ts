import Rectangle from '../rectangle';

export default class StrokeRect extends Rectangle {
  /** 要装饰的对象 */
  protected object: Rectangle;
  /** 填充样式 */
  protected strokeStyle: string | CanvasGradient | CanvasPattern;

  constructor(object: Rectangle, style: string | CanvasGradient | CanvasPattern) {
    super(0, 0, 0, 0);
    this.object = object;
    this.strokeStyle = style;
  }

  /**
   * 渲染物件
   *
   * @param context 要渲染的上下文
   */
  public render(context: CanvasRenderingContext2D): void {
    const position = this.getPosition();
    const size = this.getSize();
    context.strokeStyle = this.strokeStyle;
    this.object.render(context);
    context.strokeRect(position.x, position.y, size.width, size.height);
  }

  /**
   * 获取矩形宽高
   */
  public getSize(): { width: number, height: number } {
    return this.object.getSize();
  }

  /**
   * 设置矩形宽高
   *
   * @param width 矩形的宽度
   * @param height 矩形的高度
   */
  public setSize(width: number, height: number): void {
    this.object.setSize(width, height);
  }

  /**
   * 获取矩形起点
   */
  public getPosition(): { x: number, y: number } {
    return this.object.getPosition();
  }

  /**
   * 设置矩形起点
   *
   * @param width 矩形起点的 x 轴坐标
   * @param height 矩形起点的 y 轴坐标
   */
  public setPosition(x: number, y: number): void {
    this.object.setPosition(x, y);
  }

  /**
   * 设置描边样式
   *
   * @param style 描边样式
   */
  public setStyle(style: string | CanvasGradient | CanvasPattern): void {
    this.strokeStyle = style;
  }
}
