export default class ImageLoader implements ILoader {
  protected image: HTMLImageElement;

  constructor(src: string) {
    const image = this.image = new Image();
    image.src = src;
  }

  public then(
    listener: (this: HTMLImageElement, ev: Event) => any,
  ): this {
    this.image.addEventListener('load', listener);
    return this;
  }

  public catch(
    listener: (this: HTMLImageElement, ev: ErrorEvent) => any,
  ): this {
    this.image.addEventListener('error', listener);
    return this;
  }

  public isComplete(): boolean {
    return this.image.complete;
  }

  public use(callback: (media: HTMLImageElement) => void): void {
    if (this.isComplete()) {
      callback(this.image);
    } else {
      this.then(() => {
        callback(this.image);
      });
    }
  }
}
