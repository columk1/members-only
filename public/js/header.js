const joinDialog = document.querySelector('.join-dialog')
const joinBtn = document.getElementById('join-btn')
const closeJoinDialogBtn = document.querySelector('.join-dialog .close-btn')

joinBtn.addEventListener('click', () => joinDialog.showModal())
closeJoinDialogBtn.addEventListener('click', () => joinDialog.close())
