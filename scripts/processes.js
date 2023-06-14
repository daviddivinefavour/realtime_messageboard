import { deleteMessage, editMessage } from "./main.js";
const tableBody = document.getElementById('table-body');

// Create a new table row and append it to the table body
export const createTableRow = (messageData, messageId) => {
  const row = document.createElement('tr');
  row.id = `row-${messageId}`;

  const idCell = createTableCell(messageId);
  const nameCell = createTableCell(messageData.name, 'name-cell');
  const emailCell = createTableCell(messageData.email, 'email-cell');
  const messageCell = createTableCell(messageData.message, 'message-cell');
  const actionsCell = createActionsCell(messageId);

  row.append(idCell, nameCell, emailCell, messageCell, actionsCell);
  tableBody.appendChild(row);
};

// Create a table cell with the provided text content
const createTableCell = (textContent, className = '') => {
     const cell = document.createElement('td');
     cell.textContent = textContent;
     if (className) {
       cell.classList.add(className);
     }
     return cell;
};

// Create the actions cell with edit and delete buttons
const createActionsCell = (messageId) => {
  const cell = document.createElement('td');

  const editButton = createActionButton('Edit', 'edit-button', messageId);
  const deleteButton = createActionButton('Delete', 'delete-button', messageId);

  cell.append(editButton, deleteButton);
  return cell;
};

// Create an action button with the provided label, class, and data-id attribute
export const createActionButton = (label, className, dataId) => {
     const button = document.createElement('button');
     button.textContent = label;
     button.className = className;
     button.dataset.id = dataId;
   
     // Add event listener for edit button
     if (className === 'edit-button') {
       button.addEventListener('click', () => {
         editMessage(dataId);
       });
     }
   
     // Add event listener for delete button
     if (className === 'delete-button') {
       button.addEventListener('click', () => {
         deleteMessage(dataId);
       });
       button.classList.add('delete-button-style');
     }
   
     return button;
};

// Update the table row with the provided message data
export const updateTableRow = (messageId, newData) => {
  const row = document.getElementById(`row-${messageId}`);
  if (row) {
    const nameCell = row.querySelector('.name-cell');
    const emailCell = row.querySelector('.email-cell');
    const messageCell = row.querySelector('.message-cell');

    nameCell.textContent = newData.name;
    emailCell.textContent = newData.email;
    messageCell.textContent = newData.message;
  }
};

// Remove the table row with the specified message id
export const removeTableRow = (messageId) => {
  const row = document.getElementById(`row-${messageId}`);
  if (row) {
    row.remove();
  }
};

