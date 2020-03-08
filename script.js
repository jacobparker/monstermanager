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
          updatedQuantity: ''
          //,
          // currentSort: 'turn',
          // currentSortDir: 'asc'
        },
        mounted() {
          this.getList();

        },
        methods: {
          // sortTurn(s) {
          //   //if s == current sort, reverse
          //   if(s === this.currentSort) {
          //     this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
          //   }
          //   this.currentSort = s;
          // },
           getList() {
            
                 this.$http.get('https://dndviewer-6683c.firebaseio.com/' + ".json")
                .then(response => {
                  this.cats = response.data;
                  console.log("this.cats: " + this.cats);
                  // this.currentCat = response.data;
                }).bind(this)
                .catch(error => {
                  console.log(error)
                })

           },
           // setCurrentCat() {
           //    this.currentCat = this.cats[0];
           // },
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
          }
      },
      computed:{
        sortedCats: function() {
          return _.slice(_.orderBy(this.cats, 'turn'),0,1);
        }
        // ,
        // orderedCats: function() {
        //   return _.orderBy(this.cats, index);
        // }
      }    
    })
}
