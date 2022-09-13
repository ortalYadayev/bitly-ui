<template>
  <div class="flex justify-center items-center flex-col md:flex-row px-5 lg:px-0">
    <form
        class="w-full lg:w-1/2 rounded-xl shadow-md bg-white py-6 sm:py-8 px-5 lg:px-12"
        @submit.prevent="onSubmit"
        method="post"
    >
      <h1 class="text-center text-secondary-color text-2xl sm:text-4xl lg:text-5xl mb-6">
       טופס רישום תלמיד לשנה״ל תשפ״ב 2022
      </h1>

      <div class="flex flex-col sm:flex-row mb-2">
        <div class="flex flex-col w-full sm:w-1/2 md:w-1/4 mb-2 sm:ml-5">
          <input
              v-model="payload.institution"
              @keydown="resetErrors('institution', 'message')"
              name="institution"
              placeholder="מוסד"
              type="text"
              class="duration-150 border-2 text-black hover:text-secondary-color focus:text-secondary-color rounded-md px-3 py-1.5 mb-2"
              :class="errors.institution || v$.institution.$error ? 'border-red-400' : 'border-primary-color hover:border-secondary-color focus:border-secondary-color'"
          >
          <transition name="slide-fade">
          <span
              v-if="errors.institution || v$.institution.$error"
              class="italic text-xs text-red-500"
          >
            {{ errors.institution || v$.institution.$errors[0].$message }}
          </span>
          </transition>
        </div>

        <div class="flex flex-col sm:w-1/2 md:w-3/4 mb-2">
          <div class="flex items-center">
            <button @click="prevInstitution" class="flex-1 duration-150 border-2  border-secondary-color text-secondary-color hover:bg-secondary-color hover:text-gray rounded-md px-3 py-1.5">
              אוטומטי לפי הבחירה מהמסך הקודם
            </button>
          </div>
        </div>
      </div>

      <h2 class="sm:text-lg mb-2">
        פרטי התלמיד הנרשם:
      </h2>

      <div class="flex flex-col sm:flex-row mb-2">
        <div class="flex flex-col sm:w-1/2 mb-2 sm:ml-5">
          <input
              v-model="payload.id_student"
              @keydown="resetErrors('id_student', 'message')"
              name="id_student"
              placeholder="מספר תעודת זהות"
              type="text"
              class="duration-150 border-2 text-black hover:text-secondary-color focus:text-secondary-color rounded-md px-3 py-1.5 mb-2"
              :class="errors.id_student || v$.id_student.$error ? 'border-red-400' : 'border-primary-color hover:border-secondary-color focus:border-secondary-color'"
          >
          <transition name="slide-fade">
            <span
                v-if="errors.id_student || v$.id_student.$error"
                class="italic text-xs text-red-500"
            >
              {{ errors.id_student || v$.id_student.$errors[0].$message }}
            </span>
          </transition>
        </div>

        <div class="flex flex-col sm:w-1/2 mb-2">
          <div class="flex items-center">
            <label class="ml-2" for="birthDate">תאריך לידה</label>
            <input
                v-model="payload.birthDate"
                @input="resetErrors('birthDate', 'message')"
                id="birthDate"
                placeholder="תאריך לידה"
                type="date"
                class="flex-1 duration-150 border-2 text-black hover:text-secondary-color focus:text-secondary-color rounded-md px-3 py-1.5"
                :class="errors.birthDate || v$.birthDate.$error ? 'border-red-400' : 'border-primary-color hover:border-secondary-color focus:border-secondary-color'"
            >
          </div>
          <transition name="slide-fade">
            <span
                v-if="errors.birthDate || v$.birthDate.$error"
                class="italic text-xs text-red-500"
            >
              {{ errors.birthDate || v$.birthDate.$errors[0].$message }}
            </span>
          </transition>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row mb-2">
        <div class="flex flex-col sm:w-1/2 mb-2 sm:ml-5">
          <input
              v-model="payload.lastName"
              @keydown="resetErrors('lastName', 'message')"
              name="lastName"
              placeholder="שם משפחה"
              type="text"
              class="duration-150 border-2 text-black hover:text-secondary-color focus:text-secondary-color rounded-md px-3 py-1.5 mb-2"
              :class="errors.lastName || v$.lastName.$error ? 'border-red-400' : 'border-primary-color hover:border-secondary-color focus:border-secondary-color'"
          >
          <transition name="slide-fade">
            <span
                v-if="errors.lastName || v$.lastName.$error"
                class="italic text-xs text-red-500"
            >
              {{ errors.lastName || v$.lastName.$errors[0].$message }}
            </span>
          </transition>
        </div>

        <div class="flex flex-col sm:w-1/2 mb-2">
          <input
              v-model="payload.birthCountry"
              @keydown="resetErrors('birthCountry', 'message')"
              name="birthCountry"
              placeholder="ארץ לידה"
              type="text"
              class="duration-150 border-2 text-black hover:text-secondary-color focus:text-secondary-color rounded-md px-3 py-1.5 mb-2"
              :class="errors.birthCountry || v$.birthCountry.$error ? 'border-red-400' : 'border-primary-color hover:border-secondary-color focus:border-secondary-color'"
          >
          <transition name="slide-fade">
            <span
                v-if="errors.birthCountry || v$.birthCountry.$error"
                class="italic text-xs text-red-500"
            >
              {{ errors.birthCountry || v$.birthCountry.$errors[0].$message }}
            </span>
          </transition>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row mb-2">
        <div class="flex flex-col sm:w-1/2 mb-2 sm:ml-5">
          <input
              v-model="payload.firstName"
              @keydown="resetErrors('firstName', 'message')"
              name="firstName"
              placeholder="שם פרטי"
              type="text"
              class="duration-150 border-2 text-black hover:text-secondary-color focus:text-secondary-color rounded-md px-3 py-1.5 mb-2"
              :class="errors.firstName || v$.firstName.$error ? 'border-red-400' : 'border-primary-color hover:border-secondary-color focus:border-secondary-color'"
          >
          <transition name="slide-fade">
            <span
                v-if="errors.firstName || v$.firstName.$error"
                class="italic text-xs text-red-500"
            >
              {{ errors.firstName || v$.firstName.$errors[0].$message }}
            </span>
          </transition>
        </div>

        <div class="flex flex-col sm:w-1/2 mb-2">
          <div class="flex items-center">
            <label class="ml-2" for="immigration">תאריך עלייה</label>
            <input
                v-model="payload.immigration"
                id="immigration"
                type="date"
                class="flex-1 duration-150 border-2 text-black hover:text-secondary-color focus:text-secondary-color rounded-md px-3 py-1.5"
            >
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row mb-2">
        <div class="flex flex-col sm:w-1/2 sm:ml-5">
          <div class="px-3 py-1.5 mb-2">
            <label class="ml-4 text-primary-color">מין:</label>

            <input
                type="radio"
                v-model="payload.gender"
                id="male"
                value="male"
                class="duration-150 border-2 text-black hover:text-secondary-color focus:text-secondary-color rounded-md ml-2"
            >
            <label for="male" class="ml-4" >זכר</label>

            <input
                type="radio"
                v-model="payload.gender"
                id="female"
                value="female"
                class="duration-150 border-2 text-black hover:text-secondary-color focus:text-secondary-color rounded-md ml-2"
            >
            <label for="female">נקבה</label>
          </div>

          <transition name="slide-fade">
            <span
                v-if="v$.gender.$error"
                class="italic text-xs text-red-500 mb-2"
            >
              {{ v$.gender.$errors[0].$message }}
            </span>
          </transition>
        </div>

        <div class="flex flex-col sm:w-1/2 mb-2">
          <input
              v-model="payload.nation"
              @keydown="resetErrors('nation', 'message')"
              name="nation"
              placeholder="לאום"
              type="text"
              class="duration-150 border-2 text-black hover:text-secondary-color focus:text-secondary-color rounded-md px-3 py-1.5 mb-2"
              :class="errors.nation || v$.nation.$error ? 'border-red-400' : 'border-primary-color hover:border-secondary-color focus:border-secondary-color'"
          >
          <transition name="slide-fade">
            <span
                v-if="errors.nation || v$.nation.$error"
                class="italic text-xs text-red-500"
            >
              {{ errors.nation || v$.nation.$errors[0].$message }}
            </span>
          </transition>
        </div>
      </div>

      <div class="flex flex-col mb-2">
        <input
            v-model="payload.homePhone"
            @keydown="resetErrors('homePhone', 'message')"
            name="homePhone"
            placeholder="טלפון בבית"
            type="text"
            class="duration-150 border-2 text-black hover:text-secondary-color focus:text-secondary-color rounded-md px-3 py-1.5 mb-2"
            :class="errors.homePhone || v$.homePhone.$error ? 'border-red-400' : 'border-primary-color hover:border-secondary-color focus:border-secondary-color'"
        >
        <transition name="slide-fade">
          <span
              v-if="errors.homePhone || v$.homePhone.$error "
              class="italic text-xs text-red-500"
          >
            {{ errors.homePhone || v$.homePhone.$errors[0].$message }}
          </span>
        </transition>
      </div>

      <div class="flex flex-col mb-2">
        <input
            v-model="payload.mobilePhone"
            @keydown="resetErrors('mobilePhone', 'message')"
            name="mobilePhone"
            placeholder="טלפון נייד"
            type="text"
            class="duration-150 border-2 text-black hover:text-secondary-color focus:text-secondary-color rounded-md px-3 py-1.5 mb-2"
            :class="errors.mobilePhone || v$.mobilePhone.$error ? 'border-red-400' : 'border-primary-color hover:border-secondary-color focus:border-secondary-color'"
        >
        <transition name="slide-fade">
          <span
              v-if="errors.mobilePhone || v$.mobilePhone.$error"
              class="italic text-xs text-red-500"
          >
            {{ errors.mobilePhone || v$.mobilePhone.$errors[0].$message }}
          </span>
        </transition>
      </div>

      <div class="flex flex-col mb-2">
        <input
            v-model="payload.email"
            @keydown="resetErrors('email', 'message')"
            name="email"
            placeholder="e-mail"
            type="text"
            class="duration-150 border-2 text-black hover:text-secondary-color focus:text-secondary-color rounded-md px-3 py-1.5 mb-2"
            :class="errors.email || v$.email.$error ? 'border-red-400' : 'border-primary-color hover:border-secondary-color focus:border-secondary-color'"
        >
        <transition name="slide-fade">
          <span
              v-if="errors.email || v$.email.$error"
              class="italic text-xs text-red-500"
          >
            {{ errors.email || v$.email.$errors[0].$message }}
          </span>
        </transition>
      </div>

      <transition name="slide-fade">
          <span
              v-if="errors.message"
              class="italic text-xs text-red-500"
          >
            {{ errors.message }}
          </span>
        </transition>

      <div class="flex items-center justify-center mt-4">
        <button
            class="duration-300 shadow-md rounded-xl text-xl tracking-wide w-full bg-primary-color hover:bg-secondary-color text-gray font-medium py-2"
            type="submit"
            value="Submit"
        >
          הרשם
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'

const store = useStore();
const payload = reactive({
  institution: '',
  id_student: '',
  birthDate: Date,
  lastName: '',
  birthCountry: '',
  firstName: '',
  immigration: Date,
  gender: '',
  nation: '',
  homePhone: '',
  mobilePhone: '',
  email: '',
});
let emit = defineEmits(['onSubmit', 'update:id_student']);
let errors = ref({
  institution: '',
  id_student: '',
  birthDate: '',
  firstName: '',
  lastName: '',
  birthCountry: '',
  immigration: '',
  gender: '',
  nation: '',
  homePhone: '',
  mobilePhone: '',
  email: '',
});
const rules = {
  institution: {
    required: helpers.withMessage('שדה חובה!', required),
    minLength: helpers.withMessage(({$params}) => `לפחות ${$params.min} תווים!`, minLength(2)),
    maxLength: helpers.withMessage(({$params}) => `מקסימום ${$params.max} תווים!`, maxLength(255)),
  },
  id_student: {
    required: helpers.withMessage('שדה חובה!', required),
    minLength: helpers.withMessage(({$params}) => `חובה ${$params.min} תווים!`, minLength(9)),
    maxLength: helpers.withMessage(({$params}) => `חובה ${$params.max} תווים!`, maxLength(9)),
  },
  birthDate: {
    required: helpers.withMessage('שדה חובה!', required),
  },
  firstName: {
    required: helpers.withMessage('שדה חובה!', required),
    minLength: helpers.withMessage(({$params}) => `לפחות ${$params.min} תווים!`, minLength(2)),
    maxLength: helpers.withMessage(({$params}) => `מקסימום ${$params.max} תווים!`, maxLength(255)),
  },
  lastName: {
    required: helpers.withMessage('שדה חובה!', required),
    minLength: helpers.withMessage(({$params}) => `לפחות ${$params.min} תווים!`, minLength(2)),
    maxLength: helpers.withMessage(({$params}) => `מקסימום ${$params.max} תווים!`, maxLength(255)),
  },
  birthCountry: {
    required: helpers.withMessage('שדה חובה!', required),
  },
  gender: {
    required: helpers.withMessage('שדה חובה!', required),
  },
  nation: {
    required: helpers.withMessage('שדה חובה!', required),
    minLength: helpers.withMessage(({$params}) => `לפחות ${$params.min} תווים!`, minLength(2)),
    maxLength: helpers.withMessage(({$params}) => `מקסימום ${$params.max} תווים!`, maxLength(255)),
  },
  homePhone: {
    required: helpers.withMessage('שדה חובה!', required),
    minLength: helpers.withMessage(({$params}) => `לפחות ${$params.min} תווים!`, minLength(9)),
    maxLength: helpers.withMessage(({$params}) => `מקסימום ${$params.max} תווים!`, maxLength(9)),
  },
  mobilePhone: {
    required: helpers.withMessage('שדה חובה!', required),
    minLength: helpers.withMessage(({$params}) => `לפחות ${$params.min} תווים!`, minLength(10)),
    maxLength: helpers.withMessage(({$params}) => `מקסימום ${$params.max} תווים!`, maxLength(10)),
  },
  email: {
    required: helpers.withMessage('שדה חובה!', required),
    email: helpers.withMessage('כתובת מייל שגוי או לא נכון, נסה שנית.', email),
  },
};
const v$ = useVuelidate(rules, payload);

async function onSubmit() {
  v$.value.$touch();

  if (v$.value.$invalid) {
    return;
  }

  try {
    await store.dispatch('sign', payload);

    emit('onSubmit');
  } catch (error) {
    if (error.response.status === 400) {
      error.response.data.errors.map(error => {
        if(!errors.value[error.param]){
          errors.value[error.param] = error.msg;
        }
      })
    }
    if (error.response.status === 422) {
      errors.value.message = error.response.data.message;
    }
  }
}

function prevInstitution() {
  payload.institution = store.state.prevInstitution;
}

function resetErrors(key, message) {
  v$.value[key].$reset();
  delete errors.value[key];
  delete errors.value[message];
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>