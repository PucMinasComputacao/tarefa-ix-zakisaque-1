const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 14",
      preco: 5000,
      categoria: "Celulares",
      imagem: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb",
      descricao: "Top de linha Apple",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Galaxy S23",
      preco: 4200,
      categoria: "Celulares",
      imagem: "https://images.unsplash.com/photo-1705585174953-9b2aa8afc174?q=80&w=732&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Android poderoso",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Notebook Dell",
      preco: 3500,
      categoria: "Notebooks",
      imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      descricao: "Perfeito para trabalho",
      emEstoque: false
    },
    {
      id: 4,
      nome: "Mouse Gamer",
      preco: 150,
      categoria: "Acessórios",
      imagem: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Alta precisão",
      emEstoque: true
    },
    {
      id: 5,
      nome: "Teclado RGB",
      preco: 250,
      categoria: "Acessórios",
      imagem: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      descricao: "Iluminação RGB",
      emEstoque: true
    },
    {
      id: 6,
      nome: "PlayStation 5",
      preco: 4500,
      categoria: "Games",
      imagem: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      descricao: "Console next-gen",
      emEstoque: false
    },
    {
      id: 7,
      nome: "Xbox Series X",
      preco: 4300,
      categoria: "Games",
      imagem: "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5",
      descricao: "Alto desempenho",
      emEstoque: true
    },
    {
      id: 8,
      nome: "MacBook Air",
      preco: 7000,
      categoria: "Notebooks",
      imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      descricao: "Leve e potente",
      emEstoque: true
    }
  ]
};


const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");



function formatPrice(p) {
  return "R$ " + p.toFixed(2);
}

function createProductCard(prod) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", prod.id);

  const title = document.createElement("h3");
  title.innerText = prod.nome;

  const img = document.createElement("img");
  img.src = prod.imagem;

  const price = document.createElement("p");
  price.innerText = formatPrice(prod.preco);

  const cat = document.createElement("p");
  cat.innerText = prod.categoria;

  const btnBox = document.createElement("div");
  btnBox.classList.add("buttons");

  const btnDetails = document.createElement("button");
  btnDetails.innerText = "Detalhes";

  const btnHighlight = document.createElement("button");
  btnHighlight.innerText = "★";


  btnDetails.addEventListener("click", () => showProductDetails(prod));
  btnHighlight.addEventListener("click", () => card.classList.toggle("highlight"));

  btnBox.appendChild(btnDetails);
  btnBox.appendChild(btnHighlight);

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(price);
  card.appendChild(cat);
  card.appendChild(btnBox);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(p => {
    productList.appendChild(createProductCard(p));
  });


  document.querySelectorAll(".card").forEach(c => {
    console.log("ID:", c.getAttribute("data-id"));
  });
}

function renderCategories() {
  const categorias = [...new Set(data.produtos.map(p => p.categoria))];

  categorias.forEach(c => {
    const op = document.createElement("option");
    op.value = c;
    op.innerText = c;
    categorySelect.appendChild(op);
  });
}

function showProductDetails(p) {
  productDetails.innerHTML = `
    <h2>${p.nome}</h2>
    <p>Preço: ${formatPrice(p.preco)}</p>
    <p>Categoria: ${p.categoria}</p>
    <p>Estoque: ${p.emEstoque ? "Disponível" : "Esgotado"}</p>
    <p>${p.descricao}</p>
  `;
}

function filterProducts() {
  const text = searchInput.value.toLowerCase();
  const cat = categorySelect.value;

  return data.produtos.filter(p => {
    return (
      p.nome.toLowerCase().includes(text) &&
      (cat === "Todas" || p.categoria === cat)
    );
  });
}


searchInput.addEventListener("input", () => renderProducts(filterProducts()));
categorySelect.addEventListener("change", () => renderProducts(filterProducts()));
btnRender.addEventListener("click", () => renderProducts(filterProducts()));


renderCategories();
renderProducts(data.produtos);