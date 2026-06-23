let form = document.getElementById("Formulario");

let fila_de_espera = [];

let resultado_de_espera = document.getElementById("resultado_de_espera");

function salvarNoLocalStorage() {
   
    let itensFormatados = fila_de_espera.map(pessoa => pessoa.join("-"));
    let stringParaSalvar = itensFormatados.join(", ");
    localStorage.setItem("filaLoterica", stringParaSalvar);
}

function carregarDoLocalStorage() {
    let dadosSalvos = localStorage.getItem("filaLoterica");
    if (dadosSalvos && dadosSalvos.trim() !== "") {
        let itensFormatados = dadosSalvos.split(", ");
        fila_de_espera = itensFormatados.map(item => item.split("-"));
    }
}


carregarDoLocalStorage();
listar();

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    let nome = document.getElementById("nome").value.trim();
    let tipo_atendimento = document.querySelector(
        "input[name='tipo_atendimento']:checked"
    );

    if (nome === "") {
        alert("Informe um nome!");
        return;
    }

   

function adicionar(nome, tipo) {
    let pessoa = [nome, tipo];
    if (tipo === "prioridade") {

        fila_de_espera.unshift(pessoa);

    } else {
        fila_de_espera.push(pessoa);
    }
    salvarNoLocalStorage(); 
}

function listar() {
    resultado_de_espera.innerHTML = "";
    if (fila_de_espera.length === 0) {
        resultado_de_espera.innerHTML = "nenhum filme!";
        return;
    }

    for (let i = 0; i < fila_de_espera.length; i++) {
        resultado_de_espera.innerHTML += `
            <p>
                Índice: ${i}  <br>
                Nome: ${fila_de_espera[i][0]} <br>
                Tipo: ${fila_de_espera[i][1]}  <br>
                <button onclick="editar(${i})">Editar</button>
                <button onclick="excluir(${i})">Excluir</button>

            </p>
        `;
    }

}

function editar(indice) {
    let novo_nome = prompt("Digite o novo nome:");
    if (novo_nome !== null && novo_nome.trim() !== "") {
        fila_de_espera[indice][0] = novo_nome;
        listar();
        salvarNoLocalStorage(); 
    }

}

function excluir(indice) {
    fila_de_espera.splice(indice, 1);
    listar();
    salvarNoLocalStorage(); 
}

function atender() {
    if (fila_de_espera.length > 0) {
        fila_de_espera.shift();
        listar();
        salvarNoLocalStorage(); 
    }
}
})
