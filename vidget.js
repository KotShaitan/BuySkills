/* Виджет аватарки */
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.style.display = (dropdown.style.display === 'flex') ? 'none' : 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('dropdown-menu');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
});

document.addEventListener('click', (event) => {
    const dropdown = document.getElementById('dropdown-menu');
    const avatar = document.getElementById('profile-avatar');
    if (dropdown.style.display === 'flex' && !avatar.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

/* Виджет удаления */
document.addEventListener('DOMContentLoaded', () => {
    const confirmWidget = document.getElementById('confirm-widget');
    const confirmYesButton = document.getElementById('confirm-yes');
    const confirmNoButton = document.getElementById('confirm-no');
    const ikonElement = document.querySelector('.midikonprofile');

    ikonElement.addEventListener('click', () => {
        confirmWidget.style.display = 'flex';
    });

    confirmYesButton.addEventListener('click', async () => {
        try {
            const response = await fetch('/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'delete', itemId: '123' }) // Параметры запроса
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Элемент удалён! Ответ сервера: ${result.message}`);
            } else {
                alert(`Ошибка: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Произошла ошибка при отправке POST-запроса:', error);
            alert('Произошла ошибка при удалении элемента.');
        } finally {
            confirmWidget.style.display = 'none';
        }
    });

    confirmNoButton.addEventListener('click', () => {
        confirmWidget.style.display = 'none';
    });

    confirmWidget.addEventListener('click', (event) => {
        if (event.target === confirmWidget) {
            confirmWidget.style.display = 'none';
        }
    });
});

/* Изменить */
document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.querySelector('.regprofile');
    const obomneBlock = document.querySelector('.obomne');
    let isEditing = false;

    const savedText = localStorage.getItem('savedText');
    if (savedText) {
        obomneBlock.textContent = savedText
    }

    editButton.addEventListener('click', () => {
        if (!isEditing) {
            isEditing = true;

            const currentText = obomneBlock.textContent.trim();
            
            obomneBlock.innerHTML = `
                <textarea style="
                    width: 100%; 
                    height: 100%; 
                    resize: none; 
                    font-family: Arial, sans-serif; 
                    color: white; 
                    background: rgb(42, 40, 40); 
                    border: none; 
                    padding: 10px; 
                    box-sizing: border-box; 
                    overflow-y: auto;">
                    ${currentText}
                </textarea>
            `;

            const textarea = obomneBlock.querySelector('textarea');

            textarea.focus();

            
            textarea.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();

                    const newText = textarea.value.trim();
                    obomneBlock.textContent = newText;
                    localStorage.setItem('savedText', newText); 

                    isEditing = false;
                }
            });
        }
    });
});
