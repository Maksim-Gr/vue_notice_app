<template>
  <section class="mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card bg-light p-1 showdow-sm">
            <div class="card-header d-flex justify-content-center">
              <h3>Notice Taking App</h3>
            </div>
            <div class="card-body">
              <div class="container mb-4">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card" v-if="addState">
                      <div class="card-body">
                        <div class="card-title mb-4">
                          <h4>Create new sticker</h4>
                        </div>
                        <form
                          @submit.prevent="addNewSticker"
                          enctype="multipart/form-data"
                        >
                          <div class="form-group">
                            <label for="title">Title</label>
                            <input
                              type="text"
                              v-model="stickerDetails.title"
                              class="form-control"
                            />
                          </div>
                          <div class="form-group">
                            <label for="artist">Description</label>
                            <input
                              type="text"
                              v-model="stickerDetails.description"
                              class="form-control"
                            />
                          </div>
                          <div class="form-group text-right">
                            <button
                              class="btn btn-primary"
                              :disabled="isDisabled"
                            >
                              <span
                                class="spinner-border spinner-border-sm"
                                v-if="addLoading"
                                role="status"
                                aria-hidden="true"
                              ></span
                              >Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date created</th>
                    <th scope="col">Live Period</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <div
                  v-if="stickerLoading"
                  class="spinner-border"
                  style="width: 3rem; height: 3rem"
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>

                <tbody v-else>
                  <tr v-for="(sticker, index) in allstickers" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ sticker.title }}</td>
                    <td>{{ sticker.description }}</td>

                    <td>{{ new Date(sticker.created).toDateString() }}</td>
                    <td>
                      {{
                        timeDiffCalc(
                          new Date(sticker.created),
                          new Date(Date.now())
                        )
                      }}
                    </td>
                    <td>
                      <button
                        class="btn btn-danger"
                        @click="deleteSticker(sticker._id)"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="text-right">
            <button class="btn btn-primary m-3" @click="initForm">
              {{ addState ? 'Cancel' : 'Add New Sticker' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      stickerDetails: {
        title: '',
        description: '',
      },
      allstickers: [],
      addState: false,
      addLoading: false,
      stickerLoading: false,
      isValid: false,
    }
  },
  computed: {
    isDisabled: function () {
      if (
        this.stickerDetails.title === '' ||
        this.stickerDetails.description === ''
      ) {
        return !this.isValid
      }
    },
  },
  methods: {
    initForm() {
      this.addState = !this.addState
    },
    async getAllStickers() {
      this.stickerLoading = true
      try {
        let data = await this.$axios.$get('/sticker')
        this.allstickers = data
        this.stickerLoading = false
      } catch (err) {
        this.stickerLoading = false
        swal('Error', 'Error while loading stickers', 'error')
      }
    },
    addNewSticker() {
      this.addLoading = true
      this.$axios
        .$post('/sticker', {
          title: this.stickerDetails.title,
          description: this.stickerDetails.description,
        })
        .then((response) => {
          this.addLoading = false
          this.stickerDetails = {}
          this.getAllStickers()
          swal('Success', 'New Stickers has been added', 'success')
        })
        .catch((err) => {
          this.addLoading = false
          swal('Error', 'Something Went wrong', 'error')
          console.error(err)
        })
        this.initForm()
      return !this.isValid
    },
    deleteSticker(id) {
      this.$axios
        .$delete('/sticker/' + id)
        .then((response) => {
          this.getAllStickers()
          swal('Stickers has been deleted', {
            icon: 'success',
          })
        })
        .catch((err) => {
          swal('Error', 'Somethimg went wrong', 'error')
        })
    },
    timeDiffCalc(dateFuture, dateNow) {
      let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000
      const days = Math.floor(diffInMilliSeconds / 86400)
      diffInMilliSeconds -= days * 86400

      const hours = Math.floor(diffInMilliSeconds / 3600) % 24
      diffInMilliSeconds -= hours * 3600

      const minutes = Math.floor(diffInMilliSeconds / 60) % 60
      diffInMilliSeconds -= minutes * 60

      let difference = ''
      if (days > 0) {
        difference += days === 1 ? `${days} day, ` : `${days} days, `
      }

      difference +=
        hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `

      difference +=
        minutes === 0 || hours === 1
          ? `${minutes} minutes`
          : `${minutes} minutes`

      return difference
    },
  },
  created() {
    this.getAllStickers()
  },
}
</script>

<style>
.modal {
}
</style>