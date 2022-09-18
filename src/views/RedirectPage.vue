<script setup>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

redirect();

async function redirect() {
  try{
    const response = await store.dispatch('getLongLink', route.params.id);
    console.log(response.data)

    window.location.href = response.data.link;
  } catch (error) {}
}

</script>
