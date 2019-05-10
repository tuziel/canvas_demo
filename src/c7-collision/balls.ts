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
  /** X 方向运动速度 */
  protected speedX: number = 1;
  /** Y 方向运动速度 */
  protected speedY: number = 0;
  /** 质量 */
  protected mass: number = 1;

  constructor(radius: number) {
    this.mass = this.radius = radius;
  }

  /**
   * 更新
   */
  public update(): void {
    const pos = this.getNextPosition(1);
    this.x = pos.x;
    this.y = pos.y;
  }

  /**
   * 渲染
   *
   * @param renderer
   */
  public render(context: CanvasRenderingContext2D, detla: number): void {
    const pos = this.getNextPosition(detla);
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
  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  /**
   * 获取下一个位置
   *
   * @param ticks 经过的 tick 数
   */
  public getNextPosition(ticks: number): { x: number, y: number } {
    return {
      x: this.x + this.speedX * ticks,
      y: this.y + this.speedY * ticks,
    };
  }

  /**
   * 设置速度
   *
   * @param speed 速度
   * @param onlySpeed 不设置速度分量
   */
  public setSpeed(speed: number, onlySpeed?: boolean): void {
    this.speed = speed;
    if (!onlySpeed) {
      this.speedX = speed * Math.cos(this.arc);
      this.speedY = speed * Math.sin(this.arc);
    }
  }

  /**
   * 设置速度分量
   *
   * @param speedX 速度 X 分量
   * @param speedY 速度 Y 分量
   */
  public setDecomposition(speedX: number, speedY: number): void {
    this.speedX = speedX;
    this.speedY = speedY;
  }

  /**
   * 设置运动方向
   *
   * @param arc 弧度
   * @param onlyArc 不设置速度分量
   */
  public setArc(arc: number, onlyArc?: boolean): void {
    this.arc = arc;
    if (!onlyArc) {
      const speed = this.speed;
      this.speedX = speed * Math.cos(this.arc);
      this.speedY = speed * Math.sin(this.arc);
    }
  }
}
