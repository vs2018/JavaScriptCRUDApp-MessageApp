import { http } from './http'
import { ui } from './ui'

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts)

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost)

// List for edit state
document.querySelector('#posts').addEventListener('click', enableEdit)

function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err))
}

function submitPost(){
  const title = document.querySelector('#title').value
  const body = document.querySelector('#body').value

  const data = {
    title,
    body
  }

  //Create Post
  http.post('http://localhost:3000/posts', data)
  .then(data => {
    ui.showAlert('Post added', 'alert alert-success')
    ui.clearFields()
    getPosts()
  })
  .catch(err => console.log(err))
}

// Enable Edit State
function enableEdit(e){
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id

    const body = e.target.parentElement.previousElementSibling.textContent

    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent

    const data = {
      id,
      title,
      body
    }

    // Film form with current post
    ui.fillForm(data)

  }
  

  e.preventDefault()
}