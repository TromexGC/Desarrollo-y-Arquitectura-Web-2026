document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscriptionForm');
    const modal = document.getElementById('customModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeModalBtn = document.getElementById('closeModalBtn');

    const validations = {
        fullName: (val) => val.length > 6 && val.includes(' '),
        email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        password: (val) => val.length >= 8 && /[a-zA-Z]/.test(val) && /[0-9]/.test(val),
        confirmPassword: (val) => {
            const pass = document.getElementById('password').value;
            return val === pass && val.length > 0;
        },
        age: (val) => Number.isInteger(Number(val)) && Number(val) >= 18,
        phone: (val) => /^\d{7,}$/.test(val),
        address: (val) => val.length >= 5 && val.includes(' ') && /[a-zA-Z]/.test(val) && /[0-9]/.test(val),
        city: (val) => val.length >= 3,
        postalCode: (val) => val.length >= 3,
        dni: (val) => /^\d{7,8}$/.test(val)
    };

    const errorMessages = {
        fullName: "Debe tener más de 6 letras y al menos un espacio entre medio.",
        email: "Debe tener un formato de email válido.",
        password: "Al menos 8 caracteres, formados por letras y números.",
        confirmPassword: "Las contraseñas no coinciden.",
        age: "Número entero mayor o igual a 18.",
        phone: "Número de al menos 7 dígitos, sin espacios, guiones ni paréntesis.",
        address: "Al menos 5 caracteres, con letras, números y un espacio en el medio.",
        city: "Al menos 3 caracteres.",
        postalCode: "Al menos 3 caracteres.",
        dni: "Número de 7 u 8 dígitos."
    };

    function validateField(input) {
        const fieldName = input.name;
        const value = input.value.trim();
        const errorDiv = document.getElementById(`${fieldName}Error`);
        
        if (!validations[fieldName]) return true;

        const isValid = validations[fieldName](value);

        if (!isValid) {
            errorDiv.textContent = errorMessages[fieldName];
            errorDiv.style.display = 'block';
            input.classList.add('input-error');
            return false;
        } else {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
            input.classList.remove('input-error');
            return true;
        }
    }

    const inputs = form.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('focus', () => {
            const errorDiv = document.getElementById(`${input.name}Error`);
            if (errorDiv) {
                errorDiv.textContent = '';
                errorDiv.style.display = 'none';
            }
            input.classList.remove('input-error');
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let formIsValid = true;
        let successData = "Suscripción Exitosa. Datos cargados:\n\n";
        let errorsData = "Error: El formulario contiene errores que deben ser corregidos:\n\n";

        inputs.forEach(input => {
            const isFieldValid = validateField(input);
            
            if (isFieldValid) {
                successData += `${input.name}: ${input.value}\n`;
            } else {
                formIsValid = false;
                errorsData += `- ${input.name}: ${errorMessages[input.name]}\n`;
            }
        });

        if (formIsValid) {
            modalMessage.innerText = successData;
            modal.style.display = 'flex';
            modalTitle.innerText = "¡Éxito!"; 
        } else {
            modalMessage.innerText = errorsData;
            modal.style.display = 'flex';
            modalTitle.innerText = "Error en el formulario";
        }
    });


    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    //AutoUpdate titulo
    const formTitle = document.getElementById('formTitle');
    const fullNameInput = document.getElementById('fullName');

    function updateTitle() {
        const value = fullNameInput.value;
        
        if (value.trim() === '') {
            formTitle.textContent = "HOLA";
        } else {
            formTitle.textContent = `HOLA ${value.toUpperCase()}`;
        }
    }

    fullNameInput.addEventListener('keyup', updateTitle);

    fullNameInput.addEventListener('focus', updateTitle);
});