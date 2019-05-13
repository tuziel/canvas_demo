const cos = Math.cos;
const sin = Math.sin;
const sqrt = Math.sqrt;
const atan2 = Math.atan2;
const PI = Math.PI;
const PI2 = PI * 2;

export default class Ball implements ISportObject2d, ICollideObject2d {
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

  /**
   * 创建一个球体
   *
   * @param radius 半径
   */
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
   */
  public setSpeed(speed: number): void {
    this.speed = speed;
    // 修正速度分量
    this.speedX = speed * cos(this.arc);
    this.speedY = speed * sin(this.arc);
  }

  /**
   * 设置速度
   *
   * @param speed 速度
   */
  public setSpeedOnly(speed: number): void {
    this.speed = speed;
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
    // 修正总速度
    this.speed = sqrt(speedX * speedX + speedY * speedY);
    // 修正角度
    this.arc = atan2(speedY, speedX);
  }

  /**
   * 设置速度分量
   *
   * @param speedX 速度 X 分量
   * @param speedY 速度 Y 分量
   */
  public setDecompositionOnly(speedX: number, speedY: number): void {
    this.speedX = speedX;
    this.speedY = speedY;
  }

  /**
   * 设置运动方向
   *
   * @param arc 弧度
   */
  public setArc(arc: number): void {
    this.arc = arc;
    // 修正速度分量
    this.speedX = this.speed * cos(this.arc);
    this.speedY = this.speed * sin(this.arc);
  }

  /**
   * 设置运动方向
   *
   * @param arc 弧度
   */
  public setArcOnly(arc: number): void {
    this.arc = arc;
  }

  /**
   * 碰撞检测
   *
   * @param target 测试的目标
   */
  public test(target: IObject2d): boolean {
    if (target instanceof Ball) {
      return this.testBall(target);
    }
    return false;
  }

  /**
   * 对球体的碰撞检测
   *
   * @param target 目标
   */
  public testBall(target: Ball): boolean {
    const distanceX = target.x - this.x;
    const distanceY = target.y - this.y;
    const distanceMin = this.radius + target.radius;

    return distanceX * distanceX + distanceY * distanceY <= distanceMin * distanceMin;
  }

  /**
   * 撞击球
   *
   * @param target 撞击目标
   */
  public collideBall(target: Ball): void {
    // 诱导公式万岁!
    // vx = speed * cos(arc - detla)
    //    = speed * cos(arc) * cos(detla) + speed * sin(arc) * sin(detla)
    //    = speedX * cos(detla) + speedY * sin(detla)

    /** 质量 */
    const m1 = this.mass;
    /** 目标质量 */
    const m2 = target.mass;
    /** 碰撞角 */
    const theta = atan2(target.y - this.y, target.x - this.x);
    const cosT = cos(theta);
    const sinT = sin(theta);

    // 计算沿碰撞角的速度分量
    const vv11 = this.speedX * cosT + this.speedY * sinT;
    const vh1 = this.speedY * cosT - this.speedX * sinT;
    const vv21 = target.speedX * cosT + target.speedY * sinT;
    const vh2 = target.speedY * cosT - target.speedX * sinT;

    // 计算碰撞后的速度
    const mSum = m1 + m2;
    const mDiff = m1 - m2;
    const vv12 = ((m2 + m2) * vv21 + mDiff * vv11) / mSum;
    const vv22 = ((m1 + m1) * vv11 - mDiff * vv21) / mSum;

    // 修正各参数
    this.setDecomposition(vv12 * cosT - vh1 * sinT, vh1 * cosT + vv12 * sinT);
    target.setDecomposition(vv22 * cosT - vh2 * sinT, vh2 * cosT + vv22 * sinT);
  }
}
