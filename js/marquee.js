document.addEventListener('DOMContentLoaded', function(){

  class Marquee {
    constructor(marquee, config) {
      this._marquee = marquee
      this._track = this._marquee.querySelector(config.track)
      this._content = this._marquee.querySelector(config.content)
      this._clones = [this._content]
      this._shift = config.shift
      this._interval = config.interval
      this._scrollX = 0
      this._offset = 0
      
      this._init()
    }

    _init() {
      setInterval(() => {
        this._scroll()
        this._add()
        this._remove()
      }, this._interval)
    }

    _scroll() {
      this._scrollX += this._shift
      this._track.style.transform = 'translateX(-' + this._scrollX + 'px)'
    }

    _add() {
      if (this._clones[this._clones.length - 1].getBoundingClientRect().right - this._shift * 2 <= this._marquee.getBoundingClientRect().right) {
        const clone = this._content.cloneNode(true)
        this._track.appendChild(clone)
        this._clones.push(clone)
      }
    }

    _remove() {
      if (this._clones[0].getBoundingClientRect().left + this._clones[0].offsetWidth <= this._marquee.getBoundingClientRect().left) {
        this._offset += this._clones[0].offsetWidth
        this._track.style.paddingLeft = `${this._offset}px`
        this._clones[0].remove()
        this._clones.splice(0, 1)
      }
    }
  }

  new Marquee(document.querySelector('[data-marquee]'), {
    track: '[data-marquee-track]',
    content: '[data-marquee-content]',
    shift: 75,
    interval: 500
  })

})
