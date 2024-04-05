import { contacts } from "./data.js";
import { responses } from "./data.js";
import { getRndInteger } from "./utility.js";
import Picker from './emoji-picker.js';

const dateTime = luxon.DateTime;

const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts,
      splashPage : true,
      activeID: '',
      newMessage: "",
      filterText: "",
      focusInputChat : false,
      contactStatus : "offline",
      deleteAllDropdown : false,
      showEmoji : false
    };
  },
  methods: {
    enterMain() {
      this.splashPage = !this.splashPage;
    },
    changeContact(id) {
      this.deleteAllDropdown = false; //reset header dropdown
      this.activeID = id;
    },
    createMessage(message, status) {
      const myMessage = {
        date: dateTime.now().setLocale("it").toFormat("HH:mm"),
        message,
        status,
        showDropdown: false,
      }; /* var for a new message sent */
      return myMessage;
    },
    addMessage() {
      /* console.log('yes'); */
      if (this.newMessage.trim() !== "") {
        this.activeContact.messages.push(
          this.createMessage(this.newMessage, "sent")
        );
        this.contactStatus = "writing";

        this.$nextTick(() => {
          this.$refs.msgs[this.$refs.msgs.length - 1].scrollIntoView({behavior: "smooth"})
        });
      
        const respons = responses[getRndInteger(0, 49)];
        setTimeout(() => {
          this.activeContact.messages.push(
            this.createMessage(respons, "received")
          );

          this.$nextTick(() => {
            this.$refs.msgs[this.$refs.msgs.length - 1].scrollIntoView({behavior: "smooth"})
          });    

          this.contactStatus = "online";
        }, 2000); /* timeout for a reply after 1 second */

        setTimeout(() => {
          this.contactStatus = "offline";
        }, 5000); /* timeout for reset status offline */
      }

      this.newMessage = "";
    },
    showDeleteDropdown(index) {
      /* console.log('im here'); */
      this.deleteAllDropdown = false; //reset header dropdown
      if (this.activeContact.messages[index].showDropdown === true) {
        this.activeContact.messages[
          index
        ].showDropdown = false; /* reset dropdown if u click again */
      } else {
        this.activeContact.messages.forEach(
          (message) => (message.showDropdown = false)
        ); //reset for close every other dropdown in the chat
        this.activeContact.messages[index].showDropdown = true;
      }
    },
    deleteMessage(index) {
      this.activeContact.messages.splice(
        index,
        1
      ); /* splice the message with index */
    },
    sendButton() {
      this.focusInputChat = !this.focusInputChat;
    },
    showDeleteAllDropdown() {
      this.deleteAllDropdown = !this.deleteAllDropdown;
      this.activeContact.messages.forEach(
        (message) => (message.showDropdown = false)
      ); //reset for close every other dropdown in the chat
    },
    deleteAllMessage() {
      this.activeContact.messages = [];
      this.deleteAllDropdown = false; //reset header dropdown
    },
    deleteChat() {
      console.log(this.activeContact);
      console.log(this.contacts);
      const currentIndex = this.contacts.findIndex((contact) => contact.id === this.activeID); /* find index of active contact */
      this.contacts.splice(currentIndex, 1); // delete contact
      if (this.contacts.length > 0) {
        this.activeID = (currentIndex > this.contacts.length - 1) ? this.contacts[currentIndex - 1].id : this.contacts[currentIndex].id; //set new active id with same index or index - 1 for last element of array
        this.deleteAllDropdown = false; //reset header dropdown
      }
    },
    onSelectEmoji(emoji) {
      console.log(emoji)
      this.newMessage += emoji.i;
      /*
        // result
        { 
            i: "😚", 
            n: ["kissing face"], 
            r: "1f61a", // with skin tone
            t: "neutral", // skin tone
            u: "1f61a" // without tone
        }
        */
    }
  },
  computed: {
    activeContact() {
      return this.contacts.find((element) => element.id === this.activeID);
    },
    filterContacts() {
      return this.contacts.filter((element) =>
        element.name.toLowerCase().includes(this.filterText.toLowerCase())
      );
    },
  },
  mounted() {},
}).component('Picker', Picker).mount("#app");
