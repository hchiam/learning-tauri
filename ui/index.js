class Demo {
    constructor() {
        this.a = 'a'
        this.#b = '#b'
        this.c();
        this.#d();
    }

    #b = 1

    c() {
        out.value = `${this.a}, ${this.#b}, c`
        return 'c'
    }

    /** commenting out private method #d() gets rid of the console error */
    #d() {
        out.value = `${this.a}, ${this.#b}, c, #d`
        return '#d'
    }
}

demo = new Demo()
