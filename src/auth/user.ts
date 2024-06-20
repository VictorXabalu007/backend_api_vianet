import { knex } from "../db/database";

// Função para obter um usuário por email
export async function getUserByLogin(login: string) {
    try {
      const user = await knex('usuario').where({ login }).first();
      return user;
    } catch (error) {
    console.error('Erro ao obter usuário:', error);
    throw error;
  }
}