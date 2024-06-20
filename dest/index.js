import express from 'express';
import knex from 'knex';
// Use require to import the JavaScript module
const { loadDbConfig, addDistribuidor } = require('./controler/addDistribuidor.js');
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// app.get('/produtos', (req: Request, res: Response) => {
//   const users = [
//     { id: 1, name: 'John Doe' },
//     { id: 2, name: 'Jane Doe' },
//   ];
//   res.json(users);
// });
app.get('/registro', async (req, res) => {
    try {
        const config = await loadDbConfig();
        const db = knex(config);
        const nomeDistribuidor = 'Distribuidor Exemplo';
        const enderecoDistribuidor = 'Endereço Exemplo';
        const loginUsuario = 'usuario_exemplo';
        const senhaUsuario = 'senha_exemplo';
        await addDistribuidor(db, nomeDistribuidor, enderecoDistribuidor, loginUsuario, senhaUsuario);
        res.status(200).send("Distribuidor inserido com sucesso");
    }
    catch (error) {
        console.error('Erro ao inserir distribuidor e usuário:', error);
        res.status(500).send('Erro ao inserir distribuidor e usuário');
    }
});
// Start the Express server (adjust the port as needed)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=index.js.map