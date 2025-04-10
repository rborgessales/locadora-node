// db/index.js
// Esse arquivo contém a configuração do banco de dados e as definições das tabelas.
// Ele é responsável por conectar ao banco de dados SQLite e definir as tabelas que serão utilizadas na aplicação.
// A diferença entre esse db index.js para o outro index.js é que esse não tem a parte de importação do drizzle-orm,...
// ... pois o drizzle-orm já foi importado no arquivo drizzle.js e o arquivo drizzle.js já foi importado nesse arquivo db index.js.
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { drizzle } from "drizzle-orm/better-sqlite3";
import sqlite3 from "better-sqlite3";

// Conecta com o banco
const sqlite = new sqlite3("locadora.db");
export const db = drizzle(sqlite);

// Tabela: filmes
export const filmes = sqliteTable("filmes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
});

// Tabela: clientes
export const clientes = sqliteTable("clientes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(),
});

// Tabela: aluguel
export const aluguel = sqliteTable("aluguel", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  data_aluguel: text("data_aluguel").notNull(),
  data_devolucao: text("data_devolucao").notNull(),
  cliente_id: integer("cliente_id").notNull(),
  filme_id: integer("filme_id").notNull(),
});
