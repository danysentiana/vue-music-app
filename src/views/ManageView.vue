<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <music-upload ref="upload" :addSong="addSong"></music-upload>
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <music-edit
              v-for="(song, i) in songs"
              :key="song.docId"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :unsavedUpdate="unsavedUpdate"
            ></music-edit>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { songsCollection, auth } from '@/includes/firebase'
import MusicUpload from '@/components/MusicUpload.vue'
import MusicEdit from '@/components/MusicEdit.vue'
// import useUserStore from '@/stores/user'
export default {
  name: 'ManageView',
  components: { MusicUpload, MusicEdit },
  data() {
    return {
      songs: [],
      unsaved: false
    }
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

    snapshot.forEach(this.addSong)
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name
      this.songs[i].genre = values.genre
    },
    removeSong(i) {
      this.songs.splice(i, 1)
    },
    addSong(document) {
      const song = {
        ...document.data(),
        docId: document.id
      }

      this.songs.push(song)
    },
    unsavedUpdate(value) {
      this.unsaved = value
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsaved) {
      next()
    } else {
      const leave = confirm('You have unsaved changes')
      next(leave)
    }
  }
  // beforeRouteEnter(to, from, next) {
  //   const store = useUserStore()
  //   if (store.userLoggedIn) {
  //     next()
  //   } else {
  //     next({ name: 'home' })
  //   }
  // }
}
</script>
