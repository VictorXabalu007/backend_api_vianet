import{editFarmacia}from"../controller/controllerFarmacia.js";


export async function update(req,res){
  try {
    const {
      username,
      celular,
      Nome,
      CNPJ,
      endereco,
      loginUsuario,
      senhaUsuario
    } = req.body;
    await editFarmacia(username, celular, Nome, CNPJ, endereco, loginUsuario, senhaUsuario,req.userId);

    res.status(200).send('Farmacia inserida com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir a Farmacia:', error);
    res.status(500).send('Erro ao inserir Farmacia');
  }
};
