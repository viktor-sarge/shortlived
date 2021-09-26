export class machinegun {
	constructor(world) {
		this.world = world;
		this.cooldown = 0;
		this.ammo = 100;
	}
	fire() {
		if (this.cooldown < 1 && this.ammo > 0) {
			this.world.spawn('bullet', 1);
			this.ammo--;
			this.cooldown = 8;
		}
		// TODO: Add sound
	}

	tick() {
		this.cooldown -= 1;
	}
}
