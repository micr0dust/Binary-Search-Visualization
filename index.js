const array = [1, 3, 3, 3, 7, 9, 9, 15, 19, 21, 21, 21, 23, 27, 30];
const arrayContainer = document.getElementById("array");
const codeBlock = document.getElementById("codeBlock");
let left, right, mid, target, searchActive;

function renderArray(end=-1) {
    arrayContainer.innerHTML = "";
    array.forEach((num, idx) => {
        const div = document.createElement("div");
        div.className = "array-item d-flex justify-content-center align-items-center border m-1";
        if (end == -1 && idx === mid) div.classList.add("mid");
        if (idx === left) div.classList.add("left");
        if (idx === right) div.classList.add("right");
        if (idx === end) div.classList.add("found");
        div.textContent = num;
        arrayContainer.appendChild(div);
    });
}

function code(text, type) {
    if (type === "var") return `<span class="highlight-var">${text}</span>`;
    if (type === "config") return `<span class="highlight-config">${text}</span>`;
    return `<span class="highlight-syntax">${text}</span>`;
}

function updateCode() {
    const leftUpdate = document.getElementById("leftUpdate").value;
    const rightUpdate = document.getElementById("rightUpdate").value;
    const rightUpdateCond = document.getElementById("rightUpdateCond").value;
    const loopCondition = document.getElementById("loopCondition").value;
    const returnValue = document.getElementById("returnValue").value;
    const syntax = `<span class="highlight-syntax">`;

    codeBlock.innerHTML = `
${code(`int`, 'var')} binary_search(${code(`vector`, 'var')}<${code(`int`, 'var')}> &array, ${code(`int`, 'var')} target) {
    ${code(`int`, 'var')} left = 0;
    ${code(`int`, 'var')} right = array.size() - 1;
    ${code(`while`)} (${code(`${loopCondition}`, 'config')}) {
    ${code(`int`, 'var')} mid = (left + right) / 2;
        ${code(`if`)} (${code(`${rightUpdateCond}`, 'config')}) {
            ${code(`${rightUpdate}`, 'config')};
        } ${code(`else`)} {
            ${code(`${leftUpdate}`, 'config')};
        }
    }
    ${code(`return`)} ${code(`${returnValue}`, 'config')};
}`;
}

function startSearch() {
    target = parseInt(document.getElementById("searchValue").value);
    if (!isNaN(target)) {
        left = 0;
        right = array.length - 1;
        searchActive = true;
        document.getElementById("nextBtn").disabled = false;
        nextStep();
    }
}

function nextStep() {
    const returnValue = document.getElementById("returnValue").value;
    if (!searchActive) return renderArray(eval(returnValue));

    const loopCondition = document.getElementById("loopCondition").value + ";";
    const cond = eval(loopCondition); // 迴圈條件

    if (!cond) {
        searchActive = false;
        return renderArray(eval(returnValue));// 回傳結果
    }
    mid = Math.floor((left + right) / 2);

    renderArray();
    updateCode();
    
    const rightUpdateCond = document.getElementById("rightUpdateCond").value;
    const leftUpdate = document.getElementById("leftUpdate").value;
    const rightUpdate = document.getElementById("rightUpdate").value;

    if (eval(rightUpdateCond)) {
        eval(rightUpdate); // 更新右邊界
    } else {
        eval(leftUpdate); // 更新左邊界
    }
}

renderArray();
updateCode();