class UploadProvider {
  constructor() {
    this.callbacks = {}
  }

  on (event, callback) {
    this.callbacks[event] = callback
  }

  emit (event, data) {
    if (this.callbacks[event]) {
      this.callbacks[event](data)
    }
  }
}

export default UploadProvider
