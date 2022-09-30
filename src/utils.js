Array.prototype.chunk = function(size) {
    let returned = [];
    for (let i = 0; i < this.length; i += size) {
        returned.push(this.slice(i, i + size))
    }
    return returned
}