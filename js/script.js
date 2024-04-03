import { contacts } from "./data.js";

const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts,
      activeID : contacts[0].id
    }
  },
  methods: {
    changeContact(id) {
      this.activeID = id;
    }
  },
  computed: {
    activeContact() {
      return this.contacts.find((element) => element.id === this.activeID)
    }
  },
  mounted() {
    console.log(this.contacts);
  },
}).mount("#app");
