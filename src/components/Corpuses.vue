<template>
  <p>Тут должны быть корпусы</p>
  <div v-if="!dataStore.loading && !dataStore.errorMessage">
    <DataTable
      :value="corpuses"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="per_page"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="corpuses_total"
      @page="onPageChange"
      :first="offset"
    >
      <Column field="id" header="ID" />
      <Column field="corpus_name" header="Name" />
      <Column header="Изображение">
        <template #body="slotProps">
          <img
            v-if="slotProps.data.image_url"
            :src="slotProps.data.image_url"
            alt="Corpus Image"
            style="max-width: 100px; max-height: 100px"
          />
          <span v-else>Нет изображения</span>
        </template>
      </Column>
    </DataTable>
    <div class="text-end">
      <Button
        type="button"
        @click="this.$router.push('/createCorpus')"
        icon="pi pi-plus"
        label="Добавить корпус"
      />
    </div>
  </div>
  <div v-else-if="dataStore.loading">Loading...</div>
  <div v-else-if="dataStore.errorMessage">Error: {{ dataStore.errorMessage }}</div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useDataStore } from '@/stores/dataStore.js';
import Button from 'primevue/button';

export default {
  name: 'Corpuses_comp',
  components: { DataTable, Column, Button },
  data() {
    return {
      dataStore: useDataStore(),
      per_page: 5, // Use consistent naming
      offset: 0,
    };
  },
  computed: {
    corpuses() {
      return this.dataStore.corpuses;
    },
    corpuses_total() {
      return this.dataStore.corpuses_total;
    },
  },
  mounted() {
    console.log('Corpuses component mounted.');
    this.loadData(); // Load data on mount
  },
  methods: {
    async loadData() {
      await this.dataStore.get_corpuses(); // Load initial data
      await this.dataStore.get_corpuses_total();
      console.log('Corpuses loaded:', this.corpuses);
    },
    onPageChange(event) {
      this.offset = event.first;
      this.per_page = event.rows;
      const page = this.offset / this.per_page;
      this.dataStore.get_corpuses(page, this.per_page);
    },
  },
};
</script>
