/*
* Template: Nightshade Template
* Author: Dominik Roth
* Author URL: https://roth.systems/
* Contact: dominik@roth.systems
*/
/* INDEX

    1. Page Setup
        - page_list
        - page_titles
        - $(document).ready();

    2. Page Function
        2.1 Home Page Functions
            - setup_home_text_carousel();

        2.2 About Page Functions

        2.3 Portfolio Page Functions
            - setup_portfolio_modal();

        2.4 Resume Page Functions
            - setup_timeline();

        2.5 Blog Page Functions

        2.6 Contact Page Functions
            - setup_bootstrap_contact_form_validator();
            - setup_contact_form();

    3. Helper Functions
        - handle_page_start();
        - jump(hash);
        - set_title(title);
        - isItIE();

    4. Navigation Functions
        - goto_previous();
        - goto_next();
        - goto_page(page, auto_hide_navigation=true);
        - setup_navigation();

    5. Modals Setup
        - setup_privacy_policy_modal();
        - setup_legal_notice_modal();

    6. Background Image Generation Function
        - setup_background_animation();
*/

/*
    Configuration

    Configure the page to your liking here.

    Options:
    home_style: 'slide', 'console'
    use_loader: true, false
*/
var page_configuration = {
    home_style: 'slide',
    use_loader: true,
    loader_speed: 500,
};

/*
    List of all Section Pages, if you add a new page, add the id to this list.
    This makes sure the navigation handles it
*/
page_list = ['home-tab', 'about-tab', 'portfolio-tab', 'resume-tab', 'blog-tab', 'contact-tab'];

/*
    Dictionary of all Titles for the according pages.
    If you add a new section page, enter the corresponding title here.
*/
page_titles = {
    '#home-tab': 'Home',
    '#about-tab': 'About',
    '#portfolio-tab': 'Portfolio',
    '#resume-tab': 'Resume',
    '#blog-tab': 'Blog',
    '#contact-tab': 'Contact'
}
/* Configurations End */

/*
    1. Page Setup
*/
$(document).ready(function() {
    // Handle Start Events
    handle_page_start();

    // Setup Background Animation
    setup_background_animation();

    // Setup Page Navigation
    setup_navigation();

    // Home Page - Text Carousel Creator
    setup_home_text_carousel();

    setup_modal();

    // Setup Bootstrap Contact Form Validation
    setup_bootstrap_contact_form_validator();

    // Setup Contact Form Submit Event
    setup_contact_form();


    // Handle Loader
    handle_loader();
});

function setup_modal(return_to) {
    $('.page-modal-trigger').on('click', function() {
        let preview_type = $(this).data('preview-type');
        let portfolio_modal = new bootstrap.Modal(document.getElementById('portfolio-modal'), {});
        let modal_object = $('#portfolio-modal');
        let title = $(this).data('preview-title');
        let title_element = $(modal_object).find('h5');
        let content_element = $(modal_object).find('.modal-body');
        title_element.html(title);
        if (preview_type == 'frame') {
            let target_url = $(this).data('preview-content');
            content_element.html('<iframe src="' + target_url + '"></iframe>');
            $('.modal-visit-btn').on('click', function() {
               window.open(target_url);
            });
        }
        portfolio_modal.show();
        if ($(this.data('preview-return-to')) != undefined) {
            return_to =  $(this.data('preview-return-to'));
        } else {
            return_to = 'portfolio-tab';
        }
        jump(return_to);
    });
    var tooltip = new bootstrap.Tooltip($('.modal-visit-btn'), {});
}
/* Page Setup End */

/*
    2. Page Functions
*/

/*
    2.1 Home Page Functions
*/
function setup_home_text_carousel() {
    // Owl Carousel
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        loop: true,
        items: 1,
        autoplay: true
    });
}
/* Home Page Functions End */

/*
    2.2 About Page Functions
*/

// About Page has no functions yet

/* About Page Functions End */

/*
    2.3 Portfolio Page Functions
*/
/* Portfolio Page Functions End*/

/*
    2.4 Resume Page Functions
*/
/* Resume Page Functions End */

/*
    2.5 Blog Page Functions
*/

// Blog Page has no functions yet

/* Blog Page Functions End */

/*
    2.6 Contact Page Functions
*/
function setup_bootstrap_contact_form_validator() {
    // Setup Bootstrap Contact Form Validation
    (function () {
        'use strict'
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation');
        // Loop over them and prevent submission if they're not valid.
        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    })();
}

function setup_contact_form() {
    // Setup Contact Form Submit Event
    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = $(this).attr('action');

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    // Handle Form Success Event here
                    $('#contact-form').addClass('d-none');
                    $('.contact-form-loader').removeClass('d-none');
                    setTimeout(function() {
                        $('.contact-form-loader').addClass('d-none');
                        $('.contact-form-success').removeClass('d-none');
                    }, 1000);
                },
                error: function(data) {
                    // Handle Form Error Event here
                    $('#contact-form').addClass('d-none');
                    $('.contact-form-loader').removeClass('d-none');
                    setTimeout(function() {
                        $('.contact-form-loader').addClass('d-none');
                        $('.contact-form-error').removeClass('d-none');
                    }, 1000);
                }
            });
            return false;
        }
    });
}
/* Contact Page Functions End */

/*
    3. Helper Functions
*/
function handle_page_start() {
    // Setup Loader
    setup_loader();

    // If page is opened with a # link it automatically navigates to the corresponding page
    if (document.location.href.includes('#')) {
        navigate_to = document.location.href.split('#')[1];
        // Call goto_page and set auto_hide_navigation to false.
        goto_page('#' + navigate_to, false);
    }

    if (isItIE()) {
        // Source: https://w3programmings.com/detect-internet-explorer-and-display-a-warning-message-to-change-the-browser/
        alert("Warning! You are using the outdated Internet Explorer!\r\nThis website doesn't fully work this way.\r\n\r\nPlease use a modern browser like Firefox or a Chrome based browser.")
    }
}

function jump(hash) {
    location.replace("#" + hash)
}

function set_title(title) {
    $('#current-page-title').css('opacity', 0);
    setTimeout(function() {
        $('#current-page-title').html(title);
        $('#current-page-title').css('opacity', 1);
    }, 500);
}

// Message for Internet Explorer incompatibility
function isItIE() {
    // Source: https://w3programmings.com/detect-internet-explorer-and-display-a-warning-message-to-change-the-browser/
    user_agent = navigator.userAgent;
    var is_it_ie = user_agent.indexOf("MSIE ") > -1 || user_agent.indexOf("Trident/") > -1;
    return is_it_ie;
}

/* Helper Functions End */

/*
    4. Navigation Functions
*/
function goto_previous() {
    // Function to handle previous page navigation
    for (let i = 0; i < page_list.length; i++) {
        if ($('#' + page_list[i]).css('display') == 'flex') {
            if (i-1 < 0) {
                // Call goto_page and set auto_hide_navigation to false.
                goto_page('#' + page_list[page_list.length-1], false);
                jump(page_list[0]);
            } else {
                // Call goto_page and set auto_hide_navigation to false.
                goto_page('#' + page_list[i-1], false);
                jump(page_list[i-1]);
            }
        }
    }
}

function goto_next() {
    // Function to handle next page navigation
    for (let i = 0; i < page_list.length; i++) {
        if ($('#' + page_list[i]).css('display') == 'flex') {
            if (i+1 == page_list.length) {
                // Call goto_page and set auto_hide_navigation to false.
                goto_page('#' + page_list[0], false);
                jump(page_list[0]);
            } else {
                // Call goto_page and set auto_hide_navigation to false.
                goto_page('#' + page_list[i+1], false);
                jump(page_list[i+1]);
            }
        }
    }
}

function goto_page(page, auto_hide_navigation=true) {
    /*
    Function to handle page navigation

    If auto_hide_navigation is set to false, the navigation bar won't call the function to automatically hide it again.
    Which is used either when the Navigation arrows are used, or the page gets loaded with a specific subpage in the url.
    */
    if (page == '#') {
        return;
    }
    // Sets the title for the new page from the page_titles dictionary.
    set_title(page_titles[page]);
    if ($(page).css('display') != 'flex') {
        // Hiding open Section
        $('#main-content').children('section').each(function(index) {
            if ($(this).css('display') == 'flex') {
                if ($(window).width() < 720) {
                    $(this).hide("slide", {direction: 'up'}, 100);
                } else {
                    $(this).hide("slide", {direction: 'left'}, 350);
                }
            }
        });
        if ($(window).width() < 720) {
            // Opening new Section using the mobile screen size animation.
            $(page).delay(375).show("slide", {direction: 'down'}, 100);
            if ($('#navigation').css('display') == 'block') {
                $('#navigation').slideToggle('slow');
            }
        } else {
            // Opening new Section using the desktop screen size animation.
            $(page).delay(375).show("slide", {direction: 'left'}, 350, function() {
                handle_nav_opener(auto_hide_navigation);
            });
        }
    }
}

function setup_navigation(hide_navigation=true) {
    // Mobile Navigation Button functionality
    $('.mobile-nav-button').on('click', function() {
        $('#navigation').slideToggle('slow');
    });

    // Goto Previous Page button
    $('#goto-previous').on('click', function(e) {
        e.preventDefault();
        goto_previous();
    });

    // Goto Next Page button
    $('#goto-next').on('click', function(e) {
        e.preventDefault();
        goto_next();
    });

    // Goto Home Page button
    $('#goto-home').on('click', function() {
        goto_page('#home-tab');
    });

    // Goto About Page button
    $('#goto-about').on('click', function() {
        goto_page('#about-tab');
    });

    // Goto Portfolio Page button
    $('#goto-portfolio').on('click', function() {
        goto_page('#portfolio-tab');
    });

    // Goto Resume Page button
    $('#goto-resume').on('click', function() {
        goto_page('#resume-tab');
    });

    // Goto Blog Page button
    $('#goto-blog').on('click', function() {
        goto_page('#blog-tab');
    });

    // Goto Contact Page button
    $('#goto-contact').on('click', function() {
        goto_page('#contact-tab');
    });
    // Navigation Opener Button Click Event
    $('#nav-opener > a').on('click', function() {
        handle_nav_opener();
    });
}

function handle_nav_opener(auto_hide_navigation=true) {
    if (auto_hide_navigation) {
        $(this).toggleClass('flip');
        $(this).toggleClass('full-visible');
        $('#navigation').slideToggle('slow').promise();
    }
}
/* Navigation Functions End */

/*
    5. Modals Setup
*/
/* Modals Setup End */

/*
    6. Loader Setup
*/
function setup_loader() {
    if (page_configuration.use_loader == true) {
        $('.loader-outer').fadeIn(page_configuration.loader_speed);
    }
}

function handle_loader() {
    if (page_configuration.use_loader == true) {
        $('.loader-outer').fadeOut(page_configuration.loader_speed, function() {
            $('#page-container').fadeIn(page_configuration.loader_speed);
        });
    }
}
/* Loader Setup End */
/*
    6. Background Image Generation Function
*/
function setup_background_animation() {
    // Creates the background animation using ParticleJS
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
           }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 100
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true,
    });
}
/* Background Image Generation End */
