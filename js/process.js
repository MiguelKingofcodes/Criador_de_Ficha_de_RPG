    // Botões 
const dwbtn = document.getElementById("download_button");
const save_image_button = document.getElementById("save-button");

// Pontos de personagem
var perPoints = 10;

    // Foto do personagem
const per_image = document.getElementById("photo-preview");

// Adiciona a função ao botão dowload

dwbtn.addEventListener('click', function () {
    save_ficha();
}); 
// Adiciona função ao botão "salvar_imagem"

// Cria Objeto ActiveX
const dados = new ActiveXObject("Scripting.FileSystemObject");

//Função para gravar o arquivo
function download(data, filename, type) {    
    let file = new Blob([data], { type: type });

    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, filename);
        return
    }

    const a = document.createElement("a");
    const url = URL.createObjectURL(file);

    a.href = url;
    a.download = filename;

    document.body.appendChild(a);

    a.click();

    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

function save_ficha(){
    
    // Obtendo características do personagem...
    let p_name = document.getElementById('p_name').value;
    let p_years = document.getElementById('p_years').value;
    let p_ocupation = document.getElementById('p_ocupation').value;
    let p_fightstyle = document.getElementById('p_fightstyle').value;
    let root_image = document.getElementById("photo-input").value;
    let p_image = document.getElementById("p_image").getAttribute('src');

    // Obtendo as cores das fichas...



    // Obtendo os atributos do personagem...
    let perAttr = [document.getElementById("for-input").value, 
                document.getElementById("vig-input").value,
                document.getElementById("int-input").value,
                document.getElementById("car-input").value];



    // Gera o html contendo os dados da ficha...
    let ficha_value = '<!DOCTYPE html>' +
    '<head>'+
    '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">'+
    '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>'+
    '<style>'+
    'body{'+
    'background-color:' + document.body.style.backgroundColor + ';'+
    'color: ' + document.body.style.color + ';' +
    'font-size: 3em;'+
    '}'+
    '#attribute_box{'+
    'background-color:' + document.getElementById("attribute-box").style.backgroundColor + ';'+
    'color:' + document.getElementById("attribute-box").style.color + ';'+
    '}'+
    '</style>' +
    '</head>'+
    '<body>'+
        '<div class="container-fluid p-2">'+
            '<img class="mb-3" src="' + p_image + '" width="100%">' +
            '<textarea style="background-color: '+ document.body.style.backgroundColor + '; color: ' + document.body.style.color + '; opacity: 3;" class="container-fluid">Nome: '+ p_name + '</textarea>' +
            '<textarea style="background-color: '+ document.body.style.backgroundColor + '; color: ' + document.body.style.color + '; opacity: 3;" class="container-fluid">Idade: '+ p_years + '</textarea>' +
            '<textarea style="background-color: '+ document.body.style.backgroundColor + '; color: ' + document.body.style.color + '; opacity: 3;" class="container-fluid">Ocupação: '+ p_ocupation + '</textarea>' +
            '<textarea style="background-color: '+ document.body.style.backgroundColor + '; color: ' + document.body.style.color + '; opacity: 3;" class="container-fluid">Estilo de luta: '+ p_fightstyle + '</textarea>' +
        '</div>'+
        '<div style="font-size:1em;" class="container-fluid" id="attribute_box">'+
            '<h1> Atributos:  </h1>'+
            '<p>HP: ' + document.getElementById("hp-value").innerText + '</p>' + 
            '<p>San: ' + document.getElementById("san-value").innerText + '</p>'+
            '<p> Força: '+ perAttr[0] +'</p>' +
            '<p> Inteligência: '+ perAttr[1] +'</p>' +
            '<p> Vigor: '+ perAttr[2] +'</p>' +
            '<p> Carisma: '+ perAttr[3] +'</p>' +
        '</div>'+
        '<h1>Inventário: </h1>'+
        '<textarea class="form-control" style="background-color: '+ document.body.style.backgroundColor + '; color: ' + document.body.style.color + '; opacity: 3; font-size: 1.3em;">'+ document.getElementById("bag_input").value +'</textarea>' +
        '<h1>História</h1>'+
        '<textarea class="form-control" style="background-color: '+ document.body.style.backgroundColor + '; color: ' + document.body.style.color + '; opacity: 3; font-size: 1.3em;">'+ document.getElementById("history_input").value +'</textarea>' +    
    '</body>'

    // Salva o html
    //download(ficha_value, p_name, 'text/html');
    download(ficha_value, p_name, 'text/html')

}

function save_image(){
    let img_location = document.getElementById("photo-container");
    let root_image = document.getElementById("photo-input").value;
    img_location.innerHTML = "";
    img_location.innerHTML = "<img " + "src='" + root_image + "' id='p_image' width=100%>" +
    "<input class='form-control mt-3' type='link' id='photo-input' class='photo-btn' placeholder='Link para foto do personagem'>" +
    "<input class='form-control btn btn-primary mt-3' type='button' class='save-button' value='Salvar' onclick='save_image()'>";
}


// ! Cores da ficha...

function changeBackgroundColor(){
    let backInput = document.getElementById("backgroundInput").value;
    document.body.style.backgroundColor = backInput;
}

function changeFontColor(){
    let fontInput = document.getElementById("fontInput").value;
    document.body.style.color = fontInput; 
}

function changeBoxBackground(){
    let background_value = document.getElementById("color-input-background").value;
    document.getElementById("attribute-box").style.backgroundColor = background_value;
}
function changeFontBackground(){
    let font_value = document.getElementById("color-input-font").value;
    document.getElementById("attribute-box").style.color = font_value;
}


// ? Definindo funções dos atributos...


function upStats(choosed_stat){
    if (perPoints-- > 0 && parseInt(choosed_stat.value) + 1 <= 10){
        perPoints = perPoints--;
        choosed_stat.value = parseInt(choosed_stat.value) + 1;
        document.getElementById("attrPoints").innerText = perPoints;

    } else {
        alert("Sem mais pontos de atributo, subtraia de outros campos para somar neste...");
        perPoints++;
    }

    changeStats();

}

function downStats(choosed_stat){
    if (perPoints++ < 10 && parseInt(choosed_stat.value) - 1 >= 0){
        perPoints = perPoints++;
        choosed_stat.value = parseInt(choosed_stat.value) - 1;
        document.getElementById("attrPoints").innerText = perPoints;

    }else{
        alert("Não há mais pontos para subtrair deste atributo...");
        perPoints--;
    }

    changeStats();

}

function changeStats(){
    // Elementos

        // Atributos

    let hp = 12 + parseInt(document.getElementById("vig-input").value);
    let san = 10 + parseInt(document.getElementById("int-input").value);

    document.getElementById("hp-value").innerText = "";
    let hp_value = "";
    for (let i=1; i <= hp; i++){
        hp_value += "/";
        
    }
    document.getElementById("hp-value").innerText += hp_value + " (" + hp + ")";



    document.getElementById("san-value").innerText = "";
    let san_value = "";
    for (let i=1; i <= san; i++){
        san_value += "/";
    }
    document.getElementById("san-value").innerText += san_value + " (" + san + ")";
}
