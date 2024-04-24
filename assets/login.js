let sheet_id = '1ZwW_YxYYhnL0nmk5vDioA6UEXOIbkq2XbEAghRY-9Zk';
let sheet_title = 'LoginDashboard';
let sheet_range = 'A1:G1000';

let full_url = 'https://docs.google.com/spreadsheets/d/' + sheet_id + '/gviz/tq?sheet=' + sheet_title + '&range=' + sheet_range;

fetch(full_url)
.then(res => res.text())
.then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0,-2));

    //console.log(data.table.rows[0].c[0].v); - Pega o Nome do usuário na tabela
    // console.log(data.table.rows[0].c[1].v); - Pega a senha na tabela
    // console.log(data.table.rows[0].c[2].v); - Pega o email na tabela
    // console.log(data.table.rows[0].c[3].v); - Pega a data na tabela
    // console.log(data.table.rows[0].c[4].v); - Pega o nível de acesso na tabela
    // console.log(data.table.rows[0].c[5].v); - Pega a validação na tabela

    var validado = false;
    var encontrado = false;
    let paragarph = document.createElement("p");
    let divMsg = document.createElement("div");

    function searchUser(email){
        for(let i = data.table.rows.length - 1; i >= 0; i--){
            if(data.table.rows[i].c[2].v == email && data.table.rows[i].c[5].v == "s"){
                console.log(data.table.rows[i].c[0].v + " encontrado");
                validado = true;
                encontrado = true;
                return i;
            }
            if(data.table.rows[i].c[2].v == email && data.table.rows[i].c[5].v == "n"){
                console.log(data.table.rows[i].c[0].v + " não validado");
                validado = false;
                encontrado = true;
                return i;
            }
        }
        validado = false;
        encontrado = false;
        return 0;
    }

    setInterval(function() {
        let inputUsername = document.getElementById('input-username').value;
        let inputPassowrd = document.getElementById('input-password').value;
        let inputEmail = document.getElementById('input-email').value;
        let inputPosition = document.getElementById('input-position').value;

        let indice = searchUser(inputEmail);
        console.log(data.table.rows[indice].c[1]);
        if(validado && encontrado && data.table.rows[indice].c[1].v == inputPassowrd && data.table.rows[indice].c[0].v == inputUsername){
            localStorage.setItem('inputUsername', JSON.stringify(inputUsername));
            window.location.href = "index.html";
            document.getElementById("btn-send").style.visibility = "hidden";
        } else if (!validado && encontrado && data.table.rows[indice].c[0].v == inputUsername) {
            paragarph.innerHTML = "Conta não validada!";
            document.getElementById("btn-send").style.visibility = "hidden";
        } else{
            searchUser(inputEmail);
            document.getElementById("btn-send").style.visibility = "visible";
            paragarph.innerHTML = " ";
        }

        document.getElementById("msg").appendChild(paragarph);
        
    }, 500);
})

