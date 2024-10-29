// Ejecuta el código una vez que el contenido de la página ha sido completamente cargado
document.addEventListener('DOMContentLoaded', function() {
        
    const projectCards = document.querySelectorAll('.project-card');
    const skillTags = document.querySelectorAll('.skill-tag');
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach((button, index) => {
        const savedLikes = localStorage.getItem(`project-${index}-likes`) || 0;
        const savedLikeState = localStorage.getItem(`project-${index}-liked`) === 'true';
        
        button.querySelector('.like-count').textContent = savedLikes;
        if (savedLikeState) {
            button.classList.add('liked');
            button.querySelector('.heart').textContent = '♥';
        }

        button.addEventListener('click', () => {
            const likeCount = button.querySelector('.like-count');
            const heart = button.querySelector('.heart');
            const isLiked = button.classList.contains('liked');
            
            if (!isLiked) {
                button.classList.add('liked');
                heart.textContent = '♥';
                likeCount.textContent = parseInt(likeCount.textContent) + 1;
            } else {
                button.classList.remove('liked');
                heart.textContent = '♡';
                likeCount.textContent = parseInt(likeCount.textContent) - 1;
            }
            
            localStorage.setItem(`project-${index}-likes`, likeCount.textContent);
            localStorage.setItem(`project-${index}-liked`, !isLiked);
        });
    });

    // Define project tags
    const projectData = {
        'Virasoro City': ['Wordpress'],
        'Sitio RiotGames': ['JavaScript', 'HTML5', 'CSS3'],
        'Sitio Mainumbys': ['Wix']
    };

    function filterProjects(tag) {
        projectCards.forEach(card => {
            const projectTitle = card.querySelector('.project-title').textContent;
            const projectName = projectTitle.split(' ').slice(1).join(' '); // Remove emoji
            const projectTags = projectData[projectName];
            
            if (tag === 'all' || projectTags.includes(tag)) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    }

    // Initial state - show all projects
    projectCards.forEach(card => card.classList.add('visible'));

    // Add click event listeners to skill tags
    skillTags.forEach(tag => {
        tag.addEventListener('click', () => {
            if (tag.classList.contains('active')) {
                tag.classList.remove('active');
                projectCards.forEach(card => card.classList.add('visible'));
                return;
            }
            // Remove active class from all tags
            skillTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            tag.classList.add('active');
            
            // Filter projects based on clicked tag
            const tagText = tag.textContent;
            filterProjects(tagText);
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
