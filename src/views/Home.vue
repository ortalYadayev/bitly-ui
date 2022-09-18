<template>
  <div class="min-h-screen flex bg-primary-color p-10">
    <div class="container m-auto">
      <div class="flex md:flex-row flex-col">
        <input
            v-model="payload.longLink"
            @keydown="resetErrors('longLink')"
            @keyup.enter="onSubmit()"
            name="longLink"
            placeholder="shorten your link"
            type="text"
            @input="shorten = false"
            class="duration-300 border-2 shadow-md tracking-wide rounded-lg bg-gray px-5 py-3 md:w-2/3 md:mr-2 mb-2 md:mb-0"
            :class="shorten ? 'text-blue-600' : 'text-primary-color'"
        >
        <button
            class="flex-1 duration-300 shadow-md rounded-lg md:text-lg tracking-wide bg-secondary-color opacity-80 hover:opacity-100 text-gray py-3"
            type="submit"
            value="Submit"
            @click="onSubmit"
        >
          Shorten
        </button>
      </div>
      <transition name="slide-fade">
        <div
            class="text-center bg-red-500 rounded-lg py-2 px-5 mt-4"
            v-if="errors.longLink || v$.longLink.$error"
        >
          <span
              class="text-gray"
          >

            {{ errors.longLink || v$.longLink.$errors[0].$message }}
            error
           </span>
        </div>
      </transition>

      <Table />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStore } from 'vuex';
import { helpers, maxLength, minLength, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Table from "../components/Table.vue";

const store = useStore();
const shorten = ref(false)
const payload = reactive({
  longLink: '',
});
const errors = ref({
  longLink: '',
});
const rule = {
  longLink: {
    required: helpers.withMessage('Please, write a valid url', required),
    minLength: helpers.withMessage(({$params}) => `Please, minimum ${$params.min} character`, minLength(2)),
    maxLength: helpers.withMessage(({$params}) => `Please, minimum ${$params.max} character`, maxLength(255)),
  },
};
const v$ = useVuelidate(rule, payload);

async function onSubmit() {
  v$.value.$touch();

  if (v$.value.$invalid) {
    setTimeout(() => resetErrors('longLink'), 5000);
    return;
  }

  try{
    const response = await store.dispatch('createShortLink', payload);
    payload.longLink = response.data.shortLink;
    shorten.value = true;
  } catch (error) {
    if (error.response.status === 422) {
      errors.value.longLink = error.response.data.message;
      setTimeout(() => resetErrors('longLink'), 5000);
    }
  }
}

function resetErrors(key) {
  v$.value[key].$reset();

  delete errors.value[key];
}

</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>