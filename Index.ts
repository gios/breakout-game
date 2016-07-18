import Ball from "./Ball";
import CanvasContext from "./CanvasContext";

let canvas = <HTMLCanvasElement> document.getElementById("game");
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

let canvasContext = new CanvasContext(canvas, ctx);
let ball = new Ball(canvasContext, 10, canvasContext.getCanvasWidth() / 4, canvasContext.getCanvasHeight() - 30, 2, -2);
canvasContext.setBall(ball);
canvasContext.draw();
