import {Ball} from "./src/Ball";
import {CanvasContext} from "./src/CanvasContext";

let canvas = <HTMLCanvasElement> document.getElementById("game");
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

let canvasContext = new CanvasContext(canvas, ctx);
let ball = new Ball(canvasContext, 10, canvasContext.getCanvasWidth() / 2, canvasContext.getCanvasHeight() - 30, 2, -2);
canvasContext.setBall(ball);
canvasContext.draw();
