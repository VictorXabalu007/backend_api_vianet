import{editDistrubidor}from"../controller/controllerDistribuidor.js";


export async function update(req,res){
  try {
    const {
      username,
      endereco,
      loginUsuario,
      senhaUsuario
    } = req.body;
    await editDistrubidor(username,endereco,loginUsuario, senhaUsuario,req.userId);

    res.status(200).send('Farmacia modificada com sucesso!');
  } catch (error) {
    console.error('Erro ao modificar a Farmacia:', error);
    res.status(500).send('Erro ao modificar Farmacia');
  }
};
