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
		counter--;
		if (NumberCount) {
			NumberCount.innerHTML = `${counter}`;
		}
	}
})

class Slider {
	constructor({ root, images}) {
		this.root = root;
		this.images = images;
		this.render();
		document.querySelector('.thumb').addEventListener('click', (e) => {
			this.setListeners();
		})
	}
	render() {
		this.root.innerHTML =
			`
			<img class="big" src="${this.images[2].big}">
		${
			this.images.map((image, index) => {
				return `<img class="thumb" data-index-number="${index}" src="${image.thumb}">`
			})
			}`
	

	}

	setListeners() {
		
			if (e.target.matches('.thumb')) {

				var idSrc = e.target.dataset.indexNumber;
				console.log(e.target);
			//	console.log(idSrc);
				render();

			};
	
	}
}
const slider = new Slider({
	root:
		document.querySelector('.product-card-item1'),
	images: [
		{
			thumb: '../images/slider-3.svg',
			big: '../images/slider2.jpg'
		},
		{
			thumb: '../images/slider3.jpg',
			big: '../images/slider-2.svg'
		},
		{
			thumb: '../images/slider-1.jpg',
			big: '../images/slide-1.svg'
		},
	]

});


