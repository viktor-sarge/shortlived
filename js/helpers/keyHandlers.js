export let rightPressed = false;
export let leftPressed = false;
export let upPressed = false;
export let downPressed = false;
export let firePressed = false;
export const keyDownHandler = (event) => {
    if (event.keyCode === 39) {
        rightPressed = true;
    } else if (event.keyCode === 37) {
        leftPressed = true;
    }
    if (event.keyCode === 40) {
        downPressed = true;
    } else if (event.keyCode === 38) {
        upPressed = true;
    }
    if (event.keyCode === 70) {
        firePressed = true;
    }
};

export const keyUpHandler = (event) => {
    if (event.keyCode === 39) {
        rightPressed = false;
    } else if (event.keyCode === 37) {
        leftPressed = false;
    }
    if (event.keyCode === 40) {
        downPressed = false;
    } else if (event.keyCode === 38) {
        upPressed = false;
    }
    if (event.keyCode === 70) {
        firePressed = false;
    }
};