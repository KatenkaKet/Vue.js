<template>
  <div class="flex justify-center">
    <form @submit.prevent="createCorpus" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center">Добавление корпуса</h2>
      <div class="flex flex-col">
        <InputText type="text" placeholder="Введите название" v-model="corpusName" />
      </div>
      <div class="mb-4 mt-4">
        <label
          for="file"
          id="file-label"
          class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2"
        >
          <span class="pi pi-upload mx-3">Выбрать изображение</span>
        </label>
        <input
          type="file"
          hidden
          id="file"
          name="file"
          @change="changeCorpus"
          required
          accept="image/*"
        />
      </div>
      <div class="flex flex-col mt-6">
        <Button type="submit" label="Создать" />
      </div>
    </form>
  </div>
  <Toast position="bottom-right" />   </template>

<script setup>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useDataStore } from '@/stores/dataStore.js';
import { useToast } from 'primevue/usetoast';
import { ref, reactive, computed } from 'vue';
import Toast from 'primevue/toast';  //Import Toast Component

const dataStore = useDataStore();
const toast = useToast();

const corpusName = ref('');
const categoryImage = ref(null);

const errorMessage = computed(() => dataStore.errorMessage);
const errorCode = computed(() => dataStore.errorCode);

const changeCorpus = (event) => {
  const file = event.target.files[0];
  if (file) {
    document.getElementById('file-label').innerHTML =
      '<span class="pi pi-file mx-3"></span>' + file.name;
    categoryImage.value = file;
  } else {
    document.getElementById('file-label').innerHTML =
      '<span class="pi pi-upload mx-3"></span>Выбрать изображение';
    categoryImage.value = null;
  }
};

const createCorpus = async () => {
  const formData = new FormData();
  formData.append('corpus_name', corpusName.value);
  formData.append('image', categoryImage.value);

  try {
    await dataStore.createCorpus(formData);

    if (errorCode.value) {
      toast.add({
        severity: 'error',
        summary: 'Ошибка добавления данных',
        detail: errorMessage.value, // Сообщение об ошибке из Vuex
        life: 4000,
      });
    } else {
      toast.add({
        severity: 'success',
        summary: 'Данные успешно добавлены',
        detail: "Корпус успешно создан!", // Текст при успехе
        life: 4000,
      });
    }
  } catch (error) {
    console.error('Error creating corpus:', error);

    if (error.response && error.response.status === 422) {
      // The error we care about
      let detailMessage = '';
      if (error.response.data.errors) {
        // If the API returns an array of error messages
        Object.values(error.response.data.errors).forEach(errorArray => {
          detailMessage += errorArray.join(',') + '<br/>'; // join multiple errors in a single array
        });
      } else {
        // If the API returns a simple error message
        detailMessage = error.response.data.message;
      }

      toast.add({
        severity: 'error',
        summary: 'Ошибка валидации',
        detail: detailMessage,
        life: 4000,
        escapeHTML: false, // Allows HTML rendering
      });
    }
    else {
      toast.add({
        severity: 'error',
        summary: 'Произошла ошибка',
        detail: "Не удалось создать корпус",
        life: 4000,
      });
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>


<style scoped>

</style>
