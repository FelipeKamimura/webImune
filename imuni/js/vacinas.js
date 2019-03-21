// Javascript Document

var dados=[];

var dado=[{
    email: "",
    vacina: {
        nome: "",
        doses: "",
        descricao: "",
        dose: {
            qtd: "",
            assinatura: "",
            data: "",
            lote: ""
        }
    }
}];

//update the user data with database in real time
firebase.database().ref('dados').on('value', function (snapshot) {
    snapshot.forEach(function(item){
        dados.push(item.val());
    });
    if(checkData()){
        printar();
    }else{
        document.getElementById("cards").innerHTML = "<p>vacina vazia</p>";
    }
});    

/*
    verifica se existe um banco de dados relacionado o usario
    se sim: carrega banco
    se não: cria banco vazio com referencia ao usuario
*/
function checkData(){
    var j=0;
    var validade = false;
    for(i=0;i<dados.length;i++){
        if(dados[i].email==sessionStorage.getItem("imuniUserName")){
            dado[j] = dados[i];
            j++;
            validade = true;
        }
    }
    if(validade){
        return validade
    }else{
        createData();
        return validade;
    }
    
}

function createData(){
    dado[0].email = sessionStorage.getItem("imuniUserName");
    firebase.database().ref().child('dados').push(dado[0]);
    window.location.reload();
}

function printar(){
    var text = "";
    dado.forEach( element => {
        text += "<div class='card bg-light p-2 m-5 tamanho'><div class='card-body'><h5 class='card-title'>";
        text  += element.vacina.nome;
        text += "</h5><h6 class='card-subtitle mb-2 text-muted'>"
        text+= element.vacina.descricao;
        text += "</h6><p class='card-text'></p></div>";
        text += "<button class='btn btn-primary' type='button' data-toggle='collapse' data-target=#"+ element.vacina.nome +" aria-expanded='false' aria-controls='collapseExample'>";
        text += "Doses </button><div class='collapse' id="+ element.vacina.nome +"><div class='card card-body'>";
        //(element.vacina.dose).forEach((d) => {
            text += "Assinatura:" + element.vacina.dose.assinatura + "<br/>"
            text += "Data:" + element.vacina.dose.data + "<br/>"
            text += "Lote:" + element.vacina.dose.lote + "<br/>"
            text += "Quantidade:" +element.vacina.dose.qtd + "<br/>"
        //});
        text += "</div></div></div></div>";
    })

    document.getElementById("cards").innerHTML = text;
}
