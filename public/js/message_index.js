const newMessageDialog = document.querySelector('.new-message-dialog')
const newMessageBtn = document.getElementById('new-message-btn')
const deleteBtns = document.querySelectorAll('.delete-btn')
const closeMessageDialogBtn = document.querySelector('.new-message-dialog .close-btn')

newMessageBtn && newMessageBtn.addEventListener('click', () => newMessageDialog.showModal())
closeMessageDialogBtn.addEventListener('click', () => newMessageDialog.close())

deleteBtns &&
  deleteBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
      fetch('/messages/delete/' + e.target.dataset.id, { method: 'POST' })
        .then(function (res) {
          if (res.ok) {
            window.location.reload()
            console.log('Message deleted')
            return
          }
          throw new Error('Request failed.')
        })
        .catch(function (error) {
          console.log(error)
        })
    })
  })
