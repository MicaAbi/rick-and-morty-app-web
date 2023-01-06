// ENDPOINTS RICK&MORTY API

const rym_api_collections = (section, page) => {
    return `https://rickandmortyapi.com/api/${section}/?page=${page}`
}
const rym_api_single = (section, id) => {
    return `https://rickandmortyapi.com/api/${section}/${id}`
}
const rym_api_search = (section, name) => {
    return `https://rickandmortyapi.com/api/${section}/?name=${name}`
}

// FETCH FUNCTIONS

// Get all characters, episodes or locations
const getCollection = async (section, page) => {
    try {
        const endpoint = rym_api_collections(section, page)
        const res = await fetch(endpoint)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
    }
}

// Get a single character, episode or location
const getSingle = async (section, id) => {
    try {
        const endpoint = rym_api_single(section, id)
        const res = await fetch(endpoint)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
    }
}

// Get characters, episodes or locations by their names
const searchByName = async (section, name) => {
    const res = await fetch(rym_api_search(section, name))
    const data = await res.json()

    return data;
}

// CARD CREATION

const createCard = (collectionItem) => {
    const card = document.createElement('div')
    card.classList.add('card')

    const link = document.createElement('a')
    link.style.cursor = 'pointer'
    link.dataset.id = collectionItem.id
    card.append(link)

    if (sectionName === 'character') {
        const characterImg = document.createElement('img')
        characterImg.classList.add('card-img-top')
        characterImg.src = collectionItem.image
        characterImg.alt = collectionItem.name
        link.append(characterImg)
    }

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    link.append(cardBody)

    const cardTitle = document.createElement('h6')
    cardTitle.textContent = collectionItem.name
    cardBody.append(cardTitle)

    if (sectionName === 'episode') {
        cardTitle.textContent = `Episode ${collectionItem.id}`
        const textDetail = document.createElement('p')
        textDetail.style.borderTop = '1.5px solid white'
        textDetail.style.paddingTop = '0.5rem'
        textDetail.style.color = '#c8c9c9'
        textDetail.innerHTML = `${collectionItem.name} <br>
            ${collectionItem.episode} <br>
            ${collectionItem.air_date}
        `
        cardBody.append(textDetail)
    }

    if (sectionName === 'location') {
        const textDetail = document.createElement('p')
        textDetail.style.borderTop = '1.5px solid white'
        textDetail.style.paddingTop = '0.5rem'
        textDetail.style.color = '#c8c9c9'
        textDetail.innerHTML = `${collectionItem.type} <br>
            ${collectionItem.dimension}
        `
        cardBody.append(textDetail)
    }

    // add event
    link.addEventListener('click', (e) => {
        e.preventDefault();
        loadDetail(sectionName, link.dataset.id)
    })

    return card
}

// PAGINATION

const paginate = (info, page) => {
    const navPag = document.createElement('nav')
    navPag.classList.add('col-12')
    navPag.classList.add('mt-4')
    navPag.ariaLabel = 'pagination'

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

    if (info.prev == null) {
        previousLi.classList.add('disabled')
    } else {
        previousLi.classList.remove('disable')
        prevLink.href = info.prev
    }

    ul.append(previousLi)
    previousLi.append(prevLink)

    // page number
    for (let i = 1; i <= info.pages; i++) {

        const numberLi = document.createElement('li')
        numberLi.style.cursor = 'pointer'
        numberLi.classList.add('page-item')
        const linkNumPage = document.createElement('a')
        linkNumPage.textContent = i
        linkNumPage.classList.add('page-link')
        linkNumPage.dataset.pageNumber = i
        numberLi.append(linkNumPage)

        if (i == page) {
            numberLi.classList.add('active')
        }

        ul.append(numberLi)

        numberLi.addEventListener('click', (e) => {
            e.preventDefault();
            loadCards(sectionName, i)
        })
    }

    // next page
    const nextLi = document.createElement('li')
    nextLi.classList.add('page-item')
    const nextLink = document.createElement('a')
    nextLink.textContent = 'Next'
    nextLink.classList.add('page-link')

    if (info.next == null) {
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

// LOAD INFORMATION CARDS

const cardsContainer = document.querySelector('.cards-container')
const loadText = document.querySelector('.cards-container__load')
const sectionActive = document.querySelector('.active').text
const sectionName = sectionActive.slice(0, -1).toLowerCase()

const loadCards = async (section, page = 1) => {
    const dataCollection = await getCollection(section, page)
    const { info, results } = dataCollection

    let cardBox = []

    results.forEach(collectionItem => {
        const card = createCard(collectionItem)
        cardBox.push(card)
    })

    if (cardBox.length > 0) {
        loadText.textContent = ''
        cardsContainer.textContent = ''
    }

    cardsContainer.append(...cardBox)
    const pager = paginate(info, page)
    cardsContainer.append(pager)
}

loadCards(sectionName)


// LOAD DETAIL

const loadDetail = async (section, id) => {
    try {
        const dataSingle = await getSingle(section, id)

        localStorage.setItem(`${section}Detail`, JSON.stringify(dataSingle))
        window.location = `../views/${section}Detail.html`
    } catch (error) {
        console.log(error);
    }
}

// SEARCH FORM

const searchForm = document.querySelector('.form-search')
const searchInput = document.querySelector('#search')

const loadSearchResults = async (section, name) => {
    const searchResult = await searchByName(section, name)
    console.log(searchResult);

    if (searchResult.results) {
        const { info, results } = searchResult
        cardsContainer.textContent = ''
        loadText.textContent = `${info.count} results`

        let cardBox = []

        results.forEach(itemFound => {
            const card = createCard(itemFound)
            cardBox.push(card)
        })

        cardsContainer.append(...cardBox)
        const pager = paginate(info)  // NO ESTA FUNCIONANDO EL PAGINADOR: clickeando las siguientes páginas se hace un fetch a las paginas principales de colecciones, sale de la busqueda por nombre.
        cardsContainer.append(pager)
    } else {
        loadText.textContent = `${sectionName} not found`
        cardsContainer.textContent = ''
    }
}

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    loadSearchResults(sectionName, searchInput.value)
})