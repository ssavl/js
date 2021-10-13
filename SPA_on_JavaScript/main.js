
const ready = () => {
    const getEl = document.getElementById('main')

    const buttonChange = document.getElementById('button')


    const event = () => {
        getEl.innerHTML = `<h1>Bye!</h1>`
    }

    buttonChange.addEventListener('click', event)
}

document.addEventListener('DOMContentLoaded', ready)