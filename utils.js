function getRandomArr(size = 10, min = 30, max = 100) {
    return Array.from({ length: size },
        () => randInt(min, max));
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function swapEles(arr, xp, yp) {
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

class Node {
    constructor(a, b, swap, next = null) {
        this.a = a;
        this.b = b;
        this.swap = swap;
        this.next = next;
    }
}
