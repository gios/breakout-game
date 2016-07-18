import {CanvasContext} from "./CanvasContext";

class Paddle extends CanvasContext {
  private height: number;
  private width: number;
  private startPoint: number;

  constructor(height: number, width: number, startPoint: number) {
    super();
    this.height = height;
    this.width = width;
    this.startPoint = startPoint;
  }

  public draw() {
    let ctx = CanvasContext.ctx;
    ctx.beginPath();
    ctx.rect(this.startPoint, CanvasContext.getCanvasHeight() - this.height, this.width, this.height);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
  }

  public render() {
    console.log("RENDER")
  }
}
