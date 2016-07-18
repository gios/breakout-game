import {CanvasContext} from "./CanvasContext";

export class Paddle extends CanvasContext {
  public static rightButtonCode = 39;
  public static leftButtonCode = 37;

  private height: number;
  private width: number;
  private startPoint: number;

  private rightPressed: boolean;
  private leftPressed: boolean;

  constructor(height: number, width: number, startPoint: number) {
    super();
    this.height = height;
    this.width = width;
    this.startPoint = startPoint;
  }

  public setRightPressed(rightPressed: boolean) {
    this.rightPressed = rightPressed;
  }

  public setLeftPressed(leftPressed: boolean) {
    this.leftPressed = leftPressed;
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
    this.attachListeners();
    if (this.rightPressed) {
      this.startPoint += 7;
    } else if (this.leftPressed) {
      this.startPoint -= 7;
    }
    this.draw();
    requestAnimationFrame(this.render.bind(this));
  }

  private attachListeners() {
    document.addEventListener("keydown", e => {
      if (e.keyCode === Paddle.rightButtonCode) {
        this.setRightPressed(true);
      } else if (e.keyCode === Paddle.leftButtonCode) {
        this.setLeftPressed(true);
      }
    }, false);
    document.addEventListener("keyup", e => {
      if (e.keyCode === Paddle.rightButtonCode) {
        this.setRightPressed(false);
      } else if (e.keyCode === Paddle.leftButtonCode) {
        this.setLeftPressed(false);
      }
    }, false);
  }
}
