// TOKEN VALIDATION
const userLogged = localStorage.getItem('userLogged')

if(!userLogged) {
    window.location = `./src/views/login.html`
}

// LOG OUT
const logout = document.querySelector('.logout')

logout.addEventListener('click', (e) => {
    localStorage.removeItem('userLogged')
    window.location = `./src/views/login.html`
})

// Endpoint episodes
const rym_api_episode = (list) => `https://rickandmortyapi.com/api/episode/${list}`
const rym_api_location = (id) => `https://rickandmortyapi.com/api/location/${id}`

// Character Data
const getCharacterData = () => {
    const characterData = localStorage.getItem('characterDetail')
    const character = JSON.parse(characterData)

    return character
}

const character = getCharacterData()

// LIST EPISODES

const getEpisodeID = (character) => {
    const episodes = character.episode

    let lastSlash = episodes[0].lastIndexOf('/')
    let episodeIdList = []

    episodes.forEach(episode => {
        const episodeID = parseInt(episode.slice(lastSlash + 1))
        episodeIdList.push(episodeID)
    })

    return episodeIdList
}

const getEpisodesData = async (list) => {
    const res = await fetch(rym_api_episode(list))
    const data = await res.json()

    return data;
}

const episodesListContainer = document.querySelector('.item-container__links-list')

const listEpisodes = async (character) => {

    const episodeIdList = getEpisodeID(character)
    const episodesData = await getEpisodesData(episodeIdList)

    const episodesList = []

    if (Array.isArray(episodesData)) {
        episodesData.forEach(episode => {
            let { id, name } = episode
            const episodeLink = document.createElement('a')
            episodeLink.textContent = `Episode ${id} - ${name}`
            episodeLink.style.display = 'block'
            episodeLink.classList.add('text-primary')
            episodeLink.style.cursor = 'pointer'

            episodeLink.addEventListener('click', (e) => {
                e.preventDefault()
                loadDetail(episode)
            })

            episodesList.push(episodeLink)
        })
    } else {
        let { id, name } = episodesData
        const episodeLink = document.createElement('a')
        episodeLink.textContent = `Episode ${id} - ${name}`
        episodeLink.classList.add('text-primary')
        episodeLink.style.cursor = 'pointer'

        episodeLink.addEventListener('click', (e) => {
            e.preventDefault()
            loadDetail(episodesData)
        })
        episodesList.push(episodeLink)
    }

    episodesListContainer.append(...episodesList)
}

listEpisodes(character)

// SHOW INFORMATION

const pageTitle = document.querySelector('title')
const navigation = document.querySelector('.navigation-name-item')
const characterImage = document.querySelector('.card-img-top')
const characterName = document.querySelector('.character-name')
const characterStatus = document.querySelector('.character-status')
const characterSpecies = document.querySelector('.character-species')
const characterGender = document.querySelector('.character-gender')
const characterOrigin = document.querySelector('.character-origin')
const characterLocation = document.querySelector('.character-location')

pageTitle.innerText = character.name
navigation.textContent += character.name
characterImage.src = character.image
characterName.textContent += character.name
characterStatus.textContent += character.status
characterSpecies.textContent += character.species
characterGender.textContent += character.gender
characterOrigin.textContent += character.origin.name
characterLocation.textContent += character.location.name


// LOAD DETAIL

const loadDetail = async (episode) => {
    localStorage.setItem('episodeDetail', JSON.stringify(episode))
    window.location = '../views/episodeDetail.html'
}

// REDIRECT TO LOCATION

const loadLocation = async (location) => {
    localStorage.setItem('locationDetail', JSON.stringify(location))
    window.location = '../views/locationDetail.html'
}


characterLocation.addEventListener('click', async (e) => {
    e.preventDefault();

    if(character.location.url) {
        const urlLocation = character.location.url
        const lastSlash = urlLocation.lastIndexOf('/')
        const locationID = parseInt(urlLocation.slice(lastSlash + 1))
        
        const res = await fetch(rym_api_location(locationID))
        const data = await res.json()
    
        loadLocation(data)
    } else {
        alert('Unknown location!')
    }
})

characterOrigin.addEventListener('click', async (e) => {
    e.preventDefault()

    if(character.origin.url) {
        const urlOrigin = character.origin.url
        const lastSlash = urlOrigin.lastIndexOf('/')
        const originID = parseInt(urlOrigin.slice(lastSlash + 1))
        
        const res = await fetch(rym_api_location(originID))
        const data = await res.json()
    
        loadLocation(data)
    } else {
        alert('Unknown origin!')
    }
})