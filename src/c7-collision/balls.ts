const PI2 = Math.PI * 2;

export default class Ball {
  /** 半径 */
  protected radius: number;
  /** 中心点坐标 X */
  protected x: number = 0;
  /** 中心点坐标 Y */
  protected y: number = 0;
  /** 运动方向弧度 */
  protected arc: number = 0;
  /** 运动速度 */
  protected speed: number = 1;

  constructor(radius: number) {
    this.radius = radius;
  }

  /**
   * 更新
   */
  public update(): void {
    const pos = this.getNextPosition(this.speed);
    this.x = pos.x;
    this.y = pos.y;
  }

  /**
   * 渲染
   *
   * @param renderer
   */
  public render(context: CanvasRenderingContext2D, detla: number): void {
    const pos = this.getNextPosition(this.speed * detla);
    context.beginPath();
    context.arc(pos.x, pos.y, this.radius, 0, PI2, true);
    context.closePath();
    context.fillStyle = '#000000';
    context.fill();
  }

  /**
   * 设置中心点坐标
   *
   * @param x 中心点坐标 X
   * @param y 中心点坐标 Y
   */
  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * 获取下一个位置
   *
   * @param speed 速度
   */
  public getNextPosition(speed: number) {
    return {
      x: this.x + Math.cos(this.arc) * speed,
      y: this.y + Math.sin(this.arc) * speed,
    };
  }

  /**
   * 设置速度
   *
   * @param speed 速度
   */
  public setSpeed(speed: number): void {
    this.speed = speed;
  }

  /**
   * 设置运动方向
   *
   * @param arc 弧度
   */
  public setArc(arc: number): void {
    this.arc = arc;
  }
}
