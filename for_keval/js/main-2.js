$(function() {
    "use strict";


/* ==========================================================================
   Preload
   ========================================================================== */
    
    $(window).load(function() {
        
        $("#status").fadeOut();
        
        $("#preloader").delay(1000).fadeOut("slow");
    });


/* ==========================================================================
   On Scroll animation
   ========================================================================== */
    
    if ($(window).width() > 992) {
        new WOW().init();
    }

/* ==========================================================================
   Smooth Scroll
   ========================================================================== */
    
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 40)
                }, 1000);
                return false;
            }
        }
    });



/* ==========================================================================
   App screenshot slider
   ========================================================================== */
    
    $(".screenshot-slider").owlCarousel({
        autoPlay: 3000, //Set AutoPlay speed
        items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [979, 1]
    });



/* ==========================================================================
     sub form
   ========================================================================== */
    function loading() {
        $('#mc-notification').show().html('Sending...');
    }
    
    function formResult(data) {
//        $('#mc-notification').html(data);
        $('#mc-form input').val('');
        window.location.href = "thanks.html";
    }
    
    function onSubmit() {
        $('#mc-form').submit(function() {
            var action = $(this).attr('action');
            loading();
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    email: $('#mailchimp-email').val(),
                },
                success: function(data) {
                    formResult(data);
                },
                error: function(data) {
                    formResult(data);
                }
            });
            return false;
        });
    }
    onSubmit();


/* ==========================================================================
    Contact Form
   ========================================================================== */
    
    
    $('#contact-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: "<i class='fa fa-exclamation-triangle'></i>Please specify your name.",
            email: {
                required: "<i class='fa fa-exclamation-triangle'></i>We need your email address to contact you.",
                email: "<i class='fa fa-exclamation-triangle'></i>Please enter a valid email address."
            },
            message: "<i class='fa fa-exclamation-triangle'></i>Please enter your message."
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                url: "php/contact-me.php",
                success: function() {
                    $('#contact-form :input').attr('disabled', 'disabled');
                    $('#contact-form').fadeTo("slow", 0.15, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor', 'default');
                        $('.success-cf').fadeIn();
                    });
                    $('#contact-form')[0].reset();
                },
                error: function() {
                    $('#contact-form').fadeTo("slow", 0.15, function() {
                        $('.error-cf').fadeIn();
                    });
                }
            });
        }
    });

/* ==========================================================================
   ScrollTop Button
   ========================================================================== */
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('.scroll-top a').fadeIn(200);
        } else {
            $('.scroll-top a').fadeOut(200);
        }
    });
    
    
    $('.scroll-top a').click(function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

 /* ==========================================================================
   parallax scrolling 
   ========================================================================== */
    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        		if($(window).width()>992){skrollr.init({forceHeight:false})}$(window).on("resize",function(){if($(window).width()<=	992){skrollr.init().destroy()}});$(window).on("resize",function(){if($(window).width()>992){skrollr.init({forceHeight:false})}});
    }

/* ==========================================================================
   sticky nav
   ========================================================================== */
    var menu = $('.navbar'); 
    var stickyNav = menu.offset().top;
    
    $(window).scroll(function() {
        if ($(window).scrollTop() > $(window).height()) {
            menu.addClass('stick');
        } else {
            menu.removeClass('stick');  
        }
    });
		
		
/* ==========================================================================
   Fade
   ========================================================================== */
    $(window).scroll(function(e) {
        var s = $(window).scrollTop(), 
        d = $(document).height(), 
        c = $(window).height(), 
        opacityVal = (s / 400);
        $('.main .overlay').css('opacity', opacityVal);
    });		

});
