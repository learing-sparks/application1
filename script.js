document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('userList');
    let users = JSON.parse(localStorage.getItem('users')) || [];

    function saveUsers() {
        localStorage.setItem('users', JSON.stringify(users));
    }

    function renderUsers() {
        userList.innerHTML = '';
        users.forEach((user, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${user.name} - ${user.email} - ${user.phone}
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            `;
            userList.appendChild(li);
        });
    }

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userId = document.getElementById('user-id').value;
        const name = document.getElementById('fname').value;
        const email = document.getElementById('Mail').value;
        const phone = document.getElementById('phone').value;

        if (userId) {
            users[userId] = { name, email, phone };
        } else {
            users.push({ name, email, phone });
        }

        userForm.reset();
        saveUsers();
        renderUsers();
    });

    window.editUser = (index) => {
        const user = users[index];
        document.getElementById('user-id').value = index;
        document.getElementById('fname').value = user.name;
        document.getElementById('Mail').value = user.email;
        document.getElementById('phone').value = user.phone;
    };

    window.deleteUser = (index) => {
        users.splice(index, 1);
        saveUsers();
        renderUsers();
    };

    renderUsers();
});