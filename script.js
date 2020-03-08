window.onload = function () {

    const app = new Vue({
        el:'#app',
        data: {
          cats:[],
          currentCat: [],
          turn: '',
          name:'',
          image: '',
          quantity: '',
          total: '',
          dead: false,
          bloody: false,
          image: '',
          updatedTurn: '',
          updatedName: '',
          updatedQuantity: '',
          orderedCats:[],
          previousLocation: '',
          currentLocation: 'blank'
        },
        mounted() {
          this.getList();
          this.getLocation();
        },
        methods: {
           getList() {
            
                 this.$http.get('https://dndviewer-6683c.firebaseio.com/' + ".json")
                .then(response => {
                  this.cats = response.data;
                  //console.log("this.cats: " + this.cats);
                  // this.currentCat = response.data;
                }).bind(this)
                .catch(error => {
                  console.log(error)
                })

           },
           getLocation() {
              this.$http.get('https://dndlocation-f4256.firebaseio.com/' + ".json")
                .then(response => {
                  this.previousLocation = response.data;
                  //console.log("this.cats: " + this.cats);
                  // this.currentCat = response.data;
                }).bind(this)
                .catch(error => {
                  console.log(error)
                })

           },
          addCat() {
            // ensure they actually typed something
            if(!this.name) return;
            
            this.$http.post('https://dndviewer-6683c.firebaseio.com/' + ".json", 
            {
              // the data to post
              turn: this.turn,
              name: this.name,
              quantity: this.quantity,
              image: this.image, 
              total: this.quantity,
              dead: false,
              bloody: false
            }).then((response) => {
                this.getList();
              })
            this.turn = '';
            this.name = '';
            this.quantity = '';
            this.image = '';
          },
          addHealth(item, index) {
            const roundedTotal = Math.round(item.total/2);
            if(item.quantity < roundedTotal) {
              item.bloody = true;
            }
            if(item.quantity > roundedTotal) {
              item.bloody = false;
            }
            this.updatedQuantity = item.quantity;
            this.updatedQuantity++;
            item.quantity = this.updatedQuantity;

            this.$http.patch('https://dndviewer-6683c.firebaseio.com/' + index + ".json", 
            {
              // the data to post
              quantity: this.updatedQuantity,
              bloody: item.bloody
            }).then((response) => {
                this.getList();
              })
          },
          removeHealth(item, index) {
            const roundedTotal = Math.round(item.total/2);
            if(item.quantity < roundedTotal) {
              item.bloody = true;
            }
            if(item.quantity > roundedTotal) {
              item.bloody = false;
            }
            this.updatedQuantity = item.quantity;
            this.updatedQuantity--;
            item.quantity = this.updatedQuantity;

            this.$http.patch('https://dndviewer-6683c.firebaseio.com/' + index + ".json", 
            {
              // the data to post
              quantity: this.updatedQuantity,
              bloody: item.bloody
            }).then((response) => {
                this.getList();
              })
          },
          deadCat(item, index) {
            this.dead = true;
            this.$http.patch('https://dndviewer-6683c.firebaseio.com/' + index + ".json", 
            {
              // the data to post
              dead: this.dead,
            }).then((response) => {
                this.getList();
              })
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
              });
          },
          setLocation(currentLocation) {

            if(this.previousLocation != '') {
              this.$http.delete('https://dndlocation-f4256.firebaseio.com/' + this.previousLocation + ".json", 
              {
                
              }).then((response) => {
                this.previousLocation = '';
              });
            }
            
            this.$http.patch('https://dndlocation-f4256.firebaseio.com/' + this.currentLocation + ".json", 
            {
              // the data to post
              currentLocation
            }).then((response) => {
                this.previousLocation = this.currentLocation;
              })
          }
          // nextTurn(item, index) {
          //   console.log("orderedCats: " + this.orderedCats[1].turn);
          //   this.sortedCats.turn = item.turn + 1;
          //   //this.setState(orderedCats);
          // }
      },
      computed:{
        sortedCats: function() {
          this.orderedCats = _.orderBy(this.cats, 'turn');
          return _.slice(_.orderBy(this.cats, 'turn'),0,1);
        }
      }    
    })
}
