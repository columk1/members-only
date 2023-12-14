const newMessageDialog = document.querySelector('.new-message-dialog')
const newMessageBtn = document.getElementById('new-message-btn')
const deleteBtns = document.querySelectorAll('.delete-btn')
const closeMessageDialogBtn = document.querySelector('.new-message-dialog .close-btn')

newMessageButton && newMessageBtn.addEventListener('click', () => newMessageDialog.showModal())
closeMessageDialogBtn.addEventListener('click', () => newMessageDialog.close())

deleteBtns &&
  deleteBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
      fetch('/messages/delete/' + e.target.dataset.id, { method: 'POST' })
        .then(function (response) {
          if (response.ok) {
            console.log('Click delete was recorded')
            return
          }
          throw new Error('Request failed.')
        })
        .catch(function (error) {
          console.log(error)
        })
    })
  })
