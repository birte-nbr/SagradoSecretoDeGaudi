//Augus' part on overall website functionality

    //tap button accessibilioty function (no square when using mouse)


    //Burger menu

        //Burger menu function to open
        function toggleMenu() {
            var menu = document.querySelector('.menu');
            menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
        }

        //Burger menu function to close the menu when clicking outside of it
        function closeMenuOnClickOutside(event) {
            var menu = document.querySelector('.menu');
            var menuToggle = document.querySelector('.menu-toggle');
            
            // Check if the clicked element is not within the menu or the menu toggle
            if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
                menu.style.display = 'none';
            }
        }

        // Event listener to close the menu when clicking outside of it
        document.addEventListener('click', closeMenuOnClickOutside);


    //function to change burger menu to cross and back when clicked{
        //var menu = document.querySelector('.menu');
        //var burgerIcon = document.getElementById('burger-icon');

        // if (menu.style.display === 'block') {
        // menu.style.display = 'none';
                    //burgerIcon.innerHTML = ''; // Reset to empty
                    //burgerIcon.innerHTML = '<path fill="#000" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>'; // Burger icon SVG path
                //} else {
                   // menu.style.display = 'block';
                    //burgerIcon.innerHTML = ''; // Reset to empty
                    //burgerIcon.innerHTML = '<path fill="#000" d="M7 10.5l9 9-1.4 1.4-9-9-9 9L0.6 19z"/>'; // Cross icon SVG path
                //}
            //}

    //Banner images
        //interactivity of homepage banner
        let leftExpanded = false;
        let rightExpanded = false;
        
        // event listener: trigger transition on mouse enter
        document.querySelector('.banner').addEventListener('mouseenter', function(event) {
            const mouseX = event.clientX;
            const bannerLeftEdge = document.querySelector('.banner').getBoundingClientRect().left;
            const bannerWidth = document.querySelector('.banner').offsetWidth;
        
            if (mouseX < bannerLeftEdge + (bannerWidth / 2)) {
                if (!leftExpanded) {
                    document.querySelector('#banner-left').style.transition = 'width 2s ease';
                    document.querySelector('#banner-right').style.transition = 'width 2s ease';
                    document.querySelector('#banner-left').style.width = '100%';
                    document.querySelector('#banner-right').style.width = '0%';
                    leftExpanded = true;
                    rightExpanded = false;
                }
            } else {
                if (!rightExpanded) {
                    document.querySelector('#banner-left').style.transition = 'width 2s ease';
                    document.querySelector('#banner-right').style.transition = 'width 2s ease';
                    document.querySelector('#banner-left').style.width = '0%';
                    document.querySelector('#banner-right').style.width = '100%';
                    leftExpanded = false;
                    rightExpanded = true;
                }
            }
        });
        
        // event listener: trigger transition on mouse leave
        document.querySelector('.banner').addEventListener('mouseleave', function() {
            document.querySelector('#banner-left').style.transition = 'width 2s ease';
            document.querySelector('#banner-right').style.transition = 'width 2s ease';
            document.querySelector('#banner-left').style.width = '50%';
            document.querySelector('#banner-right').style.width = '50%';
            leftExpanded = false;
            rightExpanded = false;
        });
        

    //Buttons

        //Button click redirect
        function redirectToPage(url) {
            window.location.href = url;
        }


    //Reviews
    let currentReviewIndex = 0;
        const totalReviews = document.querySelectorAll('.review-slide').length;
        const slider = document.querySelector('.review-slider');
        const slideWidth = document.querySelector('.review-slide').offsetWidth;

        function showReview(index) {
            const offset = -index * slideWidth;
            slider.style.transform = `translateX(${offset}px)`;
        }

        function nextReview() {
            currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
            showReview(currentReviewIndex);
        }

        function prevReview() {
            currentReviewIndex = (currentReviewIndex - 1 + totalReviews) % totalReviews;
            showReview(currentReviewIndex);
        }

        // Show the first review initially
        showReview(currentReviewIndex);


    //Contact form
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        // Prevent browser from default behavior after submission like reload etc.
        event.preventDefault();
    
        // Get form input values
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const message = document.querySelector('#message').value.trim();
    
        // Check if fields are filled
        if (name === '' || email === '' || message === '') {
            alert('Please fill out all fields.');
            return; // Exit the function if fields are not filled
        }
    
        // Additional validation (email format)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return; // Exit the function if email format is invalid
        }
    
        // If all validations pass, form submission
        //next steps: data to server using AJAX xample:
            // const formData = new FormData(this);
            // fetch("submit.php", {
            //     method: "POST",
            //     body: formData
            // })
            // .then(response => {
            //     // Handle response
            // })
            // .catch(error => {
            //     // Handle error
            // });
        //BUT: need server-side code (like PHP) to handle form submissions and process the data

        //logging the form data to the console
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Message:', message);
    
        //reset the form after submission
        this.reset();
    });
    
        
        

//Nimish's and Birte's part on interactve model
