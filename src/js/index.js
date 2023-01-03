console.log('Welcome to the characters section');

// ENDPOINTS RICK&MORTY API
const rym_api_base = 'https://rickandmortyapi.com/api'
const rym_api_characters = `${rym_api_base}/character/?page=`
const rym_api_single_character = (id) => {
    return `${rym_api_base}/character/${id}`
}

// FETCH FUNCTIONS

// Get all characters
const getAllCharacters = async (page) => {
    try {
        const res = await fetch(`${rym_api_characters}${page}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
    } finally {
        console.log(`${rym_api_characters}${page}`);
    }
}

// CARD CREATION

const createCharacterCard = (character) => {
    const card = document.createElement('div')
    card.classList.add('card')

    const characterImg = document.createElement('img')
    characterImg.classList.add('card-img-top')
    characterImg.src = character.image
    characterImg.alt = character.name

    const link = document.createElement('a')
    link.style.cursor ='pointer'
    link.dataset.id = character.id
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    const characterTitle = document.createElement('h6')
    characterTitle.textContent = character.name

    cardBody.appendChild(characterTitle)
    link.appendChild(cardBody)
    card.append(characterImg, link)

    link.addEventListener('click', (e) => {
        e.preventDefault();
        loadCharacterDetail(link.dataset.id)
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
            loadCharacters(linkNumPage.dataset.pageNumber)
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

const loadCharacters = async (page = 1) => {
    cardsContainer.textContent = ''
    
    const dataCharacters = await getAllCharacters(page)
    const {info, results} = dataCharacters

    console.log(results);

    let cardBox = []

    results.forEach(character => {
        const card = createCharacterCard(character)
        cardBox.push(card)
    });

    if(cardBox.length > 0) {
        loadText.textContent = ''
    }

    cardsContainer.append(...cardBox)
    const pager = paginate(info, page)
    cardsContainer.append(pager)
}

loadCharacters()


// LOAD CHARACTER DETAIL

const loadCharacterDetail = async (id) => {
    const res = await fetch(rym_api_single_character(id))
    const data = await res.json()

    localStorage.setItem('characterDetail', JSON.stringify(data))
    window.location = '../views/characterDetail.html'
}