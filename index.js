var express = require('express');
var cors = require('cors');
var sqlite3 = require('sqlite3').verbose();
var database = './books.db';
var db = new sqlite3.Database(database, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
var app = express();
app.use(cors());
app.disable('etag');


db.serialize(function() {
    db.run('CREATE TABLE IF NOT EXISTS livros (id int primary key, titulo text, autor text, editora text, area text)');

    // Não terminei de implementar o create.
// Achei que iria conseguir fazer tudo em um dia, mas não consegui.
// Mesmo assim fiquei feliz por que aprendi muito tando de nodejs, express e react
// fazendo essa atividades, saberia tranquilamente implementar o resto
// não digo isso pela nota, acho justo descontar, digo pelo aprendizado mesmo =)
// descomentar essa linha para testar a lista de livros
    //db.run('insert into livros values (1, "O mundo de sofia", "Jostein Gaarder", "Seguinte", "Filosofia")');
  });
  
db.close();

app.get('/', function (req, res) {
    
  res.send('Hello World!');
});


app.get('/books/getall', function (req, res) {
    var livros = [];
    var db = new sqlite3.Database(database);
    db.all('select * from livros', (err, rows) => {
      res.send(rows);  
    });

    db.close();
    
});


app.post('/books/create', function (req, res) {
  console.log(req.body);
  
  //var livros = [];
  var newLivro = ['Livro 1','Ulysses Queiroz', 'Companhia das Letras', 'Romance'];
  var db = new sqlite3.Database(database);
  db.run('insert into livros (id, titulo, autor, editora, area) values (NULL, ?, ?, ? ,?)', 
  newLivro, 
  (err, rows) => {
    res.send(rows);  
  });

  db.close();  
});

app.listen(3001, function () {
  console.log('Running');
});