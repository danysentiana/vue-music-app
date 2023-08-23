import { defineStore } from 'pinia'
import { Howl } from 'howler'

export default defineStore('player', {
  state: () => ({
    current_song: {},
    sounds: {}
  }),
  actions: {
    async newSong(song) {
      this.current_song = song

      this.sounds = new Howl({
        src: [song.url],
        html5: true
      })

      this.sounds.play()
    }
  }
})
