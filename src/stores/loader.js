import { observable, action } from 'mobx'
class Loader {
  @observable
  isLoading = false

  @action
  handleToggle() {
    this.isLoading = !this.isLoading
  }
}

export default new Loader()
