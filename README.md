# meat_api
Curso de node com restify

foi necessario o
    npm i restify-errors@5.0.0 -P -E

    e

    npm i @types/restify-errors@4.3.2 -D -E

bcrypt
    
    npm i bcrypt@1.0.3 -P -E

    npm i @types/bcrypt@1.0.0 -D -E

Inicializar o mongo no linux/mac    

Dentro da pasta da versão, na pasta bin digitar os comandos

        ./mongod --dbpath=../../data/db

Esse data/db é a pasta onde se localiza o banco de dados                 

Instalação do test
        
            npm i jest@22.4.2 ts-jest@22.0.4 typescript@2.6.2 supertest@3.0.0 @types/jest@22.1.2 @types/supertest@2.0.4 -D -E

Mais pacotes que precisaram ser instalados

            npm i ts-node@5.0.1 jest-cli@22.4.2 -D -E

Configuração no package.json            

       ` "scripts": {
            "test": "ts-node jest.startup.ts"
        },`

Adicionado no package.json

    ` "jest": {
        "globals": {
        "address": "http://localhost:3001"
        },`

JSON WEB TOKEN

        npm i jsonwebtoken@8.1.1 -P -E

Definições de tipo

        npm i @types/jsonwebtoken@7.2.5 -D -E      

