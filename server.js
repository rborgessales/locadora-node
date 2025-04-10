// server.js
import express from "express";
import cors from "cors";
import { db, filmes, clientes, aluguel } from "./db/index.js";
import { eq } from "drizzle-orm";

const app = express();
app.use(cors()); // <-- Isso resolve o problema de CORS
app.use(express.json());


// Rota para listar todos os filmes
app.get("/filmes", async (req, res) => {
  const resultado = await db.select().from(filmes);
  res.json(resultado);
});

// Rota para inserir filme
app.post("/filmes", async (req, res) => {
  const { nome } = req.body;
  await db.insert(filmes).values({ nome });
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
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
