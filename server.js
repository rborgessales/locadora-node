// server.js
// essa parte do código é responsável por criar o servidor e as rotas da API
// ou seja o backend da aplicação
// ele é responsável por conectar o banco de dados e fazer as operações CRUD (Create, Read, Update, Delete) com os dados
import express from "express";
import cors from "cors";
import { db, filmes, clientes, aluguel } from "./db/index.js";
import { eq } from "drizzle-orm";

// Cria a aplicação Express
const app = express();
app.use(cors()); // <-- Isso resolve o problema de CORS
// Permite que o servidor entenda requisições no formato JSON
app.use(express.json());
// Apos rodar o comando de iniciar backend e frontend acesse 
// Rota para listar todos os filmes
// Esse /filmes é definido na URL da API
// Ou seja, quando você acessar http://localhost:3000/filmes ele vai chamar essa rota
app.get("/filmes", async (req, res) => {
  const resultado = await db.select().from(filmes);
  res.json(resultado);
});

// Rota para inserir filme
// Rota POST para adicionar um filme. Quando alguém mandar dados para '/filmes', o backend vai processar.
app.post("/filmes", async (req, res) => {
    // Aqui, você pega o valor do nome do filme que a pessoa enviou
  const { nome } = req.body;
  // Agora, você vai pegar esse 'nome' e salvar no banco de dados (na tabela 'filmes')
  // 'db.insert(filmes)' significa que vai adicionar o dado na tabela 'filmes'
  // 'values({ nome })' quer dizer que vai colocar o valor do nome do filme lá no banco
  await db.insert(filmes).values({ nome });
    // Responde para quem fez a requisição, dizendo que o filme foi adicionado com sucesso
  res.status(201).json({ message: "Filme inserido com sucesso" });
});

// Rota para listar clientes
app.get("/clientes", async (req, res) => {
  const resultado = await db.select().from(clientes);
  res.json(resultado);
});

// Rota para inserir cliente
app.post("/clientes", async (req, res) => {
  const { nome } = req.body;
  await db.insert(clientes).values({ nome });
  res.status(201).json({ message: "Cliente inserido com sucesso" });
});


// Rota para deletar um cliente pelo ID
app.delete("/clientes/:id", async (req, res) => {
  const id = req.params.id;
  await db.delete(clientes).where(eq(clientes.id, id));
  res.json({ message: "Cliente deletado com sucesso" });
});

// Rota para deletar um filme pelo ID
app.delete("/filmes/:id", async (req, res) => {
  const id = req.params.id;
  await db.delete(filmes).where(eq(filmes.id, id));
  res.json({ message: "Filme deletado com sucesso" });
});



// Rota para listar aluguéis
app.get("/alugueis", async (req, res) => {
  const alugueisList = await db.select().from(aluguel);

  const result = await Promise.all(alugueisList.map(async (a) => {
    const cliente = await db.select().from(clientes).where(eq(clientes.id, a.cliente_id)).then(r => r[0]);
    const filme = await db.select().from(filmes).where(eq(filmes.id, a.filme_id)).then(r => r[0]);

    return {
      id: a.id,
      cliente: cliente.nome,
      filme: filme.nome,
      data_aluguel: a.data_aluguel,
      data_devolucao: a.data_devolucao
    };
  }));

  res.json(result);
});

// Rota para registrar aluguel
app.post("/alugueis", async (req, res) => {
  const { data_aluguel, data_devolucao, cliente_id, filme_id } = req.body;
  await db.insert(aluguel).values({ data_aluguel, data_devolucao, cliente_id, filme_id });
  res.status(201).json({ message: "Aluguel registrado com sucesso" });
});

// Start server
// Configura o servidor para rodar na porta 3000
const PORT = 3000;
// Aqui ele começa a escutar requisições na porta 3000, ou seja, quando alguém acessar 'http://localhost:3000', o servidor vai estar funcionando
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
