console.log('Welcome to the collection section');

// ENDPOINTS RICK&MORTY API

const rym_api_collections = (section, page) => {
    return `https://rickandmortyapi.com/api/${section}/?page=${page}`
}
const rym_api_single = (section, id) => {
    return `https://rickandmortyapi.com/api/${section}/${id}`
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


// CARD CREATION

const createCard = (collectionItem) => {
    const card = document.createElement('div')
    card.classList.add('card')

    if(singularSection === 'character') {
        const characterImg = document.createElement('img')
        characterImg.classList.add('card-img-top')
        characterImg.src = collectionItem.image
        characterImg.alt = collectionItem.name
        card.append(characterImg)
    }

    const link = document.createElement('a')
    link.style.cursor ='pointer'
    link.dataset.id = collectionItem.id
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    const cardTitle = document.createElement('h6')
    cardTitle.textContent = collectionItem.name

    card.append(link)
    link.append(cardBody)
    cardBody.append(cardTitle)

    link.addEventListener('click', (e) => {
        e.preventDefault();
        loadDetail(singularSection, link.dataset.id)
    })

    return card
}

// PAGINATION

const paginate = (info, page) => {
    const navPag = document.createElement('nav')
    navPag.classList.add('col-12')
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

    if(info.prev == null) {
        previousLi.classList.add('disabled')
    } else {
        previousLi.classList.remove('disable')
        prevLink.href = info.prev
    }
    
    ul.append(previousLi)
    previousLi.append(prevLink)

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

        ul.append(numberLi)

        numberLi.addEventListener('click', (e) => {
            e.preventDefault();
            loadCards(singularSection, i)
        })
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

// LOAD INFORMATION CARDS

const cardsContainer = document.querySelector('.cards-container')
const loadText = document.querySelector('.cards-container__load')
const sectionActive = document.querySelector('.active').text
const singularSection = sectionActive.slice(0, -1).toLowerCase()

const loadCards = async (section, page = 1) => {
    cardsContainer.textContent = ''
    const dataCollection = await getCollection(section, page)
    const {info, results} = dataCollection
    
    let cardBox = []

    results.forEach(collectionItem => {
        const card = createCard(collectionItem)
        cardBox.push(card)
    })

    if(cardBox.length > 0) {
        loadText.textContent = ''
    }

    cardsContainer.append(...cardBox)
    const pager = paginate(info, page)
    cardsContainer.append(pager)
}

loadCards(singularSection, 1)


// LOAD DETAIL

const loadDetail = async (section, id) => {
    try {
        const endpoint = rym_api_single(section, id)
        const res = await fetch(endpoint)
        const dataSingle = await res.json()

        localStorage.setItem(`${singularSection}Detail`, JSON.stringify(dataSingle))
        window.location = `../views/${singularSection}Detail.html`
    } catch (error) {
        console.log(error);
    }
}