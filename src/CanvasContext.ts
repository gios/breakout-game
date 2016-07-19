import {Ball} from "./Ball";
import {Paddle} from "./Paddle";

export abstract class CanvasContext {
  public static canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game");
  public static ctx: CanvasRenderingContext2D = CanvasContext.canvas.getContext("2d");
  public static items: Array<Ball | Paddle> = [];

  public static getCanvasWidth() {
    return this.canvas.width;
  }

  public static getCanvasHeight() {
    return this.canvas.height;
  }

  public static setItem(item: Ball | Paddle) {
    this.items.push(item);
  }

  public static renderingFactoryStart() {
    this.items.forEach(component => {
      component.render();
    });
  }

  protected abstract draw(): void;
  protected abstract render(): void;
}
