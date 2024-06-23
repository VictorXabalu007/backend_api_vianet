import { knex } from "../db/database";

// Função para obter um usuário por email
export async function getUserByEmail(email: string) {
    try {
      const user = await knex('Usuario').where({ email }).first();
      return user;
    } catch (error) {
    console.error('Erro ao obter usuário:', error);
    throw error;
  }
}
export async function getUserByID(id: number) {
  try {
    const user = await knex('Usuario').where({ id }).first();
    return user;
  } catch (error) {
  console.error('Erro ao obter usuário:', error);
  throw error;
}
}

//vai mostrar as informaçoes 
//ainda n funciona
export async function getInformationByID(id: number) {
  try {
    const user = await knex('Usuario').where({ id }).first();
    return user;
  } catch (error) {
  console.error('Erro ao obter usuário:', error);
  throw error;
}
}