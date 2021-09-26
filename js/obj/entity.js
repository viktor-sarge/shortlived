export class entity {
	constructor(rotation, x, y, height, width, colour, life, movable, type, speed, damage) {
		this.rotation = rotation;  
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;
		this.colour = colour;
		this.life = life;
		this.alive = true;
		this.movable = movable;
		this.type = type;
		this.speed = speed;
		this.damage = damage;
	}

	takeDamage (amount){
		this.life -= amount;
		this.life < 1 && (this.alive = false)
		this.type == "enemy" && (this.speed *= 0.5);
	}
}
