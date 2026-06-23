// Initial Product List as per requirements
var inventory = [
    {
        id: 1,
        name: "Dell Inspiron 15",
        inStock: true
    },
    {
        id: 2,
        name: "Dell XPS 13",
        inStock: true
    },
    {
        id: 3,
        name: "Dell Latitude 5440",
        inStock: false
    },
    {
        id: 4,
        name: "Dell Alienware M18",
        inStock: true
    }
];

// Variable to track the current product being edited
var editingId = null;

/**
 * Display Inventory
 * This function clears the current table body and repopulates it 
 * with the latest data from the inventory array.
 */
function displayInventory() {
    var tableBody = document.getElementById('inventory-body');
    tableBody.innerHTML = ''; // Clear existing table rows

    for (var i = 0; i < inventory.length; i++) {
        var product = inventory[i];
        
        // Create table row
        var tr = document.createElement('tr');
        
        // ID Column
        var tdId = document.createElement('td');
        tdId.textContent = product.id;
        tr.appendChild(tdId);
        
        // Name Column
        var tdName = document.createElement('td');
        tdName.textContent = product.name;
        tr.appendChild(tdName);
        
        // Status Column
        var tdStatus = document.createElement('td');
        var statusBadge = document.createElement('span');
        if (product.inStock) {
            statusBadge.textContent = 'In Stock';
            statusBadge.className = 'status-badge status-in';
        } else {
            statusBadge.textContent = 'Out of Stock';
            statusBadge.className = 'status-badge status-out';
        }
        tdStatus.appendChild(statusBadge);
        tr.appendChild(tdStatus);
        
        // Actions Column (Edit and Delete buttons)
        var tdActions = document.createElement('td');
        
        var editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'action-btn edit-btn';
        // Using bind to pass the current product id to the handler
        editBtn.onclick = updateProduct.bind(null, product.id);
        
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'action-btn delete-btn';
        deleteBtn.onclick = deleteProduct.bind(null, product.id);
        
        tdActions.appendChild(editBtn);
        tdActions.appendChild(deleteBtn);
        tr.appendChild(tdActions);
        
        tableBody.appendChild(tr);
    }
    
    // Update dashboard statistics whenever inventory changes
    updateStatistics();
}

/**
 * Search Product availability
 * Checks if a user-entered product name exists in the inventory array.
 */
function checkAvailability() {
    var searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    var searchResult = document.getElementById('search-result');
    
    if (searchInput === '') {
        searchResult.textContent = 'Please enter a product name.';
        searchResult.style.color = '#dc3545'; // danger color
        return;
    }
    
    var found = false;
    var inStock = false;
    
    // Search the array
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].name.toLowerCase() === searchInput) {
            found = true;
            inStock = inventory[i].inStock;
            break;
        }
    }
    
    // Display appropriate message based on search results
    if (found) {
        if (inStock) {
            searchResult.textContent = 'Product Available';
            searchResult.style.color = '#28a745'; // success color
        } else {
            searchResult.textContent = 'Product Out of Stock';
            searchResult.style.color = '#dc3545'; // danger color
        }
    } else {
        searchResult.textContent = 'Product not found.';
        searchResult.style.color = '#dc3545'; // danger color
    }
}

/**
 * Handles saving a product (both adding new and updating existing).
 * Validates inputs before proceeding.
 */
function saveProduct() {
    var nameInput = document.getElementById('product-name').value.trim();
    var statusInput = document.getElementById('product-status').value;
    var messageEl = document.getElementById('form-message');
    
    // 1. Validation: Empty Input
    if (nameInput === '') {
        messageEl.textContent = 'Product name cannot be empty.';
        messageEl.style.color = '#dc3545';
        return;
    }
    
    // 2. Validation: Duplicate Product
    for (var i = 0; i < inventory.length; i++) {
        // If the name matches and we are not currently editing this exact product id
        if (inventory[i].name.toLowerCase() === nameInput.toLowerCase() && inventory[i].id !== editingId) {
            messageEl.textContent = 'Product already exists. Duplicate warning!';
            messageEl.style.color = '#ffc107'; // Warning color
            return;
        }
    }
    
    var isInStock = (statusInput === 'true');
    
    if (editingId === null) {
        // Add new product mode
        addProduct(nameInput, isInStock);
        messageEl.textContent = 'Product added successfully.';
        messageEl.style.color = '#28a745';
    } else {
        // Update existing product mode
        for (var j = 0; j < inventory.length; j++) {
            if (inventory[j].id === editingId) {
                inventory[j].name = nameInput;
                inventory[j].inStock = isInStock;
                break;
            }
        }
        messageEl.textContent = 'Product updated successfully.';
        messageEl.style.color = '#28a745';
    }
    
    displayInventory(); // Refresh UI
    clearInputs(); // Reset form
}

/**
 * Add Product
 * Automatically generates a new ID and pushes the object into the array.
 */
function addProduct(name, inStock) {
    // Generate new ID by finding max id and adding 1
    var maxId = 0;
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].id > maxId) {
            maxId = inventory[i].id;
        }
    }
    
    var newProduct = {
        id: maxId + 1,
        name: name,
        inStock: inStock
    };
    
    inventory.push(newProduct);
}

/**
 * Update Product
 * Loads the selected product data into the form for editing.
 */
function updateProduct(id) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].id === id) {
            // Populate form fields
            document.getElementById('product-id').value = inventory[i].id;
            document.getElementById('product-name').value = inventory[i].name;
            document.getElementById('product-status').value = inventory[i].inStock.toString();
            
            // Update UI to show edit mode
            document.getElementById('form-title').textContent = 'Update Product';
            document.getElementById('save-btn').textContent = 'Update Product';
            
            // Set tracking variable
            editingId = id;
            document.getElementById('form-message').textContent = '';
            break;
        }
    }
}

/**
 * Delete Product
 * Removes the selected product from the array.
 */
function deleteProduct(id) {
    if (confirm('Are you sure you want to remove this product?')) {
        var indexToRemove = -1;
        
        // Find index of the product to delete
        for (var i = 0; i < inventory.length; i++) {
            if (inventory[i].id === id) {
                indexToRemove = i;
                break;
            }
        }
        
        // Remove item from array and update UI
        if (indexToRemove !== -1) {
            inventory.splice(indexToRemove, 1);
            displayInventory();
            document.getElementById('form-message').textContent = 'Product removed successfully.';
            document.getElementById('form-message').style.color = '#28a745';
        }
    }
}

/**
 * Update Statistics
 * Calculates total, in-stock, and out-of-stock counts and updates the dashboard.
 */
function updateStatistics() {
    var total = inventory.length;
    var inStockCount = 0;
    var outOfStockCount = 0;
    
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].inStock) {
            inStockCount++;
        } else {
            outOfStockCount++;
        }
    }
    
    // Update DOM elements
    document.getElementById('total-products').textContent = total;
    document.getElementById('in-stock').textContent = inStockCount;
    document.getElementById('out-of-stock').textContent = outOfStockCount;
}

/**
 * Clear Inputs
 * Resets the form fields and restores the "Add New Product" state.
 */
function clearInputs() {
    document.getElementById('product-id').value = '';
    document.getElementById('product-name').value = '';
    document.getElementById('product-status').value = 'true';
    
    document.getElementById('form-title').textContent = 'Add New Product';
    document.getElementById('save-btn').textContent = 'Save Product';
    
    editingId = null; // Reset editing state
}

// Initialize Application when the DOM is fully loaded
window.onload = function() {
    displayInventory();
};
