import { ctx, canvas, clearCanvas } from './helpers/canvas.js'; // Used here for FPS meter

// Entity controller
import { worldController } from './helpers/worldController.js';
const world = new worldController();

// Initial enemies spawning
world.spawn('enemy', 20); // TODO: Move to some init or level controller

// Set up FPS variables
let secondsPassed, oldTimeStamp, fps;

const gameLoop = (timeStamp) => {
	clearCanvas();
	world.tick(); // World updates that's not movement, collisions or plot
	world.movements();
	world.collisioncheck();
	world.plot();

	// Number of seconds passed since the last frame
	secondsPassed = (timeStamp - oldTimeStamp) / 1000;
	oldTimeStamp = timeStamp;

	// FPS calculation
	fps = Math.round(1 / secondsPassed);

	// Draw FPS number to the screen
	ctx.fillStyle = 'white';
	ctx.fillText('FPS: ' + fps, canvas.width-88, 20);

	// Draw life meter
	ctx.fillStyle = 'white';
	ctx.font = '25px Vermin';
	if (world.player.life > -1) {
		ctx.fillText('Armour: ' + world.player.life, 10, 20);
	} else {
		ctx.fillText('Armour: ' + 0, 10, 20);
	}

    // Draw ammo meter 
    ctx.fillText('Ammo: ' + world.player.weapon.ammo, 180, 20 )

	// Keep requesting new frames
	if (world.player.alive) {
		window.requestAnimationFrame(gameLoop);
	} else {
		ctx.fillStyle = 'white';
		ctx.font = '200px Vermin';
		ctx.textAlign = 'center';
		ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
		ctx.textAlign = 'left';
	}
};
window.requestAnimationFrame(gameLoop);
