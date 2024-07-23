//vai adicionar as farmacias
import { kknex } from "../config/database.js";
import { insertUser,updateUser,deleteUser } from "./controllerUser.js";


//------------cadastra os dados exclusivos--------------------------------------------

async function insertFarmacia(username, celular, Nome, CNPJ, endereco,ID) {
  try {
    await kknex('Farmacia').insert({
      username,
      pontos: 0,
      celular,
      Nome,
      CNPJ,
      endereco,
      usuario_id:ID
    });
  } catch (error) {
    console.error('Erro ao inserir a farmacia:', error);
    throw error;
  }
}

async function deleteFarmacia(FarmaciaId) {
  try {
    await kknex('Farmacia')
      .where({ id: FarmaciaId })
      .del();
    console.log('Farmácia deletada com sucesso');
  } catch (error) {
    console.error('Erro ao deletar farmácia:', error);
    throw error;
  }
}

 async function updateFarmacia(username, celular, Nome, CNPJ, endereco, ID) {
  try {
    await kknex('Farmacia')
      .where('usuario_id', ID)
      .update({
        username,
        celular,
        Nome,
        CNPJ,
        endereco
      });
      console.log(username,ID);
  } catch (error) {
    console.error('Erro ao atualizar a farmacia:', error);
    throw error;
  }
}
//------------principal--------------------------------------------
export async function addFaramacia(username, celular, Nome, CNPJ, endereco, loginUsuario, senhaUsuario) {


  const trx = await kknex.transaction();

  try {

    const userId = await insertUser(loginUsuario, senhaUsuario,2);

    await insertFarmacia(username, celular, Nome, CNPJ, endereco, userId);

    await trx.commit();

    console.log('Farmacia inseridos com sucesso');
  } catch (error) {
    // Reverter transação
    await trx.rollback();
    console.error('Erro ao inserir a farmacia e usuário:', error);
  }
}

export async function editFarmacia(username, celular, Nome, CNPJ, endereco, loginUsuario, senhaUsuario,ID) {
  const trx = await kknex.transaction();
  try {
    await updateFarmacia(ID,username, celular, Nome, CNPJ, endereco);
    await updateUser(ID, loginUsuario, senhaUsuario);

    await trx.commit();

    console.log('Farmácia e usuário atualizados com sucesso');
  } catch (error) {
    // Reverter transação
    await trx.rollback();
    console.error('Erro ao atualizar farmácia e usuário:', error);
  }
}


export async function removeFarmacia(userId) {
  const trx = await kknex.transaction();

  try {
    await deleteFarmacia(userId);
    await deleteUser(userId);

    await trx.commit();

    console.log('Farmácia e usuário deletados com sucesso');
  } catch (error) {
    // Reverter transação
    await trx.rollback();
    console.error('Erro ao deletar farmácia e usuário:', error);
  }
}
