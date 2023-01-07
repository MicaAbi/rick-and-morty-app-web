// TOKEN VALIDATION
const userLogged = localStorage.getItem('userLogged')

if(!userLogged) {
    window.location = `./login.html`
}

// LOG OUT
const logout = document.querySelector('.logout')

logout.addEventListener('click', (e) => {
    localStorage.removeItem('userLogged')
    window.location = `./login.html`
})

// Endpoint characters
const rym_api_character = (list) => `https://rickandmortyapi.com/api/character/${list}`

// Episode Data
const getEpisodeData = () => {
    const episodeData = localStorage.getItem('episodeDetail')
    const episode = JSON.parse(episodeData)

    return episode
}

const episode = getEpisodeData()

// LIST CHARACTERS

const getCharacterID = (episode) => {
    const characters = episode.characters

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

const listCharacters = async (episode) => {

    const characterIdList = getCharacterID(episode)
    const charactersData = await getCharactersData(characterIdList)

    const charactersName = []

    charactersData.forEach(character => {
        let {name} = character
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
}

listCharacters(episode)

// SHOW INFORMATION

const pageTitle = document.querySelector('title')
const navigation = document.querySelector('.navigation-name-item')
const episodeName = document.querySelector('.episode-name')
const episodeNumber = document.querySelector('.episode-number')
const episodeDate = document.querySelector('.episode-date')
const episodeCode = document.querySelector('.episode-code')

pageTitle.innerText += ` ${episode.id}`
navigation.textContent += episode.name
episodeName.textContent += episode.name
episodeNumber.textContent += episode.id
episodeDate.textContent += episode.air_date
episodeCode.textContent += episode.episode

// LOAD DETAIL

const loadDetail = async (character) => {
    localStorage.setItem('characterDetail', JSON.stringify(character))
    window.location = './characterDetail.html'
}