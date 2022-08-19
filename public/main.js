// main.js
const deleteButton = document.querySelector('#delete-button')
const update = document.querySelector('#update-button')
const messageDiv = document.querySelector('#message')
update.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Darth Vader',
        quote: 'I find your lack of faith disturbing.'
      })
    })
  })

  deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Darth Vader'
      })
    })
    .then(response => {
      if (response === 'No quote to delete') {
        messageDiv.textContent = 'No Darth Vader quote to delete'
      } else {
        window.location.reload(true)
      }
    })
    .catch(error => console.error(error))
  })