import {Ball} from "./Ball";
import {CanvasContext} from "./CanvasContext";
import {Score} from "./Score";

interface IBrickCoords {
  x?: number;
  y?: number;
  status?: number;
}

export class Brick extends CanvasContext {
  private rowCount: number;
  private columnCount: number;
  private width: number;
  private height: number;
  private padding: number;
  private offsetTop: number;
  private offsetLeft: number;
  private bricks: Array<IBrickCoords> = [];

  constructor(rowCount: number, columnCount: number, width: number,
              height: number, padding: number, offsetTop: number, offsetLeft: number) {
    super();
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.offsetTop = offsetTop;
    this.offsetLeft = offsetLeft;
    this.generateBricks();
  }

  public getBricks() {
    return this.bricks;
  }

  public getColumnCount() {
    return this.columnCount;
  }

  public getRowCount() {
    return this.rowCount;
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }

  public getPadding() {
    return this.padding;
  }

  public getOffsetLeft() {
    return this.offsetLeft;
  }

  public getOffsetTop() {
    return this.offsetTop;
  }

  public render() {
    this.draw();
    this.collisionDetection();
    requestAnimationFrame(this.render.bind(this));
  }

  protected draw() {
    let ctx = CanvasContext.ctx;

    for (let column = 0; column < this.getColumnCount(); column++) {
      for (let row = 0; row < this.getRowCount(); row++) {
        if (this.getBricks()[column][row].status === 1) {
          let brickX = (column * (this.getWidth() + this.getPadding())) + this.getOffsetLeft();
          let brickY = (row * (this.getHeight() + this.getPadding())) + this.getOffsetTop();

          this.getBricks()[column][row].x = brickX;
          this.getBricks()[column][row].y = brickY;

          ctx.beginPath();
          ctx.rect(brickX, brickY, this.getWidth(), this.getHeight());
          ctx.fillStyle = "##2b7489";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  private generateBricks() {
    for (let column = 0; column < this.getColumnCount(); column++) {
      this.getBricks()[column] = [];
      for (let row = 0; row < this.getRowCount(); row++) {
        this.getBricks()[column][row] = { status: 1, x: 0, y: 0 };
      }
    }
  }

  private collisionDetection() {
    let ball = <Ball> CanvasContext.getItem("Ball");
    let score = <Score> CanvasContext.getItem("Score");

    for (let column = 0; column < this.getColumnCount(); column++) {
      for (let row = 0; row < this.getRowCount(); row++) {
        let brick = this.getBricks()[column][row];

        if (brick.status === 1) {
          if (ball.getPositionX() > brick.x && ball.getPositionX() < brick.x + this.getWidth() &&
            ball.getPositionY() > brick.y && ball.getPositionY() < brick.y + this.getHeight()) {
            ball.setMovingY(-ball.getMovingY());
            brick.status = 0;
            score.setScore(score.getScore() + 1);
            if (score.getScore() === this.getRowCount() * this.getColumnCount()) {
              alert("YOU WIN, CONGRATULATIONS!");
              document.location.reload();
            }
          }
        }
      }
    }
  }
}
