var express = require('express'); // importar o express
var bodyParser = require('body-parser'); // importar o body-parser
var path = require('path'); // importar lib path (nativa do node.js)
var expressLayouts = require('express-ejs-layouts');
var calc = require('./calculadora'); // importar modulo de calc. (calculadora.js)


var app = express(); // criar um app do express

// configura os dados oriundos da requisição http.
app.use(bodyParser.urlencoded({extended: true})); 

app.use(expressLayouts);

// configura o caminho para arquivos estaticos (img, css, html, js...)
app.use(express.static('public')); // http://<host>:<port>/imagens/foto.jpg

app.set('view engine', 'ejs'); // setar o motor de views q será usado
app.set('views', path.join(__dirname, '/views')); // caminho da pasta 'views'

app.get('/', function(req, res) {
    const parametro = {
        resultado: ''
    };
    res.render('index', parametro);
});

app.post('/soma', function(req, res) {
    var body = req.body;
    var a = parseFloat(body.a);
    var b = parseFloat(body.b);
    var resultado = calc.somar(a, b);
    res.render('index', {
      titulo: 'Soma EJS',
      operacao: 'soma',
      a: a,
      b: b,
      resultado: resultado
    });
});

const port = process.env.PORT ? process.env.PORT : 3002;

app.listen(port, function() {
    console.log(`Servidor executando na porta ${port}`);
});
