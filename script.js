const btn_container = document.querySelector(".btn");

btn_container.addEventListener("click", (event) => {
    let targeted_btn = event.target;
    if (targeted_btn.classList.contains('number')){
        write_on_screen(targeted_btn.textContent);
    }
})

function add(a,b){
    return a+b;
}

function substract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(a,operator,b){
    if (operator==="+"){
        return add(a,b);
    }
    else if(operator==="-"){
        return substract(a,b);
    }
    else if(operator==="*"){
        return multiply(a,b);
    }
    else if(operator==="/"){
        return divide(a,b);
    }
}

function write_on_screen(number){
    console.log(number);
}


