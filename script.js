window.onload = function () {

    const app = new Vue({
        el:'#app',
        data: {
          cats:[],
          currentCat: [],
          turn: '',
          name:'',
          quantity: '',
          total: '',
          dead: false,
          bloody: false,
          inEditMode: false,
          image: '',
          updatedTurn: '',
          updatedName: '',
          updatedQuantity: '',
          currentSort: 'turn',
          currentSortDir: 'asc'
        },
        mounted() {
          this.getList();
        },
        methods: {
           getList() {
            
                 this.$http.get('https://dndviewer-6683c.firebaseio.com/' + ".json")
                .then(response => {
                  this.cats = response.data;
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
              bloody: false,
              inEditMode: false
            }).then((response) => {
                this.getList();
              })
            this.turn = '';
            this.name = '';
            this.quantity = '';
            this.image = '';
          },
          editItem(item, index){
              item.inEditMode = true;
          },
          editItemComplete(item, index) {
            //determine if monster is bloody
            const roundedTotal = Math.round(item.total/2);
            if(item.quantity <= roundedTotal) {
              item.bloody = true;
            }

            item.inEditMode = false;
            this.updatedTurn = item.turn;
            this.updatedName = item.name;
            this.updatedQuantity = item.quantity;
            this.$http.patch('https://dndviewer-6683c.firebaseio.com/' + index + ".json", 
            {
              // the data to post
              turn: this.updatedTurn,
              name: this.updatedName,
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
      }    
    })
}
