document.addEventListener('DOMContentLoaded', function() {
    // Load items from localStorage on page load
    var savedItems = localStorage.getItem('shoppingListItems');
    if (savedItems) {
        var listContainer = document.getElementById('listContainer');
        listContainer.innerHTML = savedItems;
        addEditFunctionality(); // Add edit functionality to loaded items
    }

    // Event listener for Add button
    document.getElementById('addItemBtn').addEventListener('click', function() {
        addItem();
    });

    // Event listener for Mark Purchased button
    document.getElementById('markPurchasedBtn').addEventListener('click', function() {
        markPurchased();
    });

    // Event listener for Clear List button
    document.getElementById('clearListBtn').addEventListener('click', function() {
        clearList();
    });
});

function addItem() {
    var itemInput = document.getElementById('itemInput');
    var itemName = itemInput.value.trim();

    if (itemName === '') {
        alert('Please enter an item.');
        return;
    }

    var listContainer = document.getElementById('listContainer');

    var listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.innerHTML = `
        <span>${itemName}</span>
        <button class="editBtn">Edit</button>
        <button class="markBtn">Mark</button>
        <button class="deleteBtn">Delete</button>
    `;

    listContainer.appendChild(listItem);

    // Save to localStorage
    saveToLocalStorage();

    itemInput.value = '';

    // Add event listeners for newly added buttons
    addEditFunctionality();
}

function editItem(button) {
    var span = button.parentNode.querySelector('span');
    var newText = prompt('Edit item:', span.textContent);
    if (newText !== null) {
        span.textContent = newText;

        // Save to localStorage
        saveToLocalStorage();
    }
}

function toggleMark(button) {
    var listItem = button.parentNode;
    listItem.classList.toggle('marked');

    // Save to localStorage
    saveToLocalStorage();
}

function deleteItem(button) {
    var listItem = button.parentNode;
    listItem.remove();

    // Save to localStorage
    saveToLocalStorage();
}

function markPurchased() {
    var listItems = document.querySelectorAll('.list-item');
    listItems.forEach(function(item) {
        item.classList.add('marked');
    });

    // Save to localStorage
    saveToLocalStorage();
}

function clearList() {
    var listContainer = document.getElementById('listContainer');
    listContainer.innerHTML = '';

    // Save to localStorage
    saveToLocalStorage();
}

function saveToLocalStorage() {
    var listContainer = document.getElementById('listContainer');
    localStorage.setItem('shoppingListItems', listContainer.innerHTML);
}

function addEditFunctionality() {
    var editButtons = document.querySelectorAll('.editBtn');
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            editItem(this);
        });
    });

    var markButtons = document.querySelectorAll('.markBtn');
    markButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            toggleMark(this);
        });
    });

    var deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            deleteItem(this);
        });
    });
}
