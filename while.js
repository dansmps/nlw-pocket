const { select, input } = require('@inquirer/prompts');


let meta = {
  value: "tomar 3L de água todos os dias",
  checked: false
}

let metas =  [ meta ]

//aync é usado para acionar o await, que espera o usuário fazer uma ação 
const cadastrarMeta = async () => {
  const meta = await input({message: "digite sua meta:"})
  console.debug(JSON.stringify(meta))
   if(meta.length == 0){
    console.log("A meta não pode ser vazia")
      return
  }

metas.push({
  value: "meta", checked: false
})

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
        await cadastrarMeta()
        break
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


