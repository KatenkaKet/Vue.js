import { defineStore } from 'pinia';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BASE_URL;

export const useDataStore = defineStore('data', {
  state: () => ({
    corpuses: [],
    corpuses_total: null,
    items: [],
    errorMessage: ""
  }),
  actions: {
    async get_corpuses(page = 0, per_page = 5) {
      this.errorMessage = "";
      try{
        const response = await axios.get(backendUrl + '/corpuses', {
          params: {
            page: page,
            per_page: per_page
          }
        });
      }catch(error){
        if(error.response){
          this.errorMessage = error.response.data.message;
        }else if (error.request){
          this.errorMessage = error.message;
        }
        console.log(error);
      }
    },
    async get_corpuses_total() {
      this.errorMessage = "";
      try{
        const response = await axios.get(backendUrl + '/corpuses_total');
        this.corpuses_total = response.data;
      } catch (error) {
        if(error.response){
          this.errorMessage = error.response.data.message;
        }else if (error.request){
          this.errorMessage = error.message;
        }
        console.log(error);
      }
    }
  }
});

