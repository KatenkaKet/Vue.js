<template>
  <p>Тут должны быть комнаты</p>
  <div v-if="!dataStore.loadingRooms && !dataStore.errorMessageRooms">
    <DataTable
      :value="rooms"
      :lazy="true"
      :loading="dataStore.loadingRooms"
      :paginator="true"
      :rows="per_page"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="rooms_total"
      @page="onPageChange"
      :first="offset"
    >
      <Column field="id" header="ID" />
      <Column field="corpus_id" header="Corpus ID" />
      <Column field="room_number" header="Room Number" />
      <Column field="bed_number" header="Bed Number" />
      <Column field="price" header="Price" />
    </DataTable>
  </div>
  <div v-else-if="dataStore.loadingRooms">Loading...</div>
  <div v-else-if="dataStore.errorMessageRooms">Error: {{ dataStore.errorMessageRooms }}</div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from "@/stores/dataStore.js";

export default {
  name: "Room_comp",
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      per_page: 5,
      offset: 0,
    };
  },
  computed: {
    rooms() {
      return this.dataStore.rooms;
    },
    rooms_total() {
      return this.dataStore.rooms_total;
    },
  },
  mounted() {
    console.log("Rooms component mounted.");
    this.loadData();
  },
  methods: {
    async loadData() {
      await this.dataStore.get_rooms();
      await this.dataStore.get_rooms_total();
      console.log("Rooms loaded:", this.rooms);
    },
    onPageChange(event) {
      this.offset = event.first;
      this.per_page = event.rows;
      const page = this.offset / this.per_page;
      this.dataStore.get_rooms(page, this.per_page);
    },
  },
};
</script>

<style scoped></style>
