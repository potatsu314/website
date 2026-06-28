class TextAnimation {
  constructor(node, text, time, onCompleted) {
    this.node = node
    this.text = text
    this.time = time
    this.onCompleted = onCompleted
    this.running = false
    this.timeoutId = null
  }
  start() {
    this.stop()
    this.running = true
    this.node.textContent = ''
    this._animate(0)
  }
  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
    this.running = false
  }
  _animate(index) {
    if (index >= this.text.length) {
      if (this.onCompleted) this.onCompleted()
      this.running = false
      return
    }

    this.node.textContent = this.text.slice(0, index + 1)

    this.timeoutId = setTimeout(() => this._animate(index + 1), this.time)
  }
}
