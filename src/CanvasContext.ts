export abstract class CanvasContext {
  public static canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game");
  public static ctx: CanvasRenderingContext2D = CanvasContext.canvas.getContext("2d");

  public static getCanvasWidth() {
    return this.canvas.width;
  }

  public static getCanvasHeight() {
    return this.canvas.height;
  }

  protected abstract draw(): void;
  protected abstract render(): void;
}
