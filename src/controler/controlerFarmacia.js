//vai adicionar as farmacias
import { kknex } from "../config/database.js";
import { insertUser } from "./controlerUser.js";


//------------cadastra os dados exclusivos--------------------------------------------

async function insertFarmacia(username, celular, Nome, CNPJ, endereco, usuarioId) {
  try {
    const [FarmaciaId] = await kknex('Farmacia').insert({
      username,
      pontos: 0,
      celular,
      Nome,
      CNPJ,
      endereco,
      usuario_id: usuarioId
    });
    return FarmaciaId;
  } catch (error) {
    console.error('Erro ao inserir distribuidor:', error);
    throw error;
  }
}

//------------principal--------------------------------------------
export async function addFaramacia(username, celular, Nome, CNPJ, endereco, loginUsuario, senhaUsuario) {


  const trx = await kknex.transaction();

  try {

    const userId = await insertUser(loginUsuario, senhaUsuario);

    await insertFarmacia(username, celular, Nome, CNPJ, endereco, userId);

    await trx.commit();

    console.log('Distribuidor inseridos com sucesso');
  } catch (error) {
    // Reverter transação
    await trx.rollback();
    console.error('Erro ao inserir distribuidor e usuário:', error);
  }
}
