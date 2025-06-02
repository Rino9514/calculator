const body = document.querySelector("body");
const btn_container = document.querySelector(".btn");
const entry_screen = document.querySelector(".entry");
const equation_screen = document.querySelector(".equation");

let first_entry = '';
let operand = '';
let second_entry = '';
let should_reset = false;

const NB_MAX_DIGITS = 10;


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

body.addEventListener("keyup",(event)  => {
    let authorize_key = "0123456789./*-+EnterBackspaceDeleteu";
    if (authorize_key.includes(event.key)){
        const button = document.querySelector(`button[data-key="${event.key}"]`);
        button.click();
    }
});

function operate(a,operator,b){
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
        operand = '';
        second_entry = '';
        should_reset = false;
    }
    entry_screen.textContent = text;
}

function write_on_screen(number_operator){
    let text = "";
    // reset if there is a last operation
    if (should_reset) {
        entry_screen.textContent = '';
        equation_screen.textContent = '';
        should_reset = false;
        first_entry='';
        operand='';
        second_entry = '';
    }
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
    if(operator !== '='){
        // changing operator before enter a second element
        if(entry_screen.textContent !== ''){
            first_entry = Number(entry_screen.textContent);
        }
        operand = operator;
        if(entry_screen.textContent[0] === "-"){
            equation_screen.textContent = '(' + first_entry + ')' + ' '+ operand + ' ';
        } else {
            equation_screen.textContent = first_entry + ' '+ operand + ' ';
        }
        entry_screen.textContent = '';
        should_reset = false;
    } else {
        if(entry_screen.textContent !== '' && operand !== ''){
            // did the '=' btn has been press ? 
            if (!should_reset){
                second_entry = Number(entry_screen.textContent);
                should_reset = true;
            } else {
                // normal behavior of calculator when we press multiple time '='
                first_entry = Number(entry_screen.textContent);
            }
            // writing on screen
            if (String(first_entry)[0] === "-"){
                equation_screen.textContent =  '(' + first_entry + ')' + ' '+ operand + ' '+ second_entry;
            } else if (String(second_entry)[0] === "-"){
                equation_screen.textContent =  first_entry + ' '+ operand + ' '+ '(' + second_entry + ')';
            } else {
                equation_screen.textContent =  first_entry + ' '+ operand + ' '+ second_entry;
            }
            entry_screen.textContent = formatNumber(operate(first_entry, operand,second_entry));
        }
    }
}


function formatNumber(num) {
    let decimal = 0;
    let integer = 0;
    let num_string = String(num);
    // handle the max and min 
    if (num >= 9999999999){
        return "9999999999";
    } else if (num <= -9999999999){
        return "-9999999999";
    // handle decimals number
    } else if (num_string.includes('.')){
        integer  = num_string.split('.')[0];
        decimal = num_string.split('.')[1];
        // the num is OK
        if (num_string.length < NB_MAX_DIGITS + 1){
            return num_string;
        }
        // integer part is to high to have decimal part
        if (integer.length > NB_MAX_DIGITS - 2){
            return integer;
        }
        // cut of the decimal part
        if (num_string.length > NB_MAX_DIGITS){
            return integer + '.' + decimal.slice(0,NB_MAX_DIGITS - 1 - integer.length);
        }
    }
    else {
        return num_string;
    }
}