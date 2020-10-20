//variaveis
const porta = 3030;

//importando modulos
const fs = require('fs')
const path = require('path'); //path pra poder andar pelos diretorios
const express = require('express');
const app = express();


//pasta com os arquivos estaticos
app.use(express.static('public'));

// utilizar o ejs pra renderizar as paginas html
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../templates', 'views'));

//pagina renderizada
app.get('/',(req,res,next)=>{    
    res.render('index');
})



//executar servidor
app.listen(porta,()=>{
    console.log(`Servidor executando na porta ${porta}.`);
})