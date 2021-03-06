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

  public getStartPoint() {
    return this.startPoint;
  }

  public getHeight() {
    return this.height;
  }

  public getWidth() {
    return this.width;
  }

  public render() {
    this.attachListeners();
    if (this.rightPressed && this.startPoint < CanvasContext.getCanvasWidth() - this.width) {
      this.startPoint += 7;
    } else if (this.leftPressed && this.startPoint > 0) {
      this.startPoint -= 7;
    }
    this.draw();
    requestAnimationFrame(this.render.bind(this));
  }

  protected draw() {
    let ctx = CanvasContext.ctx;
    ctx.beginPath();
    ctx.rect(this.startPoint, CanvasContext.getCanvasHeight() - this.height, this.width, this.height);
    ctx.fillStyle = "#2b7489";
    ctx.fill();
    ctx.closePath();
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

    document.addEventListener("mousemove", e => {
      let relativeX = e.clientX - CanvasContext.canvas.offsetLeft;

      if (relativeX > 0 && relativeX < CanvasContext.getCanvasWidth()) {
        this.startPoint = relativeX - this.width / 2;
      }
    }, false);
  }
}
