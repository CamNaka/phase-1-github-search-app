
const form = document.getElementById('github-form')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const target = event.target[0].value

  fetch(`https://api.github.com/search/users?q=${target}`)
  .then(response => response.json())
  .then(response => {
    const userList = document.querySelector('#user-list')
    const repoList = document.getElementById('repos-list')
    repoList.innerHTML = ''
    userList.innerHTML = ''
    response.items.map(items => {
      const li = document.createElement('li')
      const h2 = document.createElement('h2')
      h2.textContent = items.login
      h2.addEventListener('click', e => showUserRepos(items.login, e))
      const img = document.createElement('img')
      img.src = items.avatar_url


      li.append(h2, img)
      userList.append(li)

    })
    //event.target[0].value = ''
  })
  form.reset()
})





function showUserRepos(username, e) {
  const repoList = document.getElementById('repos-list')
  repoList.innerHTML = ''
  e.preventDefault()
  fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(response => response.map(repo => {
    const li = document.createElement('li')
    const h1 =  document.createElement('h1')
    h1.textContent = repo.name
    //const repoList = document.getElementById('repos-list')
    li.append(h1)
    repoList.append(h1)
   
  }))
}


