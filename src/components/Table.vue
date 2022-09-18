<template>
  <div class="full-size-table rounded-lg sm:shadow-lg overflow-scroll mt-10">
    <table class="w-full bg-white shadow-lg">
      <tbody class="">
        <tr v-for="(link, index) in store.state.links" :key="index" class="border-gray border-b hover:bg-gray">
          <td class="flex-1 p-5">
            {{ link.shortLink }}
          </td>
          <td class="flex justify-end items-center p-5">
            <div class="text-blue-600">
              <a :href="link.longLink" :class="'link-'+index" target="_blank">
                {{ link.longLink }}
              </a>
            </div>
            <button
              @click="copyURL(index)"
              class="duration-300 text-gray rounded-lg px-5 py-2 ml-10"
              :class="indexCopy === index ? 'bg-green-600' : 'bg-secondary-color opacity-80 hover:opacity-100'"
            >
              {{ indexCopy == index ? 'copied' : 'copy' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";
import useClipboard from 'vue-clipboard3'

const store = useStore();

const indexCopy = ref(null);
const { toClipboard } = useClipboard()

async function copyURL(indexLink) {
  const link = store.state.links[indexLink];

  try {
    await toClipboard(link.shortLink);

    indexCopy.value = indexLink;
    setTimeout(() => indexCopy.value = null, 2000);
  } catch (e) {
    console.error(e)
  }
}
</script>