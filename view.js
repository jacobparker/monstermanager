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
                  // console.log("this.cats: " + this.cats);
                  // console.log("this.cats.name: " + this.cats.name);
                  // for(var i in this.cats){
                  //   //this.catsUpdated[i].push = this.cats;
                  //    console.log("this.cats: " + this.cats[i]);
                  // }
                }).bind(this)
                .catch(error => {
                  console.log(error)
                })
           }

        }
      })
      
}
