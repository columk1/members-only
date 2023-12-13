const newMessageDialog = document.querySelector('.new-message-dialog')
const newMessageBtn = document.getElementById('new-message-btn')
const closeMessageDialogBtn = document.querySelector('.new-message-dialog .close-btn')

newMessageBtn.addEventListener('click', () => newMessageDialog.showModal())
closeMessageDialogBtn.addEventListener('click', () => newMessageDialog.close())
