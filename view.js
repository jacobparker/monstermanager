window.onload = function () {
    const app = new Vue({
        el:'#app',
        data: {
          items: [],
          name: '',
          images: ''
        },
        mounted() {
            this.getList();
        },
        methods: {
             getList() {
                 this.$http.get('https://dndviewer-6683c.firebaseio.com/' + ".json")
                .then(response => {
                  this.items = response.data;
                }).bind(this)
                .catch(error => {
                  console.log(error)
                })
           }

        }
      })
      
}
