// Javascript Document

var usuarios=[];

var usuario={
    email: "",
    senha: ""
};


//update the user data with database in real time
firebase.database().ref('usuarios').on('value', function (snapshot) {
    snapshot.forEach(function(item){
        usuarios.push(item.val());
    });
});

function cleanFields(){
    document.getElementById("nickname").value="";
    document.getElementById("password").value="";
}

function login(){
    if(document.getElementById("nickname").value=="" || document.getElementById("password").value==""){
        alert("Preencha os campos para realizar o login!");
        cleanFields();
    
    }else if(checkLogin()){
        alert("Usúario ou senha incorretos!");
        cleanFields();

    }else{
        window.location.href="./menu.html";//colocar nome arquivo proxima pagina
    }
}

function checkLogin(){
    for(i=0;i<usuarios.length;i++){
        if(usuarios[i].email==document.getElementById("nickname").value){
            if(usuarios[i].senha==sha256(document.getElementById("password").value)){
                sessionStorage.setItem("imuniUserName",usuarios[i].email);
                return false;
            }
        }
    }
    return true;
}

function clearCreate(){
    document.getElementById("cnickname").value="";
    document.getElementById("cpassword").value="";
}

function createUser(){
    if(document.getElementById("cnickname").value!="" && document.getElementById("cpassword").value!=""){
        if(checkUser()){
            usuario.email=document.getElementById("cnickname").value;
            usuario.senha=sha256(document.getElementById("cpassword").value);
            firebase.database().ref().child('usuarios').push(usuario);
            clearCreate();
            alert("Conta criada com sucesso!");
            window.location.reload();
        }else{
            alert("Email ja cadastrado!");
            clearCreate();
        }
    }else{
        alert("Preencha os campos para concluir o cadastro!");
        clearCreate();
    }
}

function checkUser(){
    for(i=0;i<usuarios.length;i++){
        if(usuarios[i].nickname==document.getElementById("cnickname").value){
            return false;
        }
    }
    return true;
}
