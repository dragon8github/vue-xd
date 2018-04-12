<template>
 <div class="page">
  <div class="content">
    <div class="page-part page-switch-padding">
      <mt-switch v-model="value4" @change="handleChange"></mt-switch>
    </div>
   </div>
  </div>
</template>

<script>
import mtSwitch from 'components/switch/switch.vue'
export default {
  name: "Home",
  data () {
    return {
      value4:true
    }
  },
  components: {
      mtSwitch
    },
  methods: {
     handleChange(event) {
      console.log(event);
    }
  }
} 
</script>
