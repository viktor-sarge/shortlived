import { enemy } from '../obj/enemies/enemy.js';
import { bullet } from '../obj/ammo/bullet.js';
import { user } from '../obj/player/player.js';
import { overlapping } from './collisionCheck.js';
import {
	keyDownHandler,
	keyUpHandler,
	leftPressed,
	rightPressed,
	upPressed,
	downPressed,
	firePressed,
} from './keyHandlers.js';
import { randomInt } from './randomInt.js';

export class worldController {
	constructor() {
		this.objects = []; // All world objects besides the player
		this.player = new user(this); // Our poor short lived hero

		// Listen for keyboard input
		document.addEventListener('keydown', keyDownHandler, false);
		document.addEventListener('keyup', keyUpHandler, false);
	}

	spawn(type, amount) {
		switch (type) {
			case 'enemy':
				for (let i = 0; i < amount; i++) {
					this.objects.push(new enemy());
				}
				break;
			case 'bullet':
				this.objects.push(
					new bullet(
						this.player.x+this.player.width/2,
						this.player.y+this.player.height/2,
						this.player.rotation
					)
				);
				break;
		}
	}

	tick() {
		randomInt(1,25) == 1 && this.spawn("enemy", 1); // Controls spawn rate of enemies
		this.player.tick(); // Checks that player is inside canvas
	}

	movements() {
		this.objects.forEach((entity) => {
			entity.move(this.player.x, this.player.y);
		});
		this.player.control([
			leftPressed,
			rightPressed,
			upPressed,
			downPressed,
			firePressed,
		]);
	}

	collisioncheck() {

		// Remove all dead objects
		this.objects.forEach((entity, i)=>{
			if(!entity.alive) {
				this.objects.splice(i, 1);
			}
		})

		// Check each object against all objects, but not itself
		// Only different types of objects collide
		this.objects.forEach((entity, i) => {
			this.objects.forEach((target, j)=>{
				if(i != j && entity.constructor.name != target.constructor.name) {
					if(overlapping(entity, target)) {
						target.takeDamage(entity.damage)
					}
				}
			})
		});

		// Enemies colliding with player? 
		// TODO: Move player into objects array? 
		this.objects.forEach((entity)=>{
			if(entity.type == "enemy" && overlapping(entity, this.player)) {
				entity.takeDamage(this.player.damage);
				this.player.takeDamage(entity.damage);
			}
		})
	}

	plot() {
		this.objects.forEach((entity) => {
			entity.plot();
		});
		this.player.plot();
	}
}
