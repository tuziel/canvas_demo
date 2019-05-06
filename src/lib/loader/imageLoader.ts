export default class ImageLoader implements ILoader {
  protected image: HTMLImageElement;

  constructor(src: string) {
    const image = this.image = new Image();
    image.src = src;
  }

  /**
   * 添加加载成功时的监听器
   *
   * @param listener 监听器
   */
  public then(
    listener: (this: HTMLImageElement, ev: Event) => any,
  ): this {
    this.image.addEventListener('load', listener);
    return this;
  }

  /**
   * 添加发生错误时的监听器
   *
   * @param listener 监听器
   */
  public catch(
    listener: (this: HTMLImageElement, ev: ErrorEvent) => any,
  ): this {
    this.image.addEventListener('error', listener);
    return this;
  }

  /**
   * 是否完成加载
   */
  public isComplete(): boolean {
    return this.image.complete;
  }

  /**
   * 使用资源
   *
   * @param callback 回调
   */
  public use(callback: (media: HTMLImageElement) => void): this {
    if (this.isComplete()) {
      callback(this.image);
    } else {
      this.then(() => {
        callback(this.image);
      });
    }
    return this;
  }
}
