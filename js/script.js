import { contacts } from "./data.js";

const dateTime = luxon.DateTime;

const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts,
      activeID : contacts[0].id,
      newMessage : '',
      filterText : '',
      focusInputChat : false,
      contactStatus : 'offline',
      deleteAllDropdown : false
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
        status,
        showDropdown: false
      }; /* var for a new message sent */
      return myMessage;
    },
    addMessage() {
      /* console.log('yes'); */
      if (this.newMessage.trim() !== '') {
        this.activeContact.messages.push(this.createMessage(this.newMessage, 'sent'));
        this.contactStatus = 'writing';

        setTimeout(() => {
          this.activeContact.messages.push(this.createMessage('ok', 'received'));
          this.contactStatus = 'online';
        }, 2000); /* timeout for a reply after 1 second */

        setTimeout(() => {
          this.contactStatus = 'offline';
        }, 5000); /* timeout for reset status offline */
      }

      this.newMessage = '';
    },
    showDeleteDropdown(index) {
      /* console.log('im here'); */
      this.deleteAllDropdown = false; //reset header dropdown
      if (this.activeContact.messages[index].showDropdown === true) {
        this.activeContact.messages[index].showDropdown = false; /* reset dropdown if u click again */
      } else {
        this.activeContact.messages.forEach((message) => message.showDropdown = false); //reset for close every other dropdown in the chat
        this.activeContact.messages[index].showDropdown = true;
      }
    },
    deleteMessage(index) {
      this.activeContact.messages.splice(index, 1); /* splice the message with index */
    },
    sendButton() {
      this.focusInputChat = !this.focusInputChat;
    },
    showDeleteAllDropdown() {
      this.deleteAllDropdown = !this.deleteAllDropdown;
      this.activeContact.messages.forEach((message) => message.showDropdown = false); //reset for close every other dropdown in the chat
    },
    deleteAllMessage() {
      this.activeContact.messages = [];
      this.deleteAllDropdown = false; //reset header dropdown
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
