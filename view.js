window.onload = function () {
    const app = new Vue({
        el:'#app',
        data: {
          items: [],
          name: '',
          images: ''
        },
        mounted() {
            if(localStorage.getItem('cats')) {
                this.items = JSON.parse(localStorage.getItem('cats'));
            }
            window.addEventListener("storage", this.onStorageUpdate);
        },
        methods: {

        }
      })
      
}
