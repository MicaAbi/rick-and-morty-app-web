// Endpoint episodes
const rym_api_episode = (list) => `https://rickandmortyapi.com/api/episode/${list}`

// Character detail
const getCharacterData = () => {
    const characterData = localStorage.getItem('characterDetail')
    const character = JSON.parse(characterData)

    return character
}

const character = getCharacterData()

// LIST EPISODES

const getEpisodeNumbers = (character) => {
    const episodes = character.episode

    let lastSlash = episodes[0].lastIndexOf('/')
    let episodeList = []

    episodes.forEach(episode => {
        const episodeNumber = parseInt(episode.slice(lastSlash + 1))
        episodeList.push(episodeNumber)
    })

    return episodeList
}

const getEpisodesData = async (list) => {
    const res = await fetch(rym_api_episode(list))
    const data = await res.json()

    return data;
}

const episodesListContainer = document.querySelector('.item-container__links-list')

const listEpisodes = async (character) => {

    const episodeList = getEpisodeNumbers(character)
    const episodesData = await getEpisodesData(episodeList)

    const episodesName = []

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

            episodesName.push(episodeLink)
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
        episodesName.push(episodeLink)
    }

    episodesListContainer.append(...episodesName)
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