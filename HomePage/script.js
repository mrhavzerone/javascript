// script.js

document.addEventListener('DOMContentLoaded', () => {
    const themeCheckbox = document.getElementById('theme-checkbox');
    const addLinkButton = document.getElementById('add-link-button');
    const addLinkForm = document.getElementById('add-link-form');
    const linksSection = document.getElementById('links-section');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const searchInput = document.getElementById('search-input');

    // Функція для завантаження збережених посилань
    function loadLinks() {
        const links = JSON.parse(localStorage.getItem('savedLinks')) || [];
        linksSection.innerHTML = '';
        links.forEach((link, index) => {
            const linkElement = document.createElement('a');
            linkElement.classList.add('link-item');
            linkElement.href = link.url;
            linkElement.target = "_blank";
            linkElement.innerHTML = `
                <span>${link.name}</span>
                <button data-index="${index}">&times;</button>
            `;
            linksSection.appendChild(linkElement);
        });
    }

    // Функція для збереження нового посилання
    function saveLink(name, url) {
        const links = JSON.parse(localStorage.getItem('savedLinks')) || [];
        links.push({ name, url });
        localStorage.setItem('savedLinks', JSON.stringify(links));
        loadLinks();
    }

    // Функція для видалення посилання
    function deleteLink(index) {
        const links = JSON.parse(localStorage.getItem('savedLinks')) || [];
        links.splice(index, 1);
        localStorage.setItem('savedLinks', JSON.stringify(links));
        loadLinks();
    }

    // Функція для зміни теми
    function toggleTheme() {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    }

    // Встановити початкову тему при завантаженні сторінки
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeCheckbox.checked = true;
    }

    // Функція для пошуку в Google
    function searchGoogle(query) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }

    // Функція для фільтрації посилань
    function filterLinks() {
        const query = searchInput.value.toLowerCase();
        const links = JSON.parse(localStorage.getItem('savedLinks')) || [];
        linksSection.innerHTML = '';
        links
            .filter(link => link.name.toLowerCase().includes(query) || link.url.toLowerCase().includes(query))
            .forEach((link, index) => {
                const linkElement = document.createElement('a');
                linkElement.classList.add('link-item');
                linkElement.href = link.url;
                linkElement.target = "_blank";
                linkElement.innerHTML = `
                    <span>${link.name}</span>
                    <button data-index="${index}">&times;</button>
                `;
                linksSection.appendChild(linkElement);
            });
    }

    // Додавання подій
    themeCheckbox.addEventListener('change', toggleTheme);

    addLinkButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    addLinkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('link-name').value;
        const url = document.getElementById('link-url').value;
        saveLink(name, url);
        addLinkForm.reset();
        modal.style.display = 'none';
    });

    linksSection.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.getAttribute('data-index');
            deleteLink(index);
        }
    });

    searchInput.addEventListener('input', filterLinks);

    loadLinks();
});
