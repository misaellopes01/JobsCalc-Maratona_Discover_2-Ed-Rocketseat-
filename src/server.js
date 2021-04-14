    //Importando o express package, guardando-o numa constante
    const express = require("express")
        //express torna-se uma função e atribuímos à constante server
    const server = express()
        // Pega o routes de routes.js e atribui ao routes daqui
    const routes = require("./routes")
    // Importando o path
    const path = require("path")
        // Usando template engine
    server.set('view engine', 'ejs')
    //Juntando o dirname(que tem a função de indicar a pasta onde está o server) e a views de forma a mostrar ao server que a pasta views não está na pasta inicial do projecto mas sim denro da src
    server.set('views', path.join(__dirname, 'views/'))
    //Habilitar arquivos statics
    server.use(express.static("public"))

    //User o req.body (Requisição do Body)
    server.use(express.urlencoded({ extended: true }))

    
    server.use(routes)

        //Acção que liga o servidor... onde colocamos a porta desejada || Arrow function - função sem nome
    server.listen(3000, () => console.log('rodando'))