import {CanvasContext} from "./CanvasContext";

export class Score extends CanvasContext {
  private score: number = 0;

  public getScore() {
    return this.score;
  }

  public setScore(score: number) {
    this.score = score;
  }

  public render() {
    this.draw();
    requestAnimationFrame(this.render.bind(this));
  }

  protected draw() {
    let ctx = CanvasContext.ctx;
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score: ${this.score}`, 8, 20);
  }
}
