window.onload = function () {

    const app = new Vue({
        el:'#app',
        data: {
          cats:[],
          name:'',
          quantity: '',
          total: '',
          inEditMode: false,
          image: ''          
        },
        mounted() {
          this.getList();
        },
        // created() {
        //   this.getList();
        // },
        methods: {
           getList() {
            
                 this.$http.get('https://dndviewer-6683c.firebaseio.com/' + ".json")
                .then(response => {
                  this.cats = response.data;
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
           },

          addCat() {
            // ensure they actually typed something
            if(!this.name) return;
            // var nameIN = this.name;
            // var quantityIN = this.quantity;
            // var imageIN = this.image;
            // this.cats.push({
            //     name: nameIN,
            //     quantity: quantityIN,
            //     total: quantityIN,
            //     image: imageIN,
            //     inEditMode: false
            // });
            // url = this.routeUrl
            this.$http.post('https://dndviewer-6683c.firebaseio.com/' + ".json", 
            {
              // the data to post
              name: this.name,
              quantity: this.quantity,
              image: this.image, 
              total: this.quantity,
              inEditMode: false
            }).then((response) => {
                this.getList();
              })
            this.name = '';
            this.quantity = '';
            this.image = '';
            //this.getList();
          },
          editItem(item){
              item.inEditMode = true;
          },
          editItemComplete(item) {
            item.inEditMode = false;
            //this.saveCats();
          },
          removeCat(item, index) {
            this.$http.delete('https://dndviewer-6683c.firebaseio.com/' + index + ".json") 
              .then((response) => {
                this.getList();
              })
          },
          removeAllCats(x) {
            this.$http.delete('https://dndviewer-6683c.firebaseio.com/' + ".json", 
              {
                x
              }).then((response) => {
              })
          }
        }
          
    })
}
