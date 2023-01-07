// Endpoint characters
const rym_api_character = (list) => `https://rickandmortyapi.com/api/character/${list}`

// Location Data
const getLocationData = () => {
    let locationData = localStorage.getItem('locationDetail')
    let location = JSON.parse(locationData)

    return location
}

const place = getLocationData()

// LIST CHARACTERS

const getCharacterID = (location) => {
    const characters = location.residents

    let lastSlash = characters[0].lastIndexOf('/')
    let charactersIdList = []

    characters.forEach(character => {
        const characterID = parseInt(character.slice(lastSlash + 1))
        charactersIdList.push(characterID)
    })

    return charactersIdList
}

const getCharactersData = async (list) => {
    const res = await fetch(rym_api_character(list))
    const data = await res.json()

    return data;
}

const charactersListContainer = document.querySelector('.item-container__links-list')

const listCharacters = async (location) => {

    const characterIdList = getCharacterID(location)
    const charactersData = await getCharactersData(characterIdList)

    if (Array.isArray(charactersData)) {
        const charactersName = []

        charactersData.forEach(character => {
            let { name } = character
            const characterLink = document.createElement('a')
            characterLink.textContent = name
            characterLink.style.display = 'block'
            characterLink.classList.add('text-primary')
            characterLink.style.cursor = 'pointer'

            characterLink.addEventListener('click', (e) => {
                e.preventDefault()
                loadDetail(character)
            })

            charactersName.push(characterLink)
        })
        charactersListContainer.append(...charactersName)
        
    } else {
        const characterLink = document.createElement('a')
        characterLink.textContent = charactersData.name
        characterLink.style.display = 'block'
        characterLink.classList.add('text-primary')
        characterLink.style.cursor = 'pointer'
        
        characterLink.addEventListener('click', (e) => {
            e.preventDefault()
            loadDetail(charactersData)
        })
        charactersListContainer.append(characterLink)
    }
}

if (place.residents.length > 0) {
    listCharacters(place)
} else {
    const noResidents = document.createElement('p')
    noResidents.textContent = 'No registered residents'
    charactersListContainer.append(noResidents)
}

// SHOW INFORMATION

const pageTitle = document.querySelector('title')
const navigation = document.querySelector('.navigation-name-item')
const locationName = document.querySelector('.location-name')
const locationType = document.querySelector('.location-type')
const locationDimension = document.querySelector('.location-dimension')

pageTitle.innerText += ` ${place.name}`
navigation.textContent += place.name
locationName.textContent += place.name
locationType.textContent += place.type
locationDimension.textContent += place.dimension

// LOAD DETAIL

const loadDetail = async (character) => {
    localStorage.setItem('characterDetail', JSON.stringify(character))
    window.location = '../views/characterDetail.html'
}