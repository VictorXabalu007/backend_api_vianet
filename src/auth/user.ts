import {
  knex
} from "../db/database";

// Função para obter um usuário por email
export function getUserByEmail(email: string) {
  try {
    const user = knex('Usuario').where({
      email
    }).first();
    return user;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    throw error;
  }
}
export function getUserByID(id: number) {
  try {
    const user = knex('Usuario').where({
      id
    }).first();
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
    const user = await knex('Usuario').where({
      id
    }).first();
    return user;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    throw error;
  }
}