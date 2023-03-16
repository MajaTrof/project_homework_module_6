import {galleryItems} from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const refs = {
	imageContainer: document.querySelector(".gallery"),
	cardsMarkup: createImageCardsMarkup(galleryItems),
};

refs.imageContainer.insertAdjacentHTML("beforeend", refs.cardsMarkup);
refs.imageContainer.addEventListener("click", onGaleryContainerClick);

function createImageCardsMarkup(galleryItems) {
	return galleryItems
		.map(({preview, original, description}) => {
			return `
        <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
`;
		})
		.join("");
}

function onGaleryContainerClick(evt) {
    var onKeyDownListener = null;
	const currentImage = evt.target.dataset.source;
	console.log(currentImage);
    const instance = basicLightbox.create(
        `<img src="${currentImage}" width="800" height="600">`,
        {
            onShow: (instance) => {
                document.addEventListener("keydown", onKeyDownListener);
            },
            onClose: (instance) => {
                document.removeEventListener("keydown", onKeyDownListener);
            }
        }
    );
    
    	onKeyDownListener = (e) => {
				console.log(e.keyCode);
				if (e.isComposing || e.keyCode === 27) {
					instance.close();
				}
        };
    
    instance.show();

	evt.preventDefault();
}
