/**
 * canvas库
 */
export default class C {
  /** canvas 元素 */
  protected $el: HTMLCanvasElement;
  /** canvas 2d 环境 */
  protected c2d: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.$el = canvas;
    this.c2d = this.$el.getContext('2d')!;
  }

  /**
   * 获取画布元素
   */
  public canvas(): HTMLCanvasElement {
    return this.$el;
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
   * 设置当前字体样式
   *
   * @param font 字体样式
   */
  public font(font: string): C {
    this.c2d.font = font;
    return this;
  }

  /**
   * 设置透明度
   *
   * @param alpha 图形和图片透明度
   */
  public globalAlpha(alpha: number): C {
    this.c2d.globalAlpha = alpha;
    return this;
  }

  /**
   * 设置绘制新形状时应用的合成操作的类型
   *
   * @param type 合成类型
   */
  public globalCompositeOperation(type: string): C {
    this.c2d.globalCompositeOperation = type;
    return this;
  }

  /**
   * 设置图片是否平滑
   *
   * @param value 图片是否平滑
   */
  public imageSmoothingEnabled(value: boolean): C {
    this.c2d.imageSmoothingEnabled = value;
    return this;
  }

  /**
   * 设置线条时的末端属性
   *
   * @param lineCap 末端属性
   */
  public lineCap(lineCap: CanvasLineCap): C {
    this.c2d.lineCap = lineCap;
    return this;
  }

  /**
   * 设置虚线的偏移量
   *
   * @param offset 偏移量
   */
  public lineDashOffset(offset: number): C {
    this.c2d.lineDashOffset = offset;
    return this;
  }

  /**
   * 设置线条的连接属性
   *
   * @param lineJoin 连接属性
   */
  public lineJoin(lineJoin: CanvasLineJoin): C {
    this.c2d.lineJoin = lineJoin;
    return this;
  }

  /**
   * 设置线条厚度
   *
   * @param width 线条厚度
   */
  public lineWidth(width: number): C {
    this.c2d.lineWidth = width;
    return this;
  }

  /**
   * 设定外延交点与连接点的最大距离
   *
   * @param limit 最大距离
   */
  public miterLimit(limit: number): C {
    this.c2d.miterLimit = limit;
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
   * 设置阴影模糊效果程度
   *
   * @param level 模糊效果程度
   */
  public shadowBlur(level: number): C {
    this.c2d.shadowBlur = level;
    return this;
  }

  /**
   * 设置阴影颜色
   *
   * @param color 阴影颜色
   */
  public shadowColor(color: string): C {
    this.c2d.shadowColor = color;
    return this;
  }

  /**
   * 设置阴影水平偏移距离
   *
   * @param offset 水平偏移距离
   */
  public shadowOffsetX(offset: number): C {
    this.c2d.shadowOffsetX = offset;
    return this;
  }

  /**
   * 设置阴影垂直偏移距离
   *
   * @param offset 垂直偏移距离
   */
  public shadowOffsetY(offset: number): C {
    this.c2d.shadowOffsetY = offset;
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

  /**
   * 设置文本对齐方式
   *
   * @param align 对齐方式
   */
  public textAlign(align: CanvasTextAlign): C {
    this.c2d.textAlign = align;
    return this;
  }

  /**
   * 设置文本基线
   *
   * @param value 基线属性
   */
  public textBaseline(value: CanvasTextBaseline): C {
    this.c2d.textBaseline = value;
    return this;
  }
}
