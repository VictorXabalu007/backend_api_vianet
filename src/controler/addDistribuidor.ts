import {
  knex
} from '../db/database';


//------------faz o cadastro do id geral--------------------------------------------

async function insertUser(email: string, senha: string): Promise < number > {
  try {
    const [userId] = await knex('Usuario').insert({
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

async function insertDistributor(username: string, endereco: string, usuarioId: number): Promise < number > {
  try {
    const [distributorId] = await knex('Distribuidores').insert({
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
export async function addDistribuidor(nomeDistribuidor: string, enderecoDistribuidor: string, loginUsuario: string, senhaUsuario: string): Promise < void > {


  const trx = await knex.transaction();

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