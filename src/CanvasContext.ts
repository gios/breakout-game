export abstract class CanvasContext {
  public static canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game");
  public static ctx: CanvasRenderingContext2D = CanvasContext.canvas.getContext("2d");

  public static getCanvasWidth() {
    return this.canvas.width;
  }

  public static getCanvasHeight() {
    return this.canvas.height;
  }

  public static setItem<T>(item: T) {
    this.items.push(item);
  }

  public static getItem(name: string): any {
    return this.items.filter(item => {
      return item.constructor.name === name;
    })[0];
  }

  public static renderingFactoryStart() {
    this.items.forEach(component => {
      component.render();
    });
  }

  private static items: Array<any> = [];
  protected abstract draw(): void;
  protected abstract render(): void;
}
