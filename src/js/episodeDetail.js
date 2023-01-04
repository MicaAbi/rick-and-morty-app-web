console.log('Welcome to episode detail');

const pageTitle = document.querySelector('title')
const navigation = document.querySelector('.navigation-name-item')
const episodeName = document.querySelector('.episode-name')
const episodeDate = document.querySelector('.episode-date')
const episodeCode = document.querySelector('.episode-code')
const characterGender = document.querySelector('.character-gender')
const characterOrigin = document.querySelector('.character-origin')
const characterLocation = document.querySelector('.character-location')

const getEpisodeData = () => {
    const episodeData = localStorage.getItem('episodeDetail')
    const episode = JSON.parse(episodeData)

    console.log(episode);
    pageTitle.innerText += episode.name
    navigation.textContent += episode.name
    episodeName.textContent += episode.name
    episodeDate.textContent += episode.air_date
    episodeCode.textContent += episode.episode
}

getEpisodeData()