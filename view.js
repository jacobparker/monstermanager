window.onload = function () {

    const app = new Vue({
        el:'#app',
        data: {
          items: [],
          name: '',
          images: '',
          locations: []
        },
        mounted() {
            this.getList();
            this.getLocation();
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
           },
           getLocation() {
              this.$http.get('https://dndlocation-f4256.firebaseio.com/' + ".json")
                .then(response => {
                  this.locations = response.data;
                  console.log("locations:" + this.locations);
                  console.log("currentLocation:" + this.locations.currentLocation);
                }).bind(this)
                .catch(error => {
                  console.log(error)
                })

           }

        }
        
      })
      
}
