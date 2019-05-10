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
  public setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  /**
   * 获取下一个位置
   *
   * @param ticks 经过的 tick 数
   */
  public getNextPosition(ticks: number = 1): { x: number, y: number } {
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
  }

  /**
   * 设置运动方向
   *
   * @param arc 弧度
   */
  public setArc(arc: number): void {
    this.arc = arc;
    this.speedX = Math.cos(this.arc);
    this.speedY = Math.sin(this.arc);
  }

  /**
   * 撞击
   *
   * @param target 撞击目标
   */
  // public collideBall(target: Ball): void {
  //   const dx = target.x - this.x;
  //   const dy = target.y - this.y;

  //   const collisionAngle = Math.atan2(dy, dx);

  //   const speed = this.speed;
  //   const speedT = target.speed;

  //   const arc = this.arc;
  //   const arcT = target.arc;

  //   const vx11 = speed * Math.cos(arc - collisionAngle);
  //   const vy11 = speed * Math.sin(arc - collisionAngle);
  //   const vx21 = speedT * Math.cos(arcT - collisionAngle);
  //   const vy21 = speedT * Math.sin(arcT - collisionAngle);

  //   const mass = this.mass;
  //   const massT = target.mass;

  //   const vx12 = ((mass - massT) * vx11 + (massT + massT) * vx21) / (mass + massT);
  //   const vx22 = ((mass + mass) * vx11 + (massT - mass) * vx21) / (mass + massT);

  //   const vy12 = vy11;
  //   const vy22 = vy21;

  //   const vx1 = Math.cos(collisionAngle) * vx12 + Math.cos(collisionAngle + Math.PI / 2) * vy12;
  //   const vy1 = Math.sin(collisionAngle) * vx12 + Math.sin(collisionAngle + Math.PI / 2) * vy12;
  //   const vx2 = Math.cos(collisionAngle) * vx22 + Math.cos(collisionAngle + Math.PI / 2) * vy22;
  //   const vy2 = Math.sin(collisionAngle) * vx22 + Math.sin(collisionAngle + Math.PI / 2) * vy22;

  //   const cos = Math.cos;
  //   const sin = Math.sin;
  //   const sqrt = Math.sqrt;
  //   const acos = Math.acos;
  //   const atan = Math.atan;
  //   const PI = Math.PI;

  //   function sumPolarVectory2(l1, r1, l2, r2) {
  //     const d = r2 - r1;
  //     const lx2 = l2 * cos(d);
  //     const ly2 = l2 * sin(d);

  //     const lxs = l1 + lx2;
  //     const ls = sqrt(lxs * lxs + ly2 * ly2);

  //     const t = atan(ly2 / lxs);
  //     const rs = lxs >= 0 ? r1 + t : PI - r1 - t;

  //     return [ls, rs];
  //   }
  // }
}
