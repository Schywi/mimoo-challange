# Como instalar as dependencias
Caso nao tenha o serverless framework instalado: 
Execute : ``npm install -g serverless``
Depois execute : ``npm install `` para executar o resto das dependencias


# Autenticação 
Adicione o id : 18K79QxWTj4E0HuK0RhDhyS8GbfVG8L1j0epFeqc ou qualquer outro na tabela  TokenTable no aws para permitir a autenticação das rotas. 

# Swagger
Acesse a documentação da api no arquivo ``APIDocumentation.yml``

# Como fazer o deploy para a amazon
Crie ou utilize um usuario IAM que possua direitos administrativos
Acesse a AWS e salve a IAM key e secrect key 
Execute: ``serverless config credentials --provider aws --key 1234 --secret 5678`` 
Depois execute ``serverless deploy -v``

# Testando rotas no curl

No terminal bash execute
```
export acess_token=18K79QxWTj4E0HuK0RhDhyS8GbfVG8L1j0epFeqc

```


## GET /tools
Lista todos dados do dynamodb (ferramentas)

```
curl -X GET 'https://riop6hj5k7.execute-api.us-east-1.amazonaws.com/dev/tools' -H "Content-Type: application/json" -H "X-Amz-Security-Token:$acess_token"  
```

## POST /tools
Cria novas ferramentas no dynamoDB

```
curl -X POST 'https://riop6hj5k7.execute-api.us-east-1.amazonaws.com/dev/tools' -H "Content-Type: application/json" -H "X-Amz-Security-Token:$acess_token"  -d '{"link": "https://github.com/typicode/hotel","description": "HELLO WORLD. localhost domain and https out of the box.","tags": ["science","history","math"]}'
```

JSON Usado
```
{
            "link": "https://github.com/typicode/hotel",
            "description": "HELLO WORLD. localhost domain and https out of the box.",
            "tags": [
                "science",
                "history",
                "math"
            ]
         
        }
```
 

## DELETE /tools/:id
Deleta uma ferramenta pelo id 

```
curl -X DELETE 'https://riop6hj5k7.execute-api.us-east-1.amazonaws.com/dev/tools/4e84890a-38b6-485e-9363-7828b3ea28a0' -H "Content-Type: application/json" -H "X-Amz-Security-Token:$acess_token" 
```

## PUT /tools/:id
Altera as tags de uma ferramenta existente

id exemplo: 937c866b-a2d3-4b62-8690-2ac203f92cb4
```
curl -X PUT 'https://riop6hj5k7.execute-api.us-east-1.amazonaws.com/dev/tools/937c866b-a2d3-4b62-8690-2ac203f92cb4' -H "Content-Type: application/json" -H "X-Amz-Security-Token:$acess_token"  -d '{"tags": ["node", "organizing"]}'
```

JSON usado:
```
    {
     "tags": [
                "node",
                "organizing"
            ]
}
```

## GET /tools/:id
Retorna a ferramenta do id informado
```
curl -X GET 'https://riop6hj5k7.execute-api.us-east-1.amazonaws.com/dev/tools/937c866b-a2d3-4b62-8690-2ac203f92cb4' -H "Content-Type: application/json" -H "X-Amz-Security-Token:$acess_token"
```

## GET /tools-tag/:tagName
Lista todas as ferramentas por tag informada
```
curl -X GET 'https://riop6hj5k7.execute-api.us-east-1.amazonaws.com/dev/tools-tag/node' -H "Content-Type: application/json" -H "X-Amz-Security-Token:$acess_token"
```


# Como executar os testes unitarios e integrados
Certifique-se de ter o java instalado e ter executado ``npm install`` anteriormente
Execute: ``npm run test``

## Instalando java no linux
caso use windows confira o site oficial, link: https://www.java.com/pt-BR/download/manual.jsp
sudo apt-get install default-jre
sudo apt-get install default-jdk



# Como rodar as rotas offline/dynamo : 

Para testar offline e rodar os testes automatizados com dynamoDB instale o java 

Installe o dynamodb com o commando abaixo:
``sls dynamodb install --localPath ./bin``

Depois execute: 
``sls offline start --location``








 


