const { select, input, checkbox } = require('@inquirer/prompts');

let metas = [
  { value: "tomar 3L de água todos os dias", checked: false }
];

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite sua meta:" });
  if (meta.length === 0) {
    console.log("A meta não pode ser vazia");
    return;
  }

  metas.push({ value: meta, checked: false });
};

const listarMetas = async () => {
  console.log(metas);
  const respostas = await checkbox({
    message: "Use a seta para mudar de metas, o espaço para marcar e desmarcar metas, e o enter para finalizar a seleção",
    choices: metas.map(meta => ({ name: meta.value, value: meta.value })),
    instructions: false
  });

  metas.forEach(meta => { meta.checked = false; });

  console.log(respostas);
  if (respostas.length === 0) {
    console.log("Nenhuma meta está selecionada");
    return;
  }

  respostas.forEach(resposta => {
    const meta = metas.find(m => m.value === resposta);
    if (meta) {
      meta.checked = true;
    }
  });

  console.log('Meta(s) concluída(s)');
  console.log(metas);
};

const metasRealizadas = async () => {
  const realizadas = metas.filter(meta => meta.checked);

  if (realizadas.length === 0) {
    console.log("Não existem metas realizadas :(");
    return;
  }

  await select({
    message: "Metas realizadas",
    choices: realizadas.map(meta => ({ name: meta.value, value: meta.value }))
  });
};

const metasAbertas = async () => {
  const abertas = metas.filter(meta => !meta.checked);

  if (abertas.length === 0) {
    console.log("Não existem metas em aberto :)");
    return;
  }

  await select({
    message: "Metas abertas",
    choices: abertas.map(meta => ({ name: meta.value, value: meta.value }))
  });
};

const deletarMetas = async () => {
  const metasDesmarcadas = metas.map((meta) => ({ value: meta.value, checked: false }));

  const itemsAdeletar = await checkbox({
    message: "Selecione itens para deletar",
    choices: metasDesmarcadas,
    instructions: false
  });

  if (itemsAdeletar.length === 0) {
    console.log("Nenhum item para deletar");
    return;
  }

  metas = metas.filter(meta => !itemsAdeletar.includes(meta.value));
  console.log("Meta(s) deletada(s)");
  console.log(metas);
};

async function start() {
  while (true) {
    const opcao = await select({
      message: "Menu >",
      choices: [
        { name: "Cadastrar meta", value: "cadastrar" },
        { name: "Listar metas", value: "listar" },
        { name: "Metas realizadas", value: "realizadas" },
        { name: "Metas abertas", value: "abertas" },
        { name: "Deletar metas", value: "deletar" },
        { name: "Sair", value: "sair" }
      ]
    });

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta();
        break;
      case "listar":
        await listarMetas();
        break;
      case "realizadas":
        await metasRealizadas();
        break;
      case "abertas":
        await metasAbertas();
        break;
      case "deletar":
        await deletarMetas();
        break;
      case "sair":
        console.log("Saindo...");
        return;
      default:
        console.log("Opção inválida, tente novamente.");
    }
  }
}

// Chama a função 'start' para iniciar o menu
start();
