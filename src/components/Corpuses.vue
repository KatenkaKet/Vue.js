<template>
  <p>
    Тут должны быть корпусы
  </p>
  <DataTable
    :value="corpuses"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    @page="onPageChange"
    responsive-layout="scroll"
    :laading="true"
    :first="offset"
    >
    <Column field="id" header="id"/>
    <Column field="name" header="Наименование"/>
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable';
import { Column } from 'primevue/column';
import {useDataStore} from '@/stores/dataStore.js';
export default {
  name: "Corpuses",
  components: {DataTable, Column},
  data(){
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0
    }
  },
  computed:{
    corpuses(){
      return this.dataStore.corpuses;
    },
    corpuses_total(){
      return this.dataStore.corpuses_total;
    }
  },
  mounted(){
    console.log('Corpuses component mounted!');
    this.dataStore.get_corpuses();
    this.dataStore.get_corpuses_total();
    console.log();
  },
  methods:{
    onPageChange(event){
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_corpuses(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>

<style scoped>

</style>
