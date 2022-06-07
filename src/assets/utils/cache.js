class Cache {
    constructor() {
        this.state = {}
    }
    getItem(key) {
        return this.state[key]
    }
    setItem(key, value) {
        this.state[key] = value
    }
}
export default Cache;