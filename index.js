// index.js
// Esse arquivo contém a lógica principal da aplicação. Ele é responsável por importar o banco de dados...
// ... e as tabelas definidas no arquivo db/index.js e executar as operações de CRUD (Create, Read, Update, Delete) na aplicação.
// Ele também contém o menu interativo que permite ao usuário interagir com a aplicação e realizar operações no banco de dados.
import { db, filmes, clientes, aluguel } from "./db/index.js";
import readline from "readline-sync";
import { eq } from "drizzle-orm";

async function mostrarMenu() {
  while (true) {
    console.log("\n=== LOCADORA DRIZZLE ===");
    console.log("1 - Ver filmes");
    console.log("2 - Ver clientes");
    console.log("3 - Ver aluguéis");
    console.log("4 - Inserir novo cliente");
    console.log("5 - Inserir novo filme");
    console.log("6 - Inserir novo aluguel");
    console.log("0 - Sair");

    const opcao = readline.question("> Escolha uma opcao: ");

    if (opcao === "1") {
      const resultado = await db.select().from(filmes);
      console.log("\n🎬 Filmes:");
      resultado.forEach(f => console.log(`ID: ${f.id} | Nome: ${f.nome}`));

    } else if (opcao === "2") {
      const resultado = await db.select().from(clientes);
      console.log("\n👤 Clientes:");
      resultado.forEach(c => console.log(`ID: ${c.id} | Nome: ${c.nome}`));

    } else if (opcao === "3") {
      const alugueis = await db.select().from(aluguel);
      console.log("\n📋 Aluguéis:");
      for (const a of alugueis) {
        const cliente = await db.select().from(clientes).where(eq(clientes.id, a.cliente_id)).then(res => res[0]);
        const filme = await db.select().from(filmes).where(eq(filmes.id, a.filme_id)).then(res => res[0]);
        console.log(`ID: ${a.id} | Cliente: ${cliente.nome} | Filme: ${filme.nome} | Alugado: ${a.data_aluguel} | Devolução: ${a.data_devolucao}`);
      }

    } else if (opcao === "4") {
      const nome = readline.question("Digite o nome do novo cliente: ");
      await db.insert(clientes).values({ nome });
      console.log("✅ Cliente inserido!");

    } else if (opcao === "5") {
      const nome = readline.question("Digite o nome do novo filme: ");
      await db.insert(filmes).values({ nome });
      console.log("✅ Filme inserido!");

    } else if (opcao === "6") {
      const data_aluguel = readline.question("Data do aluguel: ");
      const data_devolucao = readline.question("Data da devolução: ");
      const cliente_id = parseInt(readline.question("ID do cliente: "));
      const filme_id = parseInt(readline.question("ID do filme: "));
      await db.insert(aluguel).values({ data_aluguel, data_devolucao, cliente_id, filme_id });
      console.log("✅ Aluguel registrado!");

    } else if (opcao === "0") {
      console.log("👋 Encerrando...");
      break;

    } else {
      console.log("❌ Opção inválida!");
    }
  }
}

mostrarMenu();
