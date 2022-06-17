'use strict'

function renderWaterfall(rootNode, columnCount, elementGap) {
    // Получение нод рута
    const nodes = [...rootNode.children]
    // Добавление информации из ноды в массив с типом ParsedNodes
    const dataFromNodes = []
    nodes.forEach(el => {
        dataFromNodes.push({content: el, length: el.innerHTML.length})
    })
    // Установка стилей для будушего рута
    const returningDiv = document.createElement('div')
    returningDiv.style.display = 'grid'
    returningDiv.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`
    returningDiv.style.gap = `${elementGap}px`
    // Создание колонок
    const columns = []
    for (let i = 0; i < columnCount; i++) {
        const element = document.createElement('div')
        element.style.display = 'flex'
        element.style.flexDirection = 'column'
        element.style.gap = elementGap + 'px'
        columns.push([element, -1])
    }
    // Распределение нод по колонкам
    dataFromNodes.forEach(t => {
        const columnWithMinimalContent = columns.map(elem => elem[1]).indexOf(Math.min(...columns.map(elem => elem[1])))
        columns[columnWithMinimalContent][0].appendChild(t.content)
        columns[columnWithMinimalContent][1] += t.length
    })
    // Добавление колонок в рут
    for (let i = 0; i < columns.length; i++) {
        returningDiv.appendChild(columns[i][0])
    }
    document.body.prepend(returningDiv)
}

// Создание тестового входного дива
const rootNode = document.createElement('div')
rootNode.classList.add('root')
const nodesList = [
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid culpa expedita possimus reiciendis. Error fugiat laborum molestiae natus optio ratione ut vel voluptatum. Doloribus facere itaque laboriosam molestiae necessitatibus similique temporibus totam veniam voluptate voluptatum. Eveniet ex id laudantium quae sed. Animi architecto assumenda at autem commodi consequatur cumque distinctio, doloribus enim error eveniet facilis harum illum impedit, itaque libero mollitia necessitatibus neque nobis nostrum obcaecati quas quasi recusandae repellat repudiandae similique sunt tempore veritatis voluptate voluptatibus! Consectetur dolore eveniet iste ullam. Nisi, quidem velit?',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad cupiditate eos, eum iste laborum, optio quibusdam reiciendis rem sapiente, sit unde vero vitae voluptates! Asperiores aut cumque deserunt distinctio dolorum eaque, earum harum id illum in ipsam maxime modi molestias mollitia neque nihil pariatur perspiciatis, porro quae qui quidem soluta voluptates. Ab aspernatur dolor id quas rerum temporibus ullam voluptas.',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis delectus harum mollitia quae quisquam vel vitae voluptatum. Ab accusantium animi autem culpa cumque delectus error exercitationem magni neque, nostrum odit porro quae recusandae rerum sequi tempore velit vero voluptates. Animi atque cumque eveniet impedit ipsam iste labore possimus quae tempora?',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum hic incidunt maiores nesciunt provident quae reprehenderit saepe voluptatibus. Animi beatae corporis, distinctio eaque nobis officia omnis quaerat quibusdam repellat sint unde veniam voluptates. Accusantium consectetur nostrum obcaecati quas sunt, voluptatem! Corporis, dolore reiciendis. Cumque ex ipsa itaque mollitia quia veniam. Alias corporis cupiditate dolorem dolorum, eligendi enim hic incidunt ipsum minima necessitatibus placeat quas quidem, quod repellat sed! Alias dicta dignissimos dolore dolorem eius eligendi fuga harum magni maiores modi natus nihil, odio, optio placeat, possimus qui ratione rerum sapiente!',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut expedita maiores tempora. Ad at, cumque delectus dolorem ducimus earum fugiat impedit inventore laboriosam libero molestiae molestias mollitia nesciunt nobis officiis quae repellat reprehenderit suscipit tempora voluptas voluptates.',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, corporis culpa dolorum ducimus illum minima quia voluptatem? Aperiam deleniti eos nihil optio quis repellendus saepe voluptas voluptatem. Consequuntur fugiat magni mollitia nobis perspiciatis quibusdam sed vel? Incidunt magnam obcaecati quod sunt temporibus voluptate, voluptatum. Ipsam.'
]
nodesList.forEach(el => {
    const item = document.createElement('div')
    item.classList.add('item')
    item.innerText = el
    rootNode.appendChild(item)
})
renderWaterfall(rootNode, 3, 30)