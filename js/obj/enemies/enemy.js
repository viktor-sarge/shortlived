import { entity } from '../entity.js';
import { ctx, canvas } from '../../helpers/canvas.js';
import { randomInt } from '../../helpers/randomInt.js';

export class enemy extends entity {
	constructor() {

		// Set up x, y coordinates
		const spawnSide = randomInt(1,4);
		let x,y;
		switch(spawnSide) {
            case 1:
                // Coming from the left
                x = -40;
                y = randomInt(0, canvas.height);
                break;
            case 2:
                // Coming from the top
                y = 0;
                x = randomInt(0, canvas.width);
                break;
            case 3:
                // Coming from the right
                x = canvas.width;
                y = randomInt(0, canvas.height);
                break;
            case 4:
                // Coming from the bottom
                y = canvas.height + 40;
                x = randomInt(0, canvas.width);
                break;
        }
		super(0, x, y, 40, 40, '#ED3456', 20, true, "enemy", randomInt(80,120)/100, 1);
	}

	move(targetX, targetY) {
		this.x > targetX ? this.x -= this.speed : this.x += this.speed;
		this.y > targetY ? this.y -= this.speed : this.y += this.speed;
	}

	plot() {
		ctx.fillStyle = "#000000";
		ctx.fillRect(this.x, this.y, this.height, this.width);
		ctx.fillStyle = this.colour;
		ctx.fillRect(this.x+2, this.y+2, this.height-4, this.width-4);
	}
}
