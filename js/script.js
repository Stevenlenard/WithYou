// Global variables
let isMusicPlaying = false;
const bgMusic = new Audio('music/kumpas.mp3');
bgMusic.loop = true;

// Global functions
function enterStory() {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    if (!isMusicPlaying) {
        toggleMusic();
    }
}

function toggleMusic() {
    const musicIcon = document.getElementById('musicIcon');
    const visualizer = document.querySelector('.music-visualizer');
    
    if (isMusicPlaying) {
        bgMusic.pause();
        musicIcon.textContent = '';
        isMusicPlaying = false;
        if (visualizer) {
            document.querySelectorAll('.bar').forEach(bar => {
                bar.style.animationPlayState = 'paused';
            });
        }
    } else {
        bgMusic.play().then(() => {
            musicIcon.textContent = '';
            isMusicPlaying = true;
            if (visualizer) {
                document.querySelectorAll('.bar').forEach(bar => {
                    bar.style.animationPlayState = 'running';
                });
            }
        }).catch(error => {
            console.log("Playback failed:", error);
        });
    }
}

function showSurprise() {
    const surpriseMessages = [
        {
            title: "My Princess ",
            message: "You're the most beautiful girl in my world. Your smile lights up my darkest days.",
            signature: "Your Prince Charming"
        },
        {
            title: "My Forever ",
            message: "Every day with you feels like a dream. I'm so blessed to have you in my life.",
            signature: "Your Always"
        },
        {
            title: "My Heart ",
            message: "You're my first thought in the morning and my last thought at night. I love you more each day.",
            signature: "Your Love"
        },
        {
            title: "My Baby ",
            message: "Thank you for making my life complete. You're my perfect match in every way.",
            signature: "Your Soulmate"
        },
        {
            title: "My Everything ",
            message: "You're my best friend, my love, my future. I can't imagine life without you.",
            signature: "Yours Forever"
        },
        {
            title: "My Queen ",
            message: "You deserve all the love and happiness in the world. I'll make sure you get it.",
            signature: "Your King"
        },
        {
            title: "My Sunshine ",
            message: "You brighten up my world just by being in it. Your love is my greatest blessing.",
            signature: "Your Moon and Stars"
        },
        {
            title: "My Angel ",
            message: "God sent me an angel when He sent me you. You're my miracle.",
            signature: "Your Guardian"
        }
    ];

    const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
    
    const modal = document.createElement('div');
    modal.className = 'surprise-modal animate__animated animate__zoomIn';
    modal.innerHTML = `
        <div class="surprise-content">
            <h3>${randomMessage.title}</h3>
            <p>${randomMessage.message}</p>
            <p class="signature">${randomMessage.signature}</p>
            <button onclick="this.parentElement.parentElement.remove()" class="close-btn">Close </button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Background Music
    let bgMusic = new Audio('music/kumpas.mp3');
    bgMusic.loop = true;
    let isMusicPlaying = false;

    // Create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 7 + 's';
        document.querySelector('.floating-hearts').appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }

    // Generate hearts periodically
    setInterval(createHeart, 300);

    // Gallery Folders
    const folderItems = document.querySelectorAll('.folder-item');
    const photosContainers = document.querySelectorAll('.photos-container');
    const closeButtons = document.querySelectorAll('.photos-close');

    // Open photo container when clicking on a folder
    folderItems.forEach(folder => {
        folder.addEventListener('click', () => {
            const folderId = folder.dataset.folder;
            const photosContainer = document.getElementById(folderId);
            if (photosContainer) {
                photosContainer.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Add entrance animation
                setTimeout(() => {
                    photosContainer.style.opacity = '1';
                }, 10);
            }
        });
    });

    // Close photo container when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const container = button.closest('.photos-container');
            container.style.opacity = '0';
            setTimeout(() => {
                container.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        });
    });

    // Close photo container when clicking outside
    photosContainers.forEach(container => {
        container.addEventListener('click', (e) => {
            if (e.target === container) {
                container.style.opacity = '0';
                setTimeout(() => {
                    container.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            }
        });
    });

    // Close photo container with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            photosContainers.forEach(container => {
                if (container.style.display === 'block') {
                    container.style.opacity = '0';
                    setTimeout(() => {
                        container.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
            });
        }
    });

    // Smooth scroll for photo grid
    const photosGrids = document.querySelectorAll('.photos-grid');
    photosGrids.forEach(grid => {
        let isDown = false;
        let startX;
        let scrollLeft;

        grid.addEventListener('mousedown', (e) => {
            isDown = true;
            grid.style.cursor = 'grabbing';
            startX = e.pageX - grid.offsetLeft;
            scrollLeft = grid.scrollLeft;
        });

        grid.addEventListener('mouseleave', () => {
            isDown = false;
            grid.style.cursor = 'grab';
        });

        grid.addEventListener('mouseup', () => {
            isDown = false;
            grid.style.cursor = 'grab';
        });

        grid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - grid.offsetLeft;
            const walk = (x - startX) * 2;
            grid.scrollLeft = scrollLeft - walk;
        });
    });

    // Music Player
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.querySelector('.progress');
    const currentTimeSpan = document.getElementById('currentTime');
    const durationSpan = document.getElementById('duration');

    // Playlist functionality
    let currentSongIndex = 0;
    const playlist = [
        { title: "Perfect", artist: "Ed Sheeran", file: "music/perfect.mp3" },
        { title: "All of Me", artist: "John Legend", file: "music/allofme.mp3" },
        { title: "Just the Way You Are", artist: "Bruno Mars", file: "music/justtheway.mp3" }
    ];

    function loadSong(index) {
        const song = playlist[index];
        audioPlayer.src = song.file;
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        audioPlayer.load();
    }

    function togglePlay() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
        } else {
            audioPlayer.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        }
    }

    playPauseBtn.addEventListener('click', togglePlay);

    prevBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        if (!audioPlayer.paused) {
            audioPlayer.play();
        }
    });

    nextBtn.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        if (!audioPlayer.paused) {
            audioPlayer.play();
        }
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = progress + '%';
        
        const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
        const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
        currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    });

    audioPlayer.addEventListener('loadedmetadata', () => {
        const durationMinutes = Math.floor(audioPlayer.duration / 60);
        const durationSeconds = Math.floor(audioPlayer.duration % 60);
        durationSpan.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
    });

    loadSong(currentSongIndex);

    // Try to play music immediately (for browsers that allow it)
    bgMusic.play().catch(function(error) {
        console.log("Auto-play was prevented. User needs to interact with the page first.");
    });

    new Swiper('.core-memories-swiper', {
        effect: 'cards',
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        }
    });

    // Initialize Masonry for gallery
    const gallery = document.querySelector('.gallery-grid');
    const masonry = new Masonry(gallery, {
        itemSelector: '.gallery-item',
        columnWidth: '.gallery-item',
        percentPosition: true
    });

    // Load gallery images
    const images = [
        { src: 'images/core memories (2).jpg', caption: 'Our First Valentine\'s Date ' },
        { src: 'images/core memories (3).jpg', caption: 'The Day You Said Yes ' },
        { src: 'images/core memories (4).jpg', caption: 'School Days Together ' },
        { src: 'images/core memories (5).jpg', caption: 'Special Moments ' },
        { src: 'images/core memories (6).jpg', caption: 'Forever Us ' },
        { src: 'images/core memories (7).jpg', caption: 'My Everything ' },
        { src: 'images/core memories (8).jpg', caption: 'Perfect Moments ' },
        { src: 'images/core memories (9).jpg', caption: 'Just Us Two ' },
        { src: 'images/core memories (10).jpg', caption: 'Love You Forever ' },
        { src: 'images/core memories (11).jpg', caption: 'My Happiness ' }
    ];

    images.forEach(img => {
        const item = document.createElement('div');
        item.className = 'gallery-item animate__animated';
        item.innerHTML = `
            <img src="${img.src}" alt="${img.caption}" class="gallery-img">
            <div class="gallery-caption">${img.caption}</div>
        `;
        gallery.appendChild(item);
    });

    masonry.layout();

    // Animate timeline items on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.dataset.animation;
                if (animation) {
                    entry.target.classList.add(animation);
                }
            }
        });
    });

    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Music Player
    const audio = new Audio('music/kumpas.mp3');
    const vinylRecord = document.querySelector('.vinyl-record');
    const musicVisualizer = document.querySelector('.music-visualizer');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');

    function toggleMusic() {
        if (audio.paused) {
            audio.play();
            vinylRecord.classList.add('playing');
            musicVisualizer.classList.add('playing');
            musicIcon.textContent = '';
            musicToggle.textContent = '';
        } else {
            audio.pause();
            vinylRecord.classList.remove('playing');
            musicVisualizer.classList.remove('playing');
            musicIcon.textContent = '';
            musicToggle.textContent = '';
        }
    }

    // Loop the song
    audio.addEventListener('ended', function() {
        audio.currentTime = 0;
        audio.play();
    });

    // Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.gallery-lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('.gallery-img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Gallery hover animations
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // Gallery hover effect
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Love Letters
    function openLetter(type) {
        let message = '';
        switch(type) {
            case 'happy':
                message = "Seeing you happy makes my whole world brighter. Your smile is the most beautiful thing I've ever seen. ";
                break;
            case 'sad':
                message = "Remember that I'm always here for you, through thick and thin. You're stronger than you think, and I believe in you. ";
                break;
            case 'miss':
                message = "When you miss me, just remember that you're always in my heart. Distance is temporary, but our love is forever. ";
                break;
        }
        
        const modal = document.createElement('div');
        modal.className = 'letter-modal animate__animated animate__zoomIn';
        modal.innerHTML = `
            <div class="letter-content">
                <h3>My Dearest Venice,</h3>
                <p>${message}</p>
                <p class="signature">Love always,<br>Your Forever</p>
                <button onclick="this.parentElement.parentElement.remove()">Close </button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
