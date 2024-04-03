import { contacts } from "./data.js";

const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts,
      activeID : contacts[0].id,
      newMessage : ''
    }
  },
  methods: {
    changeContact(id) {
      this.activeID = id;
    },
    addMessage() {
      /* console.log('yes'); */
      if (this.newMessage !== '') {
        let myMessage = {
          date: '15:51',
          message: '',
          status: 'sent'
        }; /* var for a new message sent */

        myMessage.message = this.newMessage;
        this.activeContact.messages.push(myMessage);
        this.newMessage = '';

        setTimeout(() => {
          let replyMessage = {
            date: '15:52',
            message: 'ok',
            status: 'received'
          };
          this.activeContact.messages.push(replyMessage);
        }, 1000); /* timeout for a reply after 1 second */
      }
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
