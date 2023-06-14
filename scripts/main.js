import firebase from "./firebase.js";
import {
      getDatabase ,get, ref, set, push,remove, onChildAdded, onChildChanged, onChildRemoved 
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { createTableRow, removeTableRow, updateTableRow, createActionButton } from "./processes.js";

const form = document.getElementById('contact-form');
const database = getDatabase(firebase.app)
const messagesRef = ref(database, 'messages')

const successMessage = document.getElementById('success-message');
const tableBody = document.getElementById('table-body');

form.addEventListener('submit', async (event) => {
     event.preventDefault(); // Prevent form from submitting

     const name = document.getElementById('name').value;
     const email = document.getElementById('email').value;
     const message = document.getElementById('message').value;

     try {
          const newMessageRef = push(messagesRef);
          const messageId = newMessageRef.key;
      
          await set(newMessageRef, {
            name,
            email,
            message
          });
          successMessage.textContent = 'Data submitted successfully!';
          successMessage.style.backgroundColor = '#b2dfb4'; 
          successMessage.style.marginBottom = '10px'; 

          setTimeout(() => {
               successMessage.textContent = '';
               successMessage.style.backgroundColor = ''; 
               successMessage.style.marginBottom = ''; 
          }, 3000);
          form.reset();
        } catch (error) {
          successMessage.textContent = 'An error occurred!';
          successMessage.style.backgroundColor = '#ac2525'; 
          successMessage.style.marginBottom = '10px'; 
          console.log(`An error occurred: ${error}`);
        }

})

// Event handler for new child added
onChildAdded(messagesRef, (snapshot) => {
     const messageData = snapshot.val();
     const messageId = snapshot.key;
   
     // Add a new row to the table
     createTableRow(messageData, messageId);
});
   
   // Event handler for child changed
onChildChanged(messagesRef, (snapshot) => {
     const messageData = snapshot.val();
     const messageId = snapshot.key;
   
     // Update the corresponding row in the table
     updateTableRow(messageId, messageData);
});
   
   // Event handler for child removed
onChildRemoved(messagesRef, (snapshot) => {
     const messageId = snapshot.key;
   
     // Remove the corresponding row from the table
     removeTableRow(messageId);
});
   
// Delete the message from the database
export const deleteMessage = (messageId) => {
     const messageRef = ref(database, `messages/${messageId}`)
     remove(messageRef)
       .then(() => {
         console.log('Message deleted successfully');
       })
       .catch((error) => {
         console.error('Error deleting message:', error);
       });
};

// Edit the users data
export const editMessage = (messageId) => {
  const messageRef = ref(database, `messages/${messageId}`);

  // Retrieve the existing message data
  get(messageRef)
    .then((snapshot) => {
      const messageData = snapshot.val();

      // Create modal container element
      const modalContainer = document.createElement('div');
      modalContainer.classList.add('modal-container');

      // Create modal element
      const modal = document.createElement('div');
      modal.classList.add('modal');

      // Create input fields for editing the message data
      const nameInput = createInputField('name', messageData.name);
      const emailInput = createInputField('email', messageData.email);
      const messageInput = createInputField('message', messageData.message);

      // Create update button
      const updateButton = createActionButton('Update', 'update-button');

      // Add event listener to the update button
      updateButton.addEventListener('click', () => {
        const updatedData = {
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value
        };

        // Update the message data in the database
        set(messageRef, updatedData)
          .then(() => {
            console.log('Message updated successfully');
            closeModal();
          })
          .catch((error) => {
            console.error('Error updating message:', error);
          });
      });

      // Append input fields and update button to the modal
      modal.appendChild(nameInput);
      modal.appendChild(emailInput);
      modal.appendChild(messageInput);
      modal.appendChild(updateButton);

      // Append the modal to the modal container
      modalContainer.appendChild(modal);

      // Append the modal container to the document body
      document.body.appendChild(modalContainer);

      // Function to close the modal
      const closeModal = () => {
        modalContainer.remove();
      };
    })
    .catch((error) => {
      console.error('Error retrieving message:', error);
    });
};


const createInputField = (name, value) => {
     const input = document.createElement('input');
     input.setAttribute('type', 'text');
     input.setAttribute('name', name);
     input.setAttribute('value', value);
     input.classList.add('input-field');
     return input;
};