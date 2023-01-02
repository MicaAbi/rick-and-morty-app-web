console.log('Welcome to the characters section');

// ENDPOINTS RICK&MORTY API
const rym_api_base = 'https://rickandmortyapi.com/api'
const rym_api_characters = `${rym_api_base}/character`

console.log(rym_api_characters);

// FETCH FUNCTIONS

// Get all characters
const getCharacters = async () => {
    try {
        const res = await fetch(rym_api_characters)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
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
    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    const characterTitle = document.createElement('h6')
    characterTitle.textContent = character.name

    cardBody.appendChild(characterTitle)
    link.appendChild(cardBody)
    card.append(characterImg, link)

    return card
}

// PAGINATION

// <nav aria-label="...">
//   <ul class="pagination justify-content-center">
//     <li class="page-item disabled">
//       <a class="page-link">Previous</a>
//     </li>
//     <li class="page-item"><a class="page-link" href="#">1</a></li>
//     <li class="page-item active" aria-current="page"> <a class="page-link" href="#">2</a> </li>
//     <li class="page-item"><a class="page-link" href="#">3</a></li>
//     <li class="page-item">
//       <a class="page-link" href="#">Next</a>
//     </li>
//   </ul>
// </nav>

const paginate = (info) => {
    const navPag = document.createElement('nav')
    navPag.classList.add('col-12')
    navPag.ariaLabel = 'character pagination'
    
    const ul = document.createElement('ul')
    ul.classList.add('pagination')
    ul.classList.add('justify-content-center')

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

    const numberLi = document.createElement('li')
    numberLi.classList.add('page-item')
    const num1 = document.createElement('a')
    num1.textContent = '1'
    num1.classList.add('page-link')
    numberLi.append(num1)

    const numberLi2 = document.createElement('li')
    numberLi2.classList.add('page-item')
    const num2 = document.createElement('a')
    num2.textContent = '2'
    num2.classList.add('page-link')
    numberLi2.append(num2)

    const numberLi3 = document.createElement('li')
    numberLi3.classList.add('page-item')
    const num3 = document.createElement('a')
    num3.textContent = '3'
    num3.classList.add('page-link')
    numberLi3.append(num3)

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
    
    ul.append(previousLi, numberLi, numberLi2, numberLi3, nextLi)
    navPag.append(ul)

    return navPag
}

// LOAD CHARACTERS

const cardsContainer = document.querySelector('.cards-container')
const loadText = document.querySelector('.cards-container__load')

const loadCharacters = async () => {
    const dataCharacters = await getCharacters()
    const {info, results} = dataCharacters

    let cardBox = []

    results.forEach(character => {
        const card = createCharacterCard(character)
        cardBox.push(card)
    });

    cardsContainer.append(...cardBox)
    cardBox.length > 0 ? loadText.textContent = '' : null
    console.log(dataCharacters);

    cardsContainer.append(paginate(info))
}

loadCharacters()
