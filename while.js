const { select, input, checkbox } = require('@inquirer/prompts');

let meta = {
  value: "tomar 3L de água todos os dias",
  checked: false
}

let metas =  [ meta ]

//async é usado para acionar o await, que espera o usuário fazer uma ação 
const cadastrarMeta = async () => {
  const meta = await input({message: "digite sua meta:"})
  console.debug(JSON.stringify(meta))
  if(meta.length == 0){
    console.log("A meta não pode ser vazia")
    return
  }

metas.push({
  value: meta, checked: false
})

} 

const listarMetas = async () => {
  console.log(metas)
  const respostas = await checkbox({
    message: "Use a seta para mudar de metas,o espaço para marcar e desmacar metas, e o enter para finalizar essa meta",
    choices: [...metas],
    instructions: false
  }) 

  metas.forEach((m) => {
    m.checked = false
  })
   
  console.log(respostas)
  if(respostas.length == 0){
    console.log("nenhuma rota está selecionada")
    return

  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })

    console.log(meta)

    meta.checked = true
  })

  console.log('Meta(s) concluída(s)')
  console.log(metas)
}

const metasRealizadas = async () => {
   const realizadas = metas.filter((metas) => {
   return meta.checked
   })

   if(realizadas.length == 0){
    console.log("Não existem metas realizadas :(")
    return
   }

   await select ({
    message: "Metas realizadas",
    choices: [...realizadas]
   })

}


const metasAbertas = async () => {
  const abertas = metas.filter((metas) => {
  return meta.checked != true
  })
  
  if(aberta.length){
   console.log("Não existem metas em aberto :)")
  }
  await select({
   message: "metas abertas" + abertas.length,
   choices: [...abertas]

  })
}  


async function start() {
  while (true) {
    // Exibe o menu de seleção e aguarda a escolha do usuário
    const opcao = await select({
      message: "Menu >",
      choices: [
        { name: "Cadastrar meta", value: "cadastrar" },
        { name: "Listar metas", value: "listar" },
        { name: "Metas realizadas", value: "realizadas" },
        { name: "Metas abertas", value: "abertas" },
        { name: "Sair", value: "sair" }
      ]
    })

    // Tratamento das opções selecionadas
    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta();
        break;
      case "listar":
        await listarMetas();
        break;
      case "realizadas":
        await metasRealizadas()
        break
        case "abertas":
          await metasAbertas()
          break
      case "sair":
        console.log("Saindo...");
        return; // Encerra o loop e a execução do programa
      default:
        console.log("Opção inválida, tente novamente.");
    }
  }
}

// Chama a função 'start' para iniciar o menu
start();