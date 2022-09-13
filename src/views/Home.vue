<template>
    <div class="min-h-screen bg-gray py-10">
      <div class="flex justify-center mb-5">
        <div class="w-full flex justify-around">
          <button @click="openForm" class="duration-300 border-2 border-secondary-color text-secondary-color hover:bg-secondary-color hover:text-gray rounded-lg px-3 py-1.5" >
            {{ titleButton }}
          </button>

          <div class="duration-300 border-2 border-secondary-color bg-secondary-color text-gray rounded-lg px-3 py-1.5">
            {{ students.length }} תלמידים
          </div>
        </div>

      </div>

      <Form
          v-if="open"
          @onSubmit="onSubmit"
      />

      <Table :students="students" />
    </div>
</template>

<script setup>
import Form from '../components/Form.vue';
import Table from '../components/Table.vue';
import { ref } from "vue";
import { useStore } from 'vuex';

const store = useStore();
const students = ref([])
const open = ref(false);
const titleButton = ref('לרשום תלמיד');

getStudents();

async function getStudents() {
  const response = await store.dispatch('getStudents');
  students.value = response.data;
}

function openForm() {
  if(open.value) {
    if(!confirm('האם אתה בטוח?')) {
      return;
    }

    titleButton.value = 'לרשום תלמיד';
  } else {
    titleButton.value = 'ביטול רישום';
  }

  open.value = !open.value;
}

async function onSubmit() {
  alert('התלמיד נרשם בהצלחה');

  titleButton.value = 'לרשום תלמיד';
  open.value = !open.value;

  const response = await store.dispatch('getLastStudent');

  students.value.push(response.data);
  console.log(students.value)
  console.log(response.data)
}

</script>