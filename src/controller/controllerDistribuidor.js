import { kknex } from "../config/database.js";
import { insertUser,updateUser, deleteUser} from "./controllerUser.js";

//------------cadastra os dados exclusivos--------------------------------------------

async function insertDistributor(username, endereco,userId) {
  try {
    await kknex('Distribuidores').insert({
      username:username,
      endereco:endereco,
      usuario_id:userId
    });
  } catch (error) {
    console.error('Erro ao inserir distribuidor:', error);
    throw error;
  }
}
export async function editDistrubidor(username, celular, Nome, CNPJ, endereco, loginUsuario, senhaUsuario,ID) {
  const trx = await kknex.transaction();
  try {
    await updateDistrubidor(ID,username, celular, Nome, CNPJ, endereco);
    await updateUser(ID, loginUsuario, senhaUsuario);

    await trx.commit();

    console.log('distribuidor e usuário atualizados com sucesso');
  } catch (error) {
    // Reverter transação
    await trx.rollback();
    console.error('Erro ao atualizar farmácia e usuário:', error);
  }
}


export async function removeDistribuidor(ID) {
  try {
    await deleteUser(ID);
    await kknex('Distribuidores')
      .where('usuario_id', ID)
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
  const tipo=1;
  try {

    const userId = await insertUser(loginUsuario, senhaUsuario,tipo);

    await insertDistributor(nomeDistribuidor, enderecoDistribuidor, userId);

    await trx.commit();

    console.log('Distribuidor inseridos com sucesso');
  } catch (error) {
    // Reverter transação
    await trx.rollback();
    console.error('Erro ao inserir distribuidor e usuário:', error);
  }
}
