const { select } = require('@inquirer/prompts');

const cadastrarMeta = async () => {
  const meta = await input({message: "digite sua meta:"})

   if(meta.lenght == 0){
    console.log("A meta não pode ser vaziasssss")
      return
  }

} 



const start = async () => {
  while (true) {
    // Exibe o menu de seleção e aguarda a escolha do usuário
    const opcao = await select({
      message: "Menu >",
      choices: [
        { name: "Cadastrar meta", value: "cadastrar" },
        { name: "Listar metas", value: "listar" },
        { name: "Sair", value: "sair" }
      ]
    });

    // Tratamento das opções selecionadas
    switch (opcao) {
      case "cadastrar":
        console.log("Vamos cadastrar");
        break;
      case "listar":
        console.log("Vamos listar");
        break;
      case "sair":
        console.log("Saindo...");
        return; // Encerra o loop e a execução do programa
      default:
        console.log("Opção inválida, tente novamente.");
    }
  }
};

// Chama a função 'start' para iniciar o menu
start();


