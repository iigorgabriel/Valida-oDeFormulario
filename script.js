document.getElementById('validationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const result = document.getElementById('result');

    let valid = true;
    let message = '';

    if (!validateName(name)) {
        valid = false;
        message += 'Nome inválido. ';
    }

    if (!validateEmail(email)) {
        valid = false;
        message += 'Email inválido. ';
    }

    if (!validateCPF(cpf)) {
        valid = false;
        message += 'CPF inválido. ';
    }

    if (valid) {
        result.textContent = 'Formulário Válido';
        result.style.color = 'green';
    } else {
        result.textContent = message;
        result.style.color = 'red';
    }
});

document.getElementById('cpf').addEventListener('input', function(e) {
    let value = e.target.value;
    e.target.value = formatCPF(value);
});

function formatCPF(value) {
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o hífen
    return value;
}

function validateName(name) {
    // Verifica se o nome tem pelo menos 3 caracteres e apenas letras e espaços
    return /^[A-Za-z\s]{3,}$/.test(name);
}

function validateEmail(email) {
    // Verifica se o email é válido usando regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}
