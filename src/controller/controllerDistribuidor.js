import { kknex } from "../config/database.js";
import { insertUser } from "./controllerUser.js";

//------------cadastra os dados exclusivos--------------------------------------------

async function insertDistributor(username, endereco, usuarioId) {
  try {
    const [distributorId] = await kknex('Distribuidores').insert({
      username:username,
      endereco:endereco,
      usuario_id: usuarioId
    });
    return distributorId;
  } catch (error) {
    console.error('Erro ao inserir distribuidor:', error);
    throw error;
  }
}


export async function removeDistribuidor(distributorId) {
  try {
    await kknex('Distribuidores')
      .where('id', distributorId)
      .del();
    console.log('Distribuidor removido com sucesso');
  } catch (error) {
    console.error('Erro ao remover distribuidor:', error);
    throw error;
  }
}

//------------principal--------------------------------------------
export async function addDistribuidor(nomeDistribuidor, enderecoDistribuidor, loginUsuario, senhaUsuario) {

  const trx = await kknex.transaction();

  try {

    const userId = await insertUser(loginUsuario, senhaUsuario);

    await insertDistributor(nomeDistribuidor, enderecoDistribuidor, userId);

    await trx.commit();

    console.log('Distribuidor inseridos com sucesso');
  } catch (error) {
    // Reverter transação
    await trx.rollback();
    console.error('Erro ao inserir distribuidor e usuário:', error);
  }
}
