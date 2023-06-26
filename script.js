document.getElementById("postForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Captura dos valores dos campos
  const title = document.getElementById("title").value;
  const image = document.getElementById("image").value;
  const date = document.getElementById("date").value;
  const content = document.getElementById("content").value;

  // Criação do elemento HTML para a postagem
  const postElement = document.createElement("div");
  postElement.classList.add("post");
  postElement.innerHTML = `
    <h2>${title}</h2>
    <img src="${image}" alt="Imagem da postagem">
    <p>Data: ${date}</p>
    <p>${content}</p>
  `;

  // Armazenamento dos dados da postagem na API de LocalStorage
  const post = {
    title: title,
    image: image,
    date: date,
    content: content
  };
  localStorage.setItem("post", JSON.stringify(post));

  // Adição do elemento HTML da postagem ao layout principal da página
  const mainElement = document.getElementById("main");
  mainElement.appendChild(postElement);

  // Limpeza dos campos do formulário
  document.getElementById("title").value = "";
  document.getElementById("image").value = "";
  document.getElementById("date").value = "";
  document.getElementById("content").value = "";
});
