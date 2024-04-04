import { contacts } from "./data.js";

const dateTime = luxon.DateTime;

const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts,
      activeID : contacts[0].id,
      newMessage : '',
      filterText : ''
    }
  },
  methods: {
    changeContact(id) {
      this.activeID = id;
    },
    createMessage(message, status) {
      const myMessage = {
        date: dateTime.now().setLocale('it').toFormat('HH:mm'),
        message,
        status
      }; /* var for a new message sent */
      return myMessage;
    },
    addMessage() {
      /* console.log('yes'); */
      if (this.newMessage !== '') {
        this.activeContact.messages.push(this.createMessage(this.newMessage, 'sent'));
        this.newMessage = '';

        setTimeout(() => {
          this.activeContact.messages.push(this.createMessage('ok', 'received'));
        }, 1000); /* timeout for a reply after 1 second */
      }
    },
    showDeleteDropdown(index) {
      /* console.log('im here'); */
      if (this.activeContact.messages[index].showDropdown === true) {
        (this.activeContact.messages[index].showDropdown = false); /* reset dropdown if u click again */
      } else {
        (this.activeContact.messages[index].showDropdown = true);
      }
    }
  },
  computed: {
    activeContact() {
      return this.contacts.find((element) => element.id === this.activeID);
    },
    filterContacts() {
      return this.contacts.filter((element) => element.name.toLowerCase().includes(this.filterText.toLowerCase()));
    }
  },
  mounted() {
    console.log(this.contacts);
  },
}).mount("#app");
