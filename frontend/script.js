const API_URL = "http://localhost:3000";

// Filmes
// aqui fazemos a chamada para a API e carregamos os filmes na lista
async function carregarFilmes() {
  const resposta = await fetch(`${API_URL}/filmes`);
  const filmes = await resposta.json();
  const lista = document.getElementById("filmes-lista");
  lista.innerHTML = "";
  filmes.forEach(filme => {
    const item = document.createElement("li");
    item.textContent = `${filme.id} - ${filme.nome}`;
    lista.appendChild(item);
  });
}

async function adicionarFilme() {
  const nome = document.getElementById("filme-nome").value;
  await fetch(`${API_URL}/filmes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome })
  });
  document.getElementById("filme-nome").value = "";
  //carregarFilmes();
}

// Clientes
async function carregarClientes() {
    //fetch(...): faz uma requisição GET para http://localhost:3000/clientes
    //fetch é um GET por padrão, então não precisa especificar o método GET
    //await: espera a resposta da requisição antes de continuar
  const resposta = await fetch(`${API_URL}/clientes`);
  const clientes = await resposta.json();
  // Essa linha abaixo faz "clientes-lista" ser o id do elemento HTML que vai receber a lista de clientes
  // em outras palavras, a lista de clientes vai ser carregada nesse elemento HTML
  // getElementById: pega o elemento HTML pelo id
  // innerHTML: limpa o conteúdo do elemento HTML
  const lista = document.getElementById("clientes-lista");
  lista.innerHTML = "";
  // Essa linha abaixo faz um loop em cada cliente da lista de clientes
  // forEach: para cada cliente na lista de clientes
  // createElement: cria um novo elemento HTML
  // textContent: define o conteúdo de texto do elemento HTML
  clientes.forEach(cliente => {
    const item = document.createElement("li");
    item.textContent = `${cliente.id} - ${cliente.nome}`;
    lista.appendChild(item);
  });
}
async function limparFilmes(){
    const lista = document.getElementById("filmes-lista");
    lista.innerHTML = "";
}

async function adicionarCliente() {
  const nome = document.getElementById("cliente-nome").value;
  await fetch(`${API_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome })
  });
  document.getElementById("cliente-nome").value = "";
  carregarClientes();
}

// Carregar ao iniciar
//carregarFilmes();
carregarClientes();
