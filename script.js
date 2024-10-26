const accessKey = "f7b_Um3vUo5J3izor_lGub2jbYdeIlZM8vWLo-lRSvU";
const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".search-input");
const imagesContainer = document.querySelector(".images-container");
const loadMoreBtn = document.querySelector(".loadMoreBtn");

let page = 1;

// Function to fetch images using Unsplash API
const fetchImages = async (query, pageNo) => {

    try {

        if (pageNo == 1) {
            imagesContainer.innerHTML = '';
        }
        const URL = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
        const response = await fetch(URL);
        const data = await response.json();

        if (data.results.length > 0) {

            data.results.forEach(photo => {
                //Creating image div
                const imageElement = document.createElement('div');
                imageElement.classList.add('imageDiv');
                imageElement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}" />`;

                // Creating Overlay Element
                const overlayElement = document.createElement('div');
                overlayElement.classList.add('overlay');

                // Creating Overlay Text
                const overlayText = document.createElement('h3');
                overlayText.innerText = `${photo.alt_description}`;
                overlayElement.appendChild(overlayText);

                imageElement.appendChild(overlayElement);
                imagesContainer.appendChild(imageElement);
            });
            if (data.total_pages === pageNo) {
                loadMoreBtn.style.display = "none";
            }
            else {
                loadMoreBtn.style.display = "block";
            }
        }
        else {
            imagesContainer.innerHTML = `<h2>No Image Found... </h2>`;

        }
    }
    catch (error) {
        imagesContainer.innerHTML = `<h2>Failed to fetch images. Please Try again Later...</h2>`;
    }

}


// Adding Event listener to search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== "") {
        page = 1;

        fetchImages(inputText, page);
    } else {
        imagesContainer.innerHTML = `<h2>Please Enter a Search Query...</h2>`;
    }
});


//Adding Event Listener to Load more button to fetch more images

loadMoreBtn.addEventListener('click', () => {
    fetchImages(searchInput.value.trim(), ++page);
})