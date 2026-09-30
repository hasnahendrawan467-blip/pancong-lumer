// Mobile Navbar Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileBtn.addEventListener('click', () => {
	mobileMenu.classList.toggle('hidden');
	if (mobileMenu.classList.contains('hidden')) {
		menuIcon.classList.replace('fa-xmark', 'fa-bars');
	} else {
		menuIcon.classList.replace('fa-bars', 'fa-xmark');
	}
});

mobileLinks.forEach(link => {
	link.addEventListener('click', () => {
		mobileMenu.classList.add('hidden');
		menuIcon.classList.replace('fa-xmark', 'fa-bars');
	});
});

// Menu Filter Buttons Interaction
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		filterBtns.forEach(filterButton => {
			filterButton.classList.remove('active', 'bg-amber-500', 'text-white', 'shadow-xs');
			filterButton.classList.add('bg-gray-100', 'text-gray-600');
		});

		btn.classList.add('active', 'bg-amber-500', 'text-white', 'shadow-xs');
		btn.classList.remove('bg-gray-100', 'text-gray-600');

		const filter = btn.getAttribute('data-category');

		menuCards.forEach(card => {
			if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
				card.style.display = 'flex';
			} else {
				card.style.display = 'none';
			}
		});
	});
});

// FAQ Accordion Toggle
const faqBtns = document.querySelectorAll('.faq-btn');
faqBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		const content = btn.nextElementSibling;
		const icon = btn.querySelector('i');
		content.classList.toggle('hidden');
		icon.classList.toggle('rotate-180');
	});
});

// Interactive Order Modal Logic
let currentPrice = 0;
let qty = 1;

function openOrderModal(itemName, itemPrice) {
	document.getElementById('modal-item-title').innerText = 'Pesan ' + itemName;
	document.getElementById('modal-item-name').value = itemName;
	document.getElementById('modal-item-price').value = itemPrice;
	currentPrice = itemPrice;
	qty = 1;
	document.getElementById('order-qty').innerText = qty;
	document.getElementById('order-extra').selectedIndex = 0;
	document.getElementById('order-notes').value = '';
	document.getElementById('order-name').value = '';

	calculateTotal();
	document.getElementById('order-modal').classList.remove('hidden');
}

function closeOrderModal() {
	document.getElementById('order-modal').classList.add('hidden');
}

function adjustQty(amount) {
	if (qty + amount >= 1) {
		qty += amount;
		document.getElementById('order-qty').innerText = qty;
		calculateTotal();
	}
}

function calculateTotal() {
	const extraSelect = document.getElementById('order-extra');
	let extraPrice = 0;
	if (extraSelect.value.includes('(+3rb)')) {
		extraPrice = 3000;
	}

	const total = (currentPrice + extraPrice) * qty;
	document.getElementById('order-total-price').innerText = 'Rp ' + total.toLocaleString('id-ID');
}

function handleOrderSubmit(event) {
	event.preventDefault();

	const itemName = document.getElementById('modal-item-name').value;
	const cookLevel = document.getElementById('order-cook').value;
	const extraTopping = document.getElementById('order-extra').value;
	const customerName = document.getElementById('order-name').value;
	const notes = document.getElementById('order-notes').value;
	const totalPrice = document.getElementById('order-total-price').innerText;

	let message = `Halo Kue Pancong Lumer Sagara Cimahi, saya mau pesan:\n\n`;
	message += `👤 *Nama*: ${customerName}\n`;
	message += `📌 *Menu*: ${itemName}\n`;
	message += `🔢 *Jumlah*: ${qty} Porsi\n`;
	message += `🔥 *Kematangan*: ${cookLevel}\n`;
	message += `🧀 *Extra Topping*: ${extraTopping}\n`;
	if (notes.trim() !== '') {
		message += `📝 *Catatan/Alamat*: ${notes}\n`;
	}
	message += `\n💰 *Total Estimasi*: ${totalPrice}\n\nMohon diproses ya, terima kasih!`;

	const encodedMessage = encodeURIComponent(message);
	const waUrl = `https://wa.me/6289527207774?text=${encodedMessage}`;

	window.open(waUrl, '_blank');
	closeOrderModal();
}
