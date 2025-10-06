const express = require('express');
const path = require('path');
const app = express();


const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const publicDir = path.join(__dirname, './public');

let pessoas = [
    {
        id: 1,
        nome: 'Lara',
        login: 'admin',
        senha: '123',
        idade: 14,
        irmaos: true,
        cidade: 'São Paulo',
        hobby: 'Desenhar'
    },
    {
        id: 2,
        nome: 'Gaby',
        login: 'admin1',
        senha: '123',
        idade: 13,
        irmaos: false,
        cidade: 'Rio de Janeiro',
        hobby: 'Tocar violão'
    },
    {
        id: 3,
        nome: 'Anna Laura',
        login: 'admin3',
        senha: '123',
        idade: 14,
        irmaos: true,
        cidade: 'Belo Horizonte',
        hobby: 'Dançar'
    },
    {
        id: 4,
        nome: 'Yasmin',
        login: 'admin4',
        senha: '123',
        idade: 14,
        irmaos: true,
        cidade: 'Salvador',
        hobby: 'Ler livros'
    },
    {
        id: 5,
        nome: 'Lynne',
        login: 'admin5',
        senha: '123',
        idade: 13,
        irmaos: true,
        cidade: 'Curitiba',
        hobby: 'Jogar videogame'
    },
];

// ========================================
// 3. ROTAS DA API (ENDPOINTS)
// ========================================


// ROTA DE TESTE
// Método: GET
// Endpoint: http://localhost:3000/
// Função: Verificar se a API está funcionando
app.get("/", (req, res) => {
    res.sendFile(path.join(publicDir, "login.html"));
});

app.post('/login', (req, res) => {
    const { login, senha } = req.body

    app.get('/itens.html', (req, res) => {
        res.sendFile(path.join(publicDir, 'itens.html'));
    })



    //verifica se um dos campos vieram vazios
    if (!login || !senha) {
        res.status(404).json({
            status: 404,
            message: "Requisição inválida"
        })
    }

    const usuario = pessoas.find((p) => p.login === login)
    if (!usuario) {
        res.status(404).json({
            status: 404,
            message: "Usuário não encontrado"
        })
    }
    if (usuario.senha !== senha) {
        res.status(404).json({
            status: 404,
            message: "Senha inválida"
        })
    }
    // {"status":200,"message":"Login com sucesso"}
    //res.status(200).json({ status: 200, message: "Login com sucesso" })
    res.redirect('/itens.html')
});


app.get('/itens.html', (req, res) => {
    res.sendFile(path.join(publicDir, 'itens.html'));
});

app.get('/pessoas', (req, res) => {
    res.status(200).json(pessoas);
})

//POST: Criar uma pessoa no array pessoas
app.post('/pessoas', (req, res) => {
    const {nome, login, senha } = req.body

    if(!nome || !senha || !login){
        res.status(400).json('Faltou informação')
    }

    const pessoaExiste = pessoas.find((p) => p.login === login)
    if(pessoaExiste){
        res.status(404).json("Pessoa existe")
    }

    const novaPessoa = {
        id: pessoas.length + 1,
        nome,
        login,
        senha,
    }
    pessoas.push(novaPessoa)
    res.status(201).json("Pessoa criada com sucesso!")
})


app.get('/pessoas', (req, res) => {
    res.status(200).json(pessoas);
})
//Post;

app.post('/pessoas', (req, res) => {
    const { nome, idade, login, senha, irmaos, cidade, id, hobby } = req.body
    if (!nome || !idade || !irmaos || !cidade || !hobby) {
        res.status(400).json("pessoa existe")
    }
    const pessoaExiste = pessoas.findIndex((p) => p.login === login)
    if (pessoaExiste !== -1) {
        res.status(404).json("pessoa existe")
    }

    const novaPessoa = {
        id: pessoas.length + 1,
        nome,
        idade,
        irmaos,
        cidade,
        hobby,
    }
    pessoas.push(novaPessoa)
    res.status(201).json("pessoa criada com sucesso!")
});

app.put("/pessoas/:id", (req, res) => {
    const id = parseInt(req.params.id);
  
    const pessoaIndex = pessoas.findIndex((p) => p.id === id);
    if (pessoaIndex === -1) {
      return res.status(404).json({ message: "Pessoa não encontrada" });
    }
    const pessoaAtualizada = {
      id: id,
      nome: req?.body?.nome,
      idade: req?.body?.idade,
      irmaos: req?.body?.irmaos,
      cidade: req?.body?.cidade,
      hobby: req?.body?.hobby,
    };
    pessoas[pessoaIndex] = pessoaAtualizada;
    res.json({ message: "Pessoa atualizada com sucesso", pessoaAtualizada });
  });

  app.delete("/pessoas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pessoaIndex = pessoas.findIndex((p) => p.id === id);
    if (pessoaIndex === -1) {
      return res.status(404).json({ message: "Pessoa não encontrada" });
    }
  
    pessoas.splice(pessoaIndex, 1);
    res.json({ message: "Pessoa deletada com sucesso" });
  });

  app.get('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find((p) => p.id === id);
    if (!pessoa) {
      return res.status(404).json({ message: "Pessoa não encontrada" });
    }
    res.json(pessoa);
    
  });


  
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});