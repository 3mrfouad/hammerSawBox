const givenWeights = document.querySelectorAll('.given-weight')
const guessBtn = document.querySelector('#guess-btn')
const reloadBtn = document.querySelector('#reload-btn')

const hammerSaw = document.querySelector('#hammer-saw')
const sawBox = document.querySelector('#saw-box')
const hammerBox = document.querySelector('#hammer-box')

const hammerSawBox = document.querySelector('#hammer-saw-box')

const hammer = document.querySelector('#hammer')
const saw = document.querySelector('#saw')
const toolbox = document.querySelector('#toolbox')

/* helper functions */
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getTotalWeight = () => {
  let totalWeight = 0
  givenWeights.forEach(givenWeight => {
    totalWeight += parseInt(givenWeight.value, 10)
  })
  return totalWeight * 0.5
}
const getHammerWeight = () => {
  return getTotalWeight() - parseInt(sawBox.value, 10)
}
const getSawWeight = () => {
  return getTotalWeight() - parseInt(hammerBox.value, 10)
}
const getToolboxWeight = () => {
  return getTotalWeight() - parseInt(hammerSaw.value, 10)
}
const getBackgroundColor = (guess, answer) => {
  return parseInt(guess.value, 10) === answer() ? '#00FF0080' : '#FF000080'
}
const resetGuess = input => {
  input.value = null
  input.style.backgroundColor = 'transparent'
}

guessBtn.addEventListener('click', () => {
  hammerSawBox.style.backgroundColor = getBackgroundColor(
    hammerSawBox,
    getTotalWeight
  )
  hammer.style.backgroundColor = getBackgroundColor(hammer, getHammerWeight)
  saw.style.backgroundColor = getBackgroundColor(saw, getSawWeight)
  toolbox.style.backgroundColor = getBackgroundColor(toolbox, getToolboxWeight)
})

reloadBtn.addEventListener('click', () => {
  resetGuess(hammerSawBox)
  resetGuess(hammer)
  resetGuess(saw)
  resetGuess(toolbox)
  initializeGame()
})

const initializeGame = () => {
  fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
      let randomIndex = random(0, data?.length)
      hammerSaw.value = data[randomIndex].hammer + data[randomIndex].saw
      sawBox.value = data[randomIndex].saw + data[randomIndex].box
      hammerBox.value = data[randomIndex].hammer + data[randomIndex].box
    })
    .catch(error => {
      alert('Error while loading game, try again later!')
      console.error(error.message)
    })
}

window.addEventListener('load', initializeGame)
