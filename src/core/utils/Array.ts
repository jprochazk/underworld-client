
declare global {
    interface Array<T> {
        equals(that: Array<T>): boolean;
        front(): T;
        back(): T;
        swap(a: number, b: number): void;
    }
}

if (undefined === Array.prototype.equals) {
    window.Array.prototype.equals = function <T>(this: Array<T>, that: Array<T>): boolean {
        if (this === that) return true;
        if (this == null || that == null) return false;
        if (this.length != that.length) return false;

        for (let i = 0; i < this.length; ++i) {
            if (this[i] !== that[i]) return false;
        }
        return true;
    }
}
if (undefined === Array.prototype.front) {
    window.Array.prototype.front = function <T>(this: Array<T>): T | undefined {
        return this[0];
    }
}
if (undefined === Array.prototype.back) {
    window.Array.prototype.back = function <T>(this: Array<T>): T | undefined {
        return this[this.length - 1];
    }
}
if (undefined === Array.prototype.swap) {
    window.Array.prototype.swap = function <T>(this: Array<T>, a: number, b: number): void {
        const temp = this[a];
        this[a] = this[b];
        this[b] = temp;
    }
}

export { }