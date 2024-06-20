import { readFile } from 'fs/promises';
//------------pega o json--------------------------------------------
export async function loadDbConfig() {
    const data = await readFile(new URL('./auth/db.json', import.meta.url), 'utf8');
    return JSON.parse(data);
}
//------------faz o cadastro do id geral--------------------------------------------
async function insertUser(db, login, senha) {
    try {
        const [userId] = await db('usuario').insert({
            login,
            senha
        });
        return userId;
    }
    catch (error) {
        console.error('Erro ao inserir usuário:', error);
        throw error;
    }
}
//------------cadastra os dados exclusivos--------------------------------------------
async function insertDistributor(db, nome, endereco, usuarioId) {
    try {
        const [distributorId] = await db('Distribuidoras').insert({
            nome,
            endereco,
            usuario_id: usuarioId
        });
        return distributorId;
    }
    catch (error) {
        console.error('Erro ao inserir distribuidor:', error);
        throw error;
    }
}
//------------principal--------------------------------------------
export async function addDistribuidor(db, nomeDistribuidor, enderecoDistribuidor, loginUsuario, senhaUsuario) {
    const trx = await db.transaction();
    try {
        const userId = await insertUser(trx, loginUsuario, senhaUsuario);
        await insertDistributor(trx, nomeDistribuidor, enderecoDistribuidor, userId);
        await trx.commit();
        console.log('Distribuidor inseridos com sucesso');
    }
    catch (error) {
        // Reverter transação
        await trx.rollback();
        console.error('Erro ao inserir distribuidor e usuário:', error);
    }
}
//# sourceMappingURL=addDistribuidor.js.map