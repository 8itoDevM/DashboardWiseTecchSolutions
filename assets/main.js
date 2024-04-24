let sheet_id = '1ZwW_YxYYhnL0nmk5vDioA6UEXOIbkq2XbEAghRY-9Zk';
let sheet_title = 'LoginDashboard';
let sheet_range = 'A1:G1000';

let full_url = 'https://docs.google.com/spreadsheets/d/' + sheet_id + '/gviz/tq?sheet=' + sheet_title + '&range=' + sheet_range;

let inputUsername = JSON.parse(localStorage.getItem('inputUsername'));

console.log(inputUsername);

fetch(full_url)
.then(res => res.text())
.then(rep => {
    let data = JSON.parse(rep.substr(47).slice(0,-2));

    // console.log(data.table.rows[0].c[0].v); - Pega o Nome do usuário na tabela
    // console.log(data.table.rows[0].c[1].v); - Pega a senha na tabela
    // console.log(data.table.rows[0].c[2].v); - Pega o email na tabela
    // console.log(data.table.rows[0].c[3].v); - Pega a data na tabela
    // console.log(data.table.rows[0].c[4].v); - Pega o nível de acesso na tabela
    // console.log(data.table.rows[0].c[5].v); - Pega a validação na tabela

    let container = document.getElementById("lateral-bar");
    let priority;

    let sidebar = [
        {
            name: "Bater ponto",
            link: "https://8itodevm.github.io/WorkTimer/",
            priorityNeed: 5
        },
        {
            name: "Calcular salário",
            link: "https://8itodevm.github.io/sistemasalario/",
            priorityNeed: 1
        },
        {
            name: "Gerenciar usuários",
            link: "https://8itodevm.github.io/gerenciamento-de-usuarios/",
            priorityNeed: 2
        },
    ];

    function appendRows(){
        sidebar.forEach(function(row){
            if(priority <= row.priorityNeed) {
                let rowItem = document.createElement("div");
                rowItem.className = "sidebar-item"; // Defina a classe apropriada
            
                let rowTitle = document.createElement("h1");
                rowTitle.textContent = row.name; // Defina o conteúdo do título
            
                let rowLink = document.createElement("a");
                rowLink.href = row.link; // Defina o URL do link
                rowLink.textContent = "Abrir sistema"; // Adicione um texto ao link (opcional)
            
                rowItem.appendChild(rowTitle);
                rowItem.appendChild(rowLink);
            
                container.appendChild(rowItem);
            }
        });
    }

    function getPriorityLevel(username){
        for(let i = data.table.rows.length - 1; i >= 0; i--){
            if(data.table.rows[i].c[0].v == username){
                return priority =  data.table.rows[i].c[4].v;
            }
        }
        return priority = 5;
    }
    getPriorityLevel(inputUsername);
    appendRows();
})
