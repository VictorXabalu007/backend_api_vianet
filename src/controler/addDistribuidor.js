import { kknex } from "../db/database.js";


//------------faz o cadastro do id geral--------------------------------------------

async function insertUser(email, senha) {
  try {
    const [userId] = await kknex('Usuario').insert({
      email,
      senha,
      tipo: 1
    });
    return userId;
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    throw error;
  }
}
//------------cadastra os dados exclusivos--------------------------------------------

async function insertDistributor(username, endereco, usuarioId) {
  try {
    const [distributorId] = await kknex('Distribuidores').insert({
      username,
      endereco,
      usuario_id: usuarioId
    });
    return distributorId;
  } catch (error) {
    console.error('Erro ao inserir distribuidor:', error);
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
