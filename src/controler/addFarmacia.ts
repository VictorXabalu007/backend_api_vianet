//vai adicionar as farmacias


import {
  knex
} from '../db/database';


//------------faz o cadastro do id geral--------------------------------------------

async function insertUser(email: string, senha: string): Promise < number > {
  try {
    const [userId] = await knex('Usuario').insert({
      email,
      senha,
      tipo: 2
    });
    return userId;
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    throw error;
  }
}
//------------cadastra os dados exclusivos--------------------------------------------

async function insertFarmacia(username: string, celular: number, Nome: string, CNPJ: string, endereco: string, usuarioId: number): Promise < number > {
  try {
    const [FarmaciaId] = await knex('Farmacia').insert({
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
export async function addFaramacia(username: string, celular: number, Nome: string, CNPJ: string, endereco: string, loginUsuario: string, senhaUsuario: string): Promise < void > {


  const trx = await knex.transaction();

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