/*
*BOOLZAPP
*/

const app = new Vue({
  el: "#app",
  data: {
    filmSearch:'',
    filmList:[],
    genres:[],
    title:'Tranding List di oggi scelta per te:'
  },
  created(){

    // get list of genres
    axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params:{
        api_key: '1d20eadc5e0813ee9b7d5503ab7d32d2',
      }
    })
    .then(response => {
      this.genres=(response.data.genres)
    })
    .catch(error => {
      console.log(error);
    })

    // initial page
    this.filmList = this.genres;
    // films trend of the day for initial page
    axios.get('https://api.themoviedb.org/3/trending/all/day', {
      params:{
        api_key: '1d20eadc5e0813ee9b7d5503ab7d32d2',
        language: 'it-IT',
      }
    })
    .then(response => {
      this.filmList=(response.data.results)
      this.title= 'Tranding List di oggi scelta per te:'
    })
    .catch(error => {
      console.log(error);
    })
  },
  methods: {
    add(){

      if (this.filmSearch == '') {

        this.filmList = this.genres;
        axios.get('https://api.themoviedb.org/3/trending/all/day', {
          params:{
            api_key: '1d20eadc5e0813ee9b7d5503ab7d32d2',
            language: 'it-IT',
          }
        })
        .then(response => {
          this.filmList=(response.data.results)
          this.title= 'Tranding List di oggi scelta per te:'

        })
        .catch(error => {
          console.log(error);
        })
      }


      // axios API movie
      axios.get('https://api.themoviedb.org/3/search/movie', {
        params:{
          api_key: '1d20eadc5e0813ee9b7d5503ab7d32d2',
          language: 'it-IT',
          query: this.filmSearch,
        }
      })

      .then(response => {
        this.filmList=(response.data.results)
        this.title= 'La tua ricerca per : ' + this.filmSearch
      })

      .catch(error => {
        console.log(error);
      })

      // axios API seriestv
      axios.get('https://api.themoviedb.org/3/search/tv', {
        params:{
          api_key: '1d20eadc5e0813ee9b7d5503ab7d32d2',
          language: 'it-IT',
          query: this.filmSearch,
        }
      })
      .then(response => {
        this.filmList=this.filmList.concat(response.data.results)
      })

      .catch(error => {
        console.log(error);
      })

    },
    // round up vote
    getVote(vote){
      return Math.ceil(vote / 2);
    },

  }


});
