export const overlapping = (obj1,obj2) => {
    if (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    ) {
        return true;
    } else {
        return false;
    }
}