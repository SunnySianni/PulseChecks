// app.js

// Array of images to be displayed in the gallery
const images = [
    { id: 1, src: "https://p16-va.lemon8cdn.com/tos-maliva-v-ac5634-us/oAEYG2BzPBMQCiN773ABSoA6EYgfBQhAYIADii~tplv-tej9nj120t-origin.webp", alt: "Picture 1", text: "Pick Me!", hidden: false, likes: 0 },
    { id: 2, src: "https://i.pinimg.com/474x/20/2c/c2/202cc2bf18edb7c33dbd90593abb203e.jpg", alt: "Picture 2", text: "Choose Me!", hidden: false, likes: 0 },
    { id: 3, src: "https://i.pinimg.com/736x/28/2f/13/282f139295b7659c01e985e455f12c6b.jpg", alt: "Project 3 Image", text: "Love me!", hidden: false, likes: 0 },
];

// Function to render images in the gallery
function renderImages() {
    const gallery = document.getElementById('image-gallery');
    gallery.innerHTML = '';
    images.forEach(img => {
        if (!img.hidden) {
            const container = createImageContainer(img);
            gallery.appendChild(container);
        }
    });
}

// Function to create an image container
function createImageContainer(img) {
    const container = document.createElement('div');
    container.className = 'image-container';
    container.innerHTML = `
        <img src="${img.src}" alt="${img.alt}">
        <div class="image-overlay">
            <span>${img.text}</span>
            <div class="image-actions">
                <button class="action-button" onclick="handleLike(${img.id})">❤️</button>
                <button class="action-button" onclick="handleDislike(${img.id})">👎</button>
                <button class="action-button" onclick="handleHide(${img.id})">👁️</button>
                <button class="action-button" onclick="handleShare(${img.id})">📤</button>
            </div>
        </div>
        <span class="likes-counter">${img.likes} likes</span>
    `;
    container.addEventListener('click', () => enlargeImage(container));
    return container;
}

// Function to enlarge the clicked image
function enlargeImage(container) {
    const overlay = document.getElementById('overlay');
    const enlargedContainer = container.cloneNode(true);
    enlargedContainer.classList.add('enlarged');
    
    overlay.innerHTML = '';
    overlay.appendChild(enlargedContainer);
    overlay.classList.add('active');

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
}

// Function to handle the like button
function handleLike(id) {
    updateLikes(id, 1);
}

// Function to handle the dislike button
function handleDislike(id) {
    updateLikes(id, -1);
}

// Function to update likes count
function updateLikes(id, change) {
    const img = images.find(img => img.id === id);
    if (img) {
        img.likes = Math.max(0, img.likes + change);
        renderImages();
    }
}

// Function to hide the image
function handleHide(id) {
    const img = images.find(img => img.id === id);
    if (img) {
        img.hidden = true;
        renderImages();
    }
}

// Function to handle sharing the image
function handleShare(id) {
    const img = images.find(img => img.id === id);
    if (img) {
        alert(`Sharing ${img.alt}: ${img.src}`);
    }
}

// Event listener for feedback form submission
document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const feedbackType = document.getElementById('feedback-type').value;
    const comment = document.getElementById('comment').value;
    alert(`Feedback submitted - Type: ${feedbackType}, Comment: ${comment}`);
    document.getElementById('comment').value = '';
    document.getElementById('feedback-type').value = 'General Comment';
});

// Event listener for feature request form submission
document.getElementById('feature-request-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const featureTitle = document.getElementById('feature-title').value;
    const featureDescription = document.getElementById('feature-description').value;
    alert(`Feature Request submitted - Title: ${featureTitle}, Description: ${featureDescription}`);
    document.getElementById('feature-title').value = '';
    document.getElementById('feature-description').value = '';
});

// Initial call to render the images on page load
renderImages();