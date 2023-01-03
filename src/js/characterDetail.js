console.log('Welcome to the private life of the character');

const pageTitle = document.querySelector('title')
const navigation = document.querySelector('.navigation-name-character')
const characterImage = document.querySelector('.card-img-top')
const characterName = document.querySelector('.character-name')
const characterStatus = document.querySelector('.character-status')
const characterSpecies = document.querySelector('.character-species')
const characterGender = document.querySelector('.character-gender')
const characterOrigin = document.querySelector('.character-origin')
const characterLocation = document.querySelector('.character-location')

const getCharacterData = () => {
    const characterData = localStorage.getItem('characterDetail')
    const character = JSON.parse(characterData)

    console.log(character);
    pageTitle.innerText = character.name
    navigation.textContent += character.name
    characterImage.src = character.image
    characterName.textContent += character.name
    characterStatus.textContent += character.status
    characterSpecies.textContent += character.species
    characterGender.textContent += character.gender
    characterOrigin.textContent += character.origin.name
    characterLocation.textContent += character.location.name
}

getCharacterData()