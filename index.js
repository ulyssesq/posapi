var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
var app = express();

db.serialize(function() {
    db.run('CREATE TABLE livros (id int, titulo text, autor text, editora, area text)');
    db.run('insert into livros values (1, "O mundo de sofia", "Jostein Gaarder", "Seguinte", "Filosofia")');
  });
  
db.close();


app.get('/', function (req, res) {
    
  res.send('Hello World!');
});

app.get('/livros/getall', function (req, res) {
    var livros = [];
    var db = new sqlite3.Database(':memory:');
    db.serialize(function() {
        db.each('select * from livros', function(err, row) {
            console.log(row);
           livros.push(row);     
        });
    });

    res.send(livros);
    db.close();
  });

app.listen(3000, function () {
  console.log('Running');
});