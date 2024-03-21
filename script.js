//Augus' part on overall website functionality

    //Scroller - leave on top, otherwise won't work
    const container = document.querySelector('.timeline_project');
    const selections = gsap.utils.toArray('.timeline_project section');
    const etxts = gsap.utils.toArray('.anim');
    const mask = document.querySelector('.mask');
    
    // Calculate the total width of all text sections
    let totalWidth = 0;
    selections.forEach(section => {
        totalWidth += section.offsetWidth;
    });
    
    //scroll trigger (scrolling = moving right on timeline)
    let scrollTween = gsap.to(selections, {
        xPercent: -100 * (selections.length - 1), // x-axis scroll
        ease: "none", // constant speed of animation
        scrollTrigger: {
            trigger: ".timeline_project",
            pin: true, // element will be pinned to the viewport (while scrolling trigger, no down scrolling)
            scrub: 1, // scroll and movement of text happens synchronized
            end: "+=1500" // End point when all text sections are fully shown
        }
    });
    
    //mask black filling gray SVG
    gsap.to(mask, {
        width: "100%",
        scrollTrigger: {
            trigger: ".timeline_project",
            start: "top top",
            scrub: 1, 
            end: "+=1800"
        }
    });
    

        //animation text
        sections.forEach(section => {
            let text = section.querySelectorAll('.anim')

            gsap.from(text, {
                y: -130,
                opacity: 0,
                duration: 2,
                ease: "elastic",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: section,
                    containerAnimation: scrollTween,
                    start: "left center", //when animation comes in
                    markers: true // for debugging (check the start and end of animations)
                }
            })
        })


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

        

    //Buttons

        //Button click redirect when clicked
        function redirectToPage(url) {
            window.location.href = url;
        }


    //Homepage
    
    //Reviews slider
    // Review Slider
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

// Button event listeners for next and previous reviews
document.querySelector('.next-btn').addEventListener('click', nextReview);
document.querySelector('.prev-btn').addEventListener('click', prevReview);

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

    
    
    //About us page


   

//Nimish's and Birte's part on interactve model