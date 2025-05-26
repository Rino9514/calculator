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

// console.log(operate(1,'+',2));
// console.log(operate(1,'-',2));
// console.log(operate(1,'*',2));
// console.log(operate(1,'/',2));
// console.log(operate(0,'/',1));