import menuArray from './data.js';

const container = document.querySelector('.menu-container');
const receipt = document.getElementById('receipt');
const receiptContainer = document.querySelector('.receipt-container .hidden');

const totalPriceEl = document.getElementById('total-price');

let total = 0;

// Render menu
const getMenuItems = () => {
    return menuArray.map(item => `
        <section class="menu-items">
            <p class="menu-emoji">${item.emoji}</p>
            <div class="menu-details">
                <h3 class="menu-name">${item.name}</h3>
                <p class="menu-ingredients">${item.ingredients}</p>
                <h4 class="menu-price">Price: $${item.price}</h4>
            </div>
            <div class="menu-btn">
                <button data-id="${item.id}" class="add-btn">+</button>
            </div>
        </section>
    `).join('');
};

// Add to receipt using event delegation
const setupEventListeners = () => {
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-btn')) {
            const id = e.target.dataset.id;
            const item = menuArray.find(item => item.id == id);

            // Update total and display
            total += item.price;
            totalPriceEl.textContent = `$${total}`;

            // Show receipt section
            receiptContainer.classList.remove('hidden');

            // Add item to receipt
            const newReceiptItem = document.createElement('div');
            newReceiptItem.className = 'receipt-item';
            newReceiptItem.dataset.price = item.price;
            newReceiptItem.innerHTML = `
                <div class="receipt-main">
                    <h3 class="receipt-item-name">${item.name}</h3>
                    <button class="remove-btn">remove</button>
                </div>
                <h3 class="receipt-item-price">$${item.price}</h3>
            `;
            receipt.appendChild(newReceiptItem);;
        }
    });

    // Handle remove buttons via event delegation
    receipt.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const receiptEl = e.target.closest('.receipt-item');
            const price = parseFloat(receiptEl.dataset.price);

            // Update total
            total -= price;
            totalPriceEl.textContent = `$${total}`;

            // Remove item from receipt
            receiptEl.remove();

            // Hide if no more items
            if (receipt.children.length === 0) {
                receiptContainer.classList.add('hidden');
            }
        }
    });
};
function completeOrder(){
    const modal = document.querySelector('.modal');
    modal.classList.remove('hidden');
}
// Run
const render = () => {
    container.innerHTML = getMenuItems();
    setupEventListeners();
    document.getElementById('complete-order-btn').addEventListener('click', completeOrder);
    document.querySelector('.modal').addEventListener('click', (e) => {
        const modalContent = document.querySelector('.modal-content');
        if (!modalContent.contains(e.target)) {
            const modal = document.querySelector('.modal');
            modal.classList.add('hidden'); // Hide the modal
        }
    });
};
render();
