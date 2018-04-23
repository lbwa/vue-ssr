import 'scss/layout-footer.scss'

export default {
  data () {
    return {
      author: 'Bowen'
    }
  },

  render (h) {
    return (
      <div class="layout-footer">
        <span>Written by <a href="https://github.com/lbwa" target="_blank" >{this.author}</a></span>
      </div>
    )
  }
}
