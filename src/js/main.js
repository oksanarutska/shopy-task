


document.addEventListener('click', (e) => {
	let NumberCount = document.querySelector('.product-card-item2__information_number');
	let counter = document.querySelector('.product-card-item2__information_number').innerHTML;

	if (e.target.matches('#plus')) {
		counter++;
		if (NumberCount) {
			NumberCount.innerHTML = `${counter}`;
		}
	}

	if (e.target.matches('#minus')) {
		if (NumberCount) {
			NumberCount.innerHTML = `${counter}`;
		}
	}
})

