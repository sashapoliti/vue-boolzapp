import { contacts } from "./data.js";

const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts,
      activeID : contacts[0].id
    }
  },
  methods: {},
  computed: {},
  mounted() {
    console.log(this.contacts);
  },
}).mount("#app");
