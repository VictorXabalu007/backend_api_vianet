const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const multer = require('multer');

// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');

        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({ storage });

app.post('/cadastro', upload.single('foto'), (req, res) => {
    const { nome, site } = req.body;
    res.json({ nome, site });
});

app.listen(3000);