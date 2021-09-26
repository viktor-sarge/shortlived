import { entity } from '../entity.js'; // Most general parent class
import { ctx, canvas } from '../../helpers/canvas.js';
import { machinegun } from '../weapons/machinegun.js';
import { randomInt } from '../../helpers/randomInt.js';

export class user extends entity {
	constructor(entities) {
		super(0, 800, 500, 40, 40, '#000000', 100, false, "player", 3, 0.5);  // rotation, x, y ,sizex, sizey, colour, life, movable
		this.rotationSpeed = 4;
		this.entities = entities;
		this.weapon = new machinegun(entities);
	}

	control(keypresses) {
		let [left,right,up,down,fire] = [...keypresses];
		left && (this.rotation -= this.rotationSpeed);
		right && (this.rotation += this.rotationSpeed);
		if(up) {
			this.x += this.speed * Math.cos(this.rotation * Math.PI / 180)
			this.y += this.speed * Math.sin(this.rotation * Math.PI / 180)
		}
		if(down) {
			this.x -= this.speed * Math.cos(this.rotation * Math.PI / 180)
			this.y -= this.speed * Math.sin(this.rotation * Math.PI / 180)
		}
		fire && this.weapon.fire();
		this.weapon.tick();
	}

	plot() {
		ctx.save()
		ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
		ctx.rotate(this.rotation * Math.PI / 180);
		ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
		ctx.fillStyle = 'white';
		ctx.fillRect(this.x, this.y, this.height, this.width);
		ctx.fillStyle = this.colour;
		ctx.fillRect(this.x+1, this.y+1, this.height-2, this.width-2);
		ctx.restore();
	}

	tick() {
		// Keep player within screen
		this.x < 0 && (this.x = 10);
		this.x > canvas.width-this.width && (this.x = canvas.width-this.width-10);
		this.y < 0 && (this.y = 10)
		this.y+this.height > canvas.height && (this.y = canvas.height - this.height-10)
	}
}
