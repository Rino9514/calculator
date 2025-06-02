const btn_container = document.querySelector(".btn");
const entry_screen = document.querySelector(".entry");
const equation_screen = document.querySelector(".equation");

let first_entry = '';

btn_container.addEventListener("click", (event) => {
    let targeted_btn = event.target;
    // sécurisation pour éviter que le target point vers tout les
    // éléments si on clique dessus puis on relache ailleurs
    if (targeted_btn.tagName.toLowerCase() === "button"){
        if (targeted_btn.classList.contains("number")){
            write_on_screen(targeted_btn.textContent);
        } 
        else if (targeted_btn.classList.contains("function")){
            clear_del_opposite(targeted_btn.textContent)
        } 
        else if(targeted_btn.classList.contains("operator") ){
            write_second_screen(targeted_btn.textContent);
        }
    }

})

function operate(string){
    let operator = '';
    let a,b = 0;
    a = Number(string.split(' ')[0]);
    b = Number(string.split(' ')[2]);
    operator = string.split(' ')[1];

    if (operator==="+"){
        return a+b;
    }
    else if(operator==="-"){
        return a-b;
    }
    else if(operator==="*"){
        return a*b;
    }
    else if(operator==="/"){
        return a/b;
    }
}

function clear_del_opposite(symbol){
    let text = "0";
    if (symbol !== "C") {
        text = entry_screen.textContent;
        if (symbol === "del"){
            if (entry_screen.textContent.length>0){
                text = entry_screen.textContent.slice(0,-1);
                // handle the case when - is the last and when there is nothing more
                if (text ==='' || text ==='-'){
                    text = '0'
                }
            } 
        }
        else if (symbol === "±"){
            if (text.at(0)=== '-'){
                text = text.slice(1);
            } else{
                //protection on the 0
                if (Number(entry_screen.textContent) !== 0){
                    text = '-' + text;
                }
            }
        }
    } else {
        equation_screen.textContent = '';
        first_entry = '';
    }
    entry_screen.textContent = text;
}

function write_on_screen(number_operator){
    let text = "";
    // careful of the length to not overflow the div and adding to many .
    if (entry_screen.textContent.length + number_operator.length<11){
        if (number_operator === '.' && entry_screen.textContent.includes('.')){
            text = entry_screen.textContent;
        } else{
            text = entry_screen.textContent + number_operator;
        }
    } else{
        text = entry_screen.textContent;
    }
    // removing the 0 if exist in front of all number
    // to do that we need to take care of the case 0. or 5. for example
    // and no removing anything in this case
    if(text.includes('.')){
        if(text.split('.')[1] === "") {
            entry_screen.textContent = text;
        } else {
            entry_screen.textContent = String(Number(text));

        }
    } else {
        entry_screen.textContent = String(Number(text))
    }
}


function write_second_screen(operator){
    let result,text = '';

    if(operator !== '='){
        // previous number and previous operator
        text = entry_screen.textContent + ' '+ operator + ' ';
        first_entry = text;
        equation_screen.textContent = text;
        entry_screen.textContent = '0';
    } else {
        result = operate(first_entry + entry_screen.textContent);
        // previous number and operator and equal
        text =  first_entry + ' '+ entry_screen.textContent + ' ' + operator;
        equation_screen.textContent = text;
        entry_screen.textContent = result;
    }
}
