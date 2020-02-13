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
            var self = this;
                 this.$http.get('https://dndviewer-6683c.firebaseio.com/' + ".json")
                .then(response => {
                  self.cats = response.data;
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
            },
            { 
            }).then(r => console.log('r: ', JSON.stringify(r, null, 2)));
            this.name = '';
            this.quantity = '';
            this.image = '';
            this.saveCats();
            this.getList();
          },
          editItem(item){
              item.inEditMode = true;
          },
          editItemComplete(item) {
            item.inEditMode = false;
            this.saveCats();
          },
          removeCat(x) {
            this.$http.delete(this.cats).then((response) => {
              console.log("deleted");
            })
            //this.cats.splice(x,1);
            //this.saveCats();
          }
          // saveCats() {
          //   let parsed = JSON.stringify(this.cats);
          //   localStorage.setItem('cats', parsed);
            //this.testAPICall();
          //}
        //   testAPICall() {
        //       console.log("test api call");
        //   }
        }
          
    })
}
