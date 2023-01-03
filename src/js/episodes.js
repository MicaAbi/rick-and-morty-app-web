console.log('Welcome to the episodes section');

// ENDPOINTS RICK&MORTY API
const rym_api_base = 'https://rickandmortyapi.com/api'
const rym_api_episodes = `${rym_api_base}/episode/?page=`
const rym_api_single_episode = (id) => {
    return `${rym_api_base}/episode/${id}`
}

// FETCH FUNCTIONS

// Get all episodes
const getAllEpisodes = async (page) => {
    try {
        const res = await fetch(`${rym_api_episodes}${page}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
    } finally {
        console.log(`${rym_api_episodes}${page}`);
    }
}

// CARD CREATION

const createCard = (episode) => {
    const card = document.createElement('div')
    card.classList.add('card')

    // const episodeImg = document.createElement('img')
    // episodeImg.classList.add('card-img-top')
    // episodeImg.src = episode.image
    // episodeImg.alt = episode.name
    // card.append(episodeImg)

    const link = document.createElement('a')
    link.style.cursor ='pointer'
    link.dataset.id = episode.id
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    const episodeTitle = document.createElement('h6')
    episodeTitle.textContent = episode.name

    cardBody.appendChild(episodeTitle)
    link.appendChild(cardBody)
    card.append(link)

    link.addEventListener('click', (e) => {
        e.preventDefault();
        loadDetail(link.dataset.id)
    })

    return card
}

// PAGINATION

const paginate = (info, page) => {
    const navPag = document.createElement('nav')
    navPag.classList.add('col-12')
    navPag.ariaLabel = 'character pagination'
    
    const ul = document.createElement('ul')
    ul.classList.add('pagination')
    ul.classList.add('d-flex')
    ul.classList.add('flex-wrap')
    ul.classList.add('justify-content-center')

    // previous page
    const previousLi = document.createElement('li')
    previousLi.classList.add('page-item')
    const prevLink = document.createElement('a')
    prevLink.textContent = 'Prev'
    prevLink.classList.add('page-link')

    if(info.prev == null) {
        previousLi.classList.add('disabled')
    } else {
        previousLi.classList.remove('disable')
        prevLink.href = info.prev
    }
    
    previousLi.append(prevLink)
    ul.append(previousLi)

    // page number
    for(let i = 1; i <= info.pages ; i++) {

        const numberLi = document.createElement('li')
        numberLi.style.cursor = 'pointer'
        numberLi.classList.add('page-item')
        const linkNumPage = document.createElement('a')
        linkNumPage.textContent = i
        linkNumPage.classList.add('page-link')
        linkNumPage.dataset.pageNumber = i
        numberLi.append(linkNumPage)
        
        if(i == page) {
            numberLi.classList.add('active')
        }

        numberLi.addEventListener('click', (e) => {
            e.preventDefault();
            loadEpisodes(linkNumPage.dataset.pageNumber)
        })

        ul.append(numberLi)
    }

    // next page
    const nextLi = document.createElement('li')
    nextLi.classList.add('page-item')
    const nextLink = document.createElement('a')
    nextLink.textContent = 'Next'
    nextLink.classList.add('page-link')

    if(info.next == null) {
        nextLi.classList.add('disabled')
    } else {
        nextLink.href = info.next
        nextLi.classList.remove('disable')
    }

    nextLi.append(nextLink)

    // ----
    
    ul.append(nextLi)
    navPag.append(ul)

    return navPag
}

// LOAD CHARACTERS

const cardsContainer = document.querySelector('.cards-container')
const loadText = document.querySelector('.cards-container__load')

const loadEpisodes = async (page = 1) => {
    cardsContainer.textContent = ''
    
    const dataEpisodes = await getAllEpisodes(page)
    const {info, results} = dataEpisodes

    console.log(results);

    let cardBox = []

    results.forEach(episode => {
        const card = createCard(episode)
        cardBox.push(card)
    });

    if(cardBox.length > 0) {
        loadText.textContent = ''
    }

    cardsContainer.append(...cardBox)
    const pager = paginate(info, page)
    cardsContainer.append(pager)
}

loadEpisodes()


// LOAD CHARACTER DETAIL

const loadDetail = async (id) => {
    const res = await fetch(rym_api_single_episode(id))
    const data = await res.json()

    localStorage.setItem('episodeDetail', JSON.stringify(data))
    console.log(data);
    // window.location = '../views/characterDetail.html'
}