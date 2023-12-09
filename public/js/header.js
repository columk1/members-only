const dialog = document.querySelector('dialog')
const joinBtn = document.getElementById('join-btn')
const closeBtn = document.getElementById('close-btn')

joinBtn.addEventListener('click', () => dialog.showModal())
closeBtn.addEventListener('click', () => dialog.close())
