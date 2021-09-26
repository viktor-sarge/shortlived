import { canvas, ctx } from '../../helpers/canvas.js';
import { entity } from '../entity.js';

export class bullet extends entity {
    constructor(x, y, rotation) {
        super(rotation, x, y, 10, 10, "#FFF689", 1, true, "bullet", 15, 11)
        this.ctx = ctx;
        this.canvas = canvas;
    }

    isOutsideCanvas(canvas) {
        if(this.x < 0 || this.y < 0 || this.x > canvas.width || this.y > canvas.height) {
        this.alive = false;
        }
    }

    move() {
        this.x += this.speed * Math.cos(this.rotation * Math.PI / 180)
        this.y += this.speed * Math.sin(this.rotation * Math.PI / 180)
    }

    plot() {
        ctx.fillStyle = "#000000";
        ctx.fillRect(this.x, this.y, this.height, this.width);
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x+1, this.y+1, this.height-2, this.width-2);
        this.isOutsideCanvas(canvas);
    }
}