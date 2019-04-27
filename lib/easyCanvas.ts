/**
 * canvas库
 */
class C {
  /** canvas 元素 */
  protected $el: HTMLCanvasElement;
  /** canvas 2d 环境 */
  protected c2d: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.$el = canvas;
    this.c2d = this.$el.getContext('2d')!;
  }

  /**
   * 清空画布
   */
  public clear(): C {
    const $el = this.$el;
    return this.clearRect(0, 0, $el.width, $el.height);
  }

  /**
   * 擦除矩形区域
   *
   * @param x 矩形起点的 x 轴坐标
   * @param y 矩形起点的 y 轴坐标
   * @param width 矩形的宽度
   * @param height 矩形的高度
   */
  public clearRect(x: number, y: number, width: number, height: number): C {
    this.c2d.clearRect(x, y, width, height);
    return this;
  }

  /**
   * 填充
   *
   * @param path 需要填充的 Path2D 路径
   * @param fillRule 非零环绕或奇偶环绕
   */
  public fill(fillRule?: CanvasFillRule): C;
  public fill(path: Path2D, fillRule?: CanvasFillRule): C;
  public fill(
    path?: Path2D | CanvasFillRule,
    fillRule?: CanvasFillRule,
  ): C {
    const c2d = this.c2d;
    if (fillRule) {
      c2d.fill(path as Path2D, fillRule);
    } else if (typeof path === 'string') {
      c2d.fill(path);
    } else {
      c2d.fill(path as Path2D);
    }
    return this;
  }

  /**
   *  填充矩形
   *
   * @param x 矩形起点的 x 轴坐标
   * @param y 矩形起点的 y 轴坐标
   * @param width 矩形的宽度
   * @param height 矩形的高度
   */
  public fillRect(x: number, y: number, width: number, height: number): C {
    this.c2d.fillRect(x, y, width, height);
    return this;
  }

  /**
   *  填充矩形（使用临时样式）
   *
   * @param style 填充样式
   * @param x 矩形起点的 x 轴坐标
   * @param y 矩形起点的 y 轴坐标
   * @param width 矩形的宽度
   * @param height 矩形的高度
   */
  public fillRectS(
    style: string | CanvasGradient | CanvasPattern,
    x: number, y: number, width: number, height: number,
  ): C {
    const c2d = this.c2d;
    c2d.save();
    style && (c2d.fillStyle = style);
    c2d.fillRect(x, y, width, height);
    c2d.restore();
    return this;
  }

  /**
   * 填充（使用临时样式）
   *
   * @param style 填充样式
   * @param path 需要填充的 Path2D 路径
   * @param fillRule 非零环绕或奇偶环绕
   */
  public fillS(
    style: string | CanvasGradient | CanvasPattern,
    fillRule?: CanvasFillRule,
  ): C;
  public fillS(
    style: string | CanvasGradient | CanvasPattern,
    path: Path2D, fillRule?: CanvasFillRule,
  ): C;
  public fillS(
    style: string | CanvasGradient | CanvasPattern,
    path?: Path2D | CanvasFillRule,
    fillRule?: CanvasFillRule,
  ): C {
    const c2d = this.c2d;
    c2d.save();
    style && (c2d.fillStyle = style);
    if (fillRule) {
      c2d.fill(path as Path2D, fillRule);
    } else if (typeof path === 'string') {
      c2d.fill(path);
    } else {
      c2d.fill(path as Path2D);
    }
    c2d.restore();
    return this;
  }

  /**
   * 设置填充样式
   *
   * @param style 填充样式
   */
  public fillStyle(style: string | CanvasGradient | CanvasPattern): C {
    this.c2d.fillStyle = style;
    return this;
  }

  /**
   * 注销监听器
   *
   * @param type 事件类型
   * @param listener 需要移除的函数
   * @param options 可选的参数对象
   */
  public off<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): C {
    this.$el.removeEventListener(type, listener, options);
    return this;
  }

  /**
   * 注册监听器
   *
   * @param type 事件类型
   * @param listener 触发事件时的回调
   * @param options 可选的参数对象
   */
  public on<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): C {
    this.$el.addEventListener(type, listener, options);
    return this;
  }

  /**
   * 还原坐标系
   */
  public resetTransform(): C {
    this.resetTransform();
    return this;
  }

  /**
   * 还原上次状态
   */
  public restore(): C {
    this.c2d.restore();
    return this;
  }

  /**
   * 保存当前状态
   */
  public save(): C {
    this.c2d.save();
    return this;
  }

  /**
   * 设置画布宽高
   *
   * @param width 画布的宽度
   * @param height 画布的高度
   */
  public setSize(width: number, height: number): C {
    const $el = this.$el;
    $el.width = width;
    $el.height = height;
    return this;
  }

  /**
   * 设置坐标系
   *
   * @param m11 水平缩放
   * @param m12 水平倾斜
   * @param m21 垂直倾斜
   * @param m22 垂直缩放
   * @param dx 水平移动
   * @param dy 垂直移动
   */
  public setTransform(
    m11: number, m12: number,
    m21: number, m22: number,
    dx: number, dy: number,
  ): C {
    this.c2d.setTransform(m11, m12, m21, m22, dx, dy);
    return this;
  }

  /**
   * 绘制
   *
   * @param path 需要绘制的 Path2D 路径
   */
  public stroke(path?: Path2D) {
    const c2d = this.c2d;
    if (path) {
      c2d.stroke(path);
    } else {
      c2d.stroke();
    }
    return this;
  }

  /**
   * 绘制矩形
   *
   * @param x 矩形起点的 x 轴坐标
   * @param y 矩形起点的 y 轴坐标
   * @param width 矩形的宽度
   * @param height 矩形的高度
   */
  public strokeRect(x: number, y: number, width: number, height: number): C {
    this.c2d.strokeRect(x, y, width, height);
    return this;
  }

  /**
   * 绘制矩形（使用临时样式）
   *
   * @param style 画笔样式
   * @param x 矩形起点的 x 轴坐标
   * @param y 矩形起点的 y 轴坐标
   * @param width 矩形的宽度
   * @param height 矩形的高度
   */
  public strokeRectS(
    style: string | CanvasGradient | CanvasPattern,
    x: number, y: number, width: number, height: number,
  ): C {
    const c2d = this.c2d;
    c2d.save();
    style && (c2d.strokeStyle = style);
    c2d.strokeRect(x, y, width, height);
    c2d.restore();
    return this;
  }

  /**
   * 绘制
   *
   * @param style 画笔样式
   * @param path 需要绘制的 Path2D 路径
   */
  public strokeS(
    style: string | CanvasGradient | CanvasPattern,
    path?: Path2D,
  ) {
    const c2d = this.c2d;
    c2d.save();
    style && (c2d.strokeStyle = style);
    if (path) {
      c2d.stroke(path);
    } else {
      c2d.stroke();
    }
    c2d.restore();
    return this;
  }

  /**
   * 设置画笔样式
   *
   * @param style 画笔样式
   */
  public strokeStyle(style: string | CanvasGradient | CanvasPattern): C {
    this.c2d.strokeStyle = style;
    return this;
  }
}
