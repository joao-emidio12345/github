'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')
const openModal2 = () => document.getElementById('modal2').classList.add('active')

const closeModal2 = () => {
    document.getElementById('modal2').classList.remove('active')
}

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_post')) ?? []
const setLocalStorage = (dbPost) => localStorage.setItem("db_post", JSON.stringify(dbPost))

// CRUD - create read update delete
const deletePost = (index) => {
    const dbPost = readPost()
    dbPost.splice(index, 1)
    setLocalStorage(dbPost)
}

const updatePost = (index, post) => {
    const dbPost = readPost()
    dbPost[index] = post
    setLocalStorage(dbPost)
}

const readPost = () => getLocalStorage()

const createPost = (post) => {
    const dbPost = getLocalStorage()
    dbPost.push (post)
    setLocalStorage(dbPost)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
    document.getElementById('titulo').dataset.index = 'new';
}

const savePost = () => {
    debugger
    if (isValidFields()) {
        const post = {
            titulo: document.getElementById('titulo').value,
            imagem: document.getElementById('image').value,
            data: document.getElementById('date').value,
            conteudo: document.getElementById('content').value
        }
        const index = document.getElementById('titulo').dataset.index
        if (index == 'new') {
            createPost(post)
            updateTable()
            closeModal()
        } else {
            updatePost(index, post)
            updateTable()
            closeModal()
        }
    }
}

const createRow = (post, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${post.titulo}</td>
        <td>${post.imagem}</td>
        <td>${post.data}</td>
        <td>${post.conteudo}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tablePost>tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tablePost>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbPost = readPost()
    clearTable()
    dbPost.forEach(createRow);
}

const fillFields = (post) => {
    document.getElementById('titulo').value = post.titulo
    document.getElementById('image').value = post.imagem
    document.getElementById('date').value = post.data
    document.getElementById('content').value = post.conteudo
    document.getElementById('titulo').dataset.index = post.index
}

const editPost = (index) => {
    const post = readPost()[index]
    post.index = index
    fillFields(post)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editPost(index)
        } else {
            const post = readPost()[index]
            let avisoDelete = document.querySelector('#avisoDelete')

            avisoDelete.textContent = `Deseja realmente excluir a postagem ${post.titulo}`
            openModal2()

        // APAGAR O REGISTRO
            document.getElementById('apagar').addEventListener('click', () => {
                deletePost(index)
                updateTable()
                closeModal2()
            })
        }
    }
}

updateTable();

// Eventos
document.addEventListener('DOMContentLoaded', () => {
document.getElementById('adicionarPostagem')
    .addEventListener('click', openModal);
});
document.addEventListener('DOMContentLoaded', () => {
document.getElementById('modalClose')
    .addEventListener('click', closeModal);
});

// modal apagar
document.addEventListener('DOMContentLoaded', () => {
document.getElementById('modalClose2')
    .addEventListener('click', closeModal2);
});
document.addEventListener('DOMContentLoaded', () => {
document.getElementById('salvar')
    .addEventListener('click', savePost);
});
document.addEventListener('DOMContentLoaded', () => {
document.querySelector('#tablePost>tbody')
    .addEventListener('click', editDelete);
});
document.addEventListener('DOMContentLoaded', () => {
document.getElementById('cancelar')
    .addEventListener('click', closeModal);
});

// modal apagar
document.addEventListener('DOMContentLoaded', () => {
document.getElementById('cancelar2')
    .addEventListener('click', closeModal2);
});