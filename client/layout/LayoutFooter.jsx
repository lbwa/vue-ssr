import 'scss/layout-footer.scss'

export default {
  data () {
    return {
      author: 'Bowen'
    }
  },

  render (h) {
    return (
      <footer class="layout-footer">
        <span>Written by <a href="https://github.com/lbwa" target="_blank" >{this.author}</a></span>
      </footer>
    )
  }
}
