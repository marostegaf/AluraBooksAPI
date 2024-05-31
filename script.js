async function buscaEndereco(cep) {
    const mensagemDeErro = document.getElementById("erro");
    mensagemDeErro.innerHTML = ""
    try {
        const repostaDaAquisicao = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCEP = await repostaDaAquisicao.json();
        if (consultaCEP.erro) {
            throw Error("Esse CEP não existe!");
        }
        const cidade = document.getElementById("cidade");
        const endereco = document.getElementById("endereco")
        const estado = document.getElementById("estado")
        const bairro = document.getElementById("bairro")    

        cidade.value = consultaCEP.localidade;
        endereco.value = consultaCEP.logradouro;
        estado.value = consultaCEP.uf;
        bairro.value = consultaCEP.bairro;

        console.log(consultaCEP);
        return consultaCEP;
    } catch (erro) {
        mensagemDeErro.innerHTML = `<p id="mensagemDeErro">O CEP inserido é inválido. Tente novamente!</p>`
        console.log(erro);
    }
}

const cep = document.getElementById("cep");
cep.addEventListener("focusout", () => buscaEndereco(cep.value));