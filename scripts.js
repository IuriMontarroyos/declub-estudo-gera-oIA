/* 
Lógica de Programação

Algoritmo - Receita de BOLO

[x] Saber quando o botão foi clicado
[x] Pegar o texto do TextArea
[x] Enviar para a IA(servidor)
[x] Pegar a resposta da IA
[ ] Colocar na tela
    [x] Código
    [x] Resultado do Código     
[ ] Refinar nosso resultado        

    querySelector - pega um elemento que eu escolher
    HTML - document
    JavaScript - script
*/
const API_KEY = "SUA_CHAVE_REAL_AQUI"  // Configure sua chave aqui
const ENDPOINT = "https://api.groq.com/openai/v1/chat/completions"

let prompt = ''
// Clicou no Botão GERAR - Chama essa função
async function gerarCodigo() {
    try {
        let textarea = document.querySelector(".texto-pagina").value.trim()
        let espacoCodigo = document.querySelector(".bloco-codigo")
        let espacoSite = document.querySelector(".bloco-site")

        if (!textarea) {
            espacoCodigo.textContent = "Digite a descrição do seu negócio antes de gerar o código."
            espacoSite.srcdoc = ""
            return
        }

        espacoCodigo.textContent = "Gerando..."
        espacoSite.srcdoc = ""

        let resposta = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                "model": "openai/gpt-oss-120b",
                "messages": [
                    {
                        "role": "user",
                        "content": textarea
                    },
                    {
                        "role": "system",
                        "content": "Você é um programador especialista em criar sites para negócios. Gere um código HTML completo, moderno e responsivo, com base na descrição do negócio fornecida pelo usuário. O código deve ser otimizado para SEO e incluir elementos visuais atraentes. Certifique-se de que o site seja fácil de navegar e que destaque os pontos fortes do negócio. O código deve ser limpo, bem estruturado e pronto para ser usado em um ambiente de produção."
                    }
                ]
            })
        })

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`)
        }

        let dados = await resposta.json()
        let resultado = dados.choices[0].message.content

        espacoCodigo.textContent = resultado
        espacoSite.srcdoc = resultado
    } catch (erro) {
        let espacoCodigo = document.querySelector(".bloco-codigo")
        let espacoSite = document.querySelector(".bloco-site")
        espacoCodigo.textContent = "Erro: " + erro.message
        espacoSite.srcdoc = ""
        console.error(erro)
    }
}

/* 
IA para gerar o que queremos 

1) Qual o modelo de IA vamos usar
2) system - Quem a IA deve ser - Programador / Designer
3) user - mensagem do usuário
*/
