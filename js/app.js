jQuery(document).ready(function ($) {

	/* TABS --------------------------------- */
	/* Remove or comment out when you dont need it */
	// function activateTab($tab) {
	// 	var $activeTab = $tab.closest('dl').find('a.active'),
	// 			contentLocation = $tab.attr("href") + 'Tab';

	// 	//Make Tab Active
	// 	$activeTab.removeClass('active');
	// 	$tab.addClass('active');

	// 	//Show Tab Content
	// 	$(contentLocation).closest('.tabs-content').children('li').hide();
	// 	$(contentLocation).show();
	// }

	// $('dl.tabs').each(function () {
	// 	//Get all tabs
	// 	var tabs = $(this).children('dd').children('a');
	// 	tabs.click(function (e) {
	// 		activateTab($(this));
	// 	});
	// });

	// if (window.location.hash) {
	// 	activateTab($('a[href="' + window.location.hash + '"]'));
	// }

	/* ALERT BOXES ------------ */
	// $(".alert-box").delegate("a.close", "click", function(event) {
	// 	event.preventDefault();
	// 	$(this).closest(".alert-box").fadeOut(function(event){
	// 		$(this).remove();
	// 	});
	// });


	/* UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE6/7/8 SUPPORT AND ARE USING .block-grids */
	// $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'left'});
	// $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'left'});
	// $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'left'});
	// $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'left'});


	/* DROPDOWN NAV ------------- */
	/* Remove or comment out when you dont need it */
	// var lockNavBar = false;
	// $('.nav-bar a.flyout-toggle').live('click', function(e) {
	// 	e.preventDefault();
	// 	var flyout = $(this).siblings('.flyout');
	// 	if (lockNavBar === false) {
	// 		$('.nav-bar .flyout').not(flyout).slideUp(500);
	// 		flyout.slideToggle(500, function(){
	// 			lockNavBar = false;
	// 		});
	// 	}
	// 	lockNavBar = true;
	// });
	// if (Modernizr.touch) {
	// 	$('.nav-bar>li.has-flyout>a.main').css({
	// 		'padding-right' : '75px'
	// 	});
	// 	$('.nav-bar>li.has-flyout>a.flyout-toggle').css({
	// 		'border-left' : '1px dashed #eee'
	// 	});
	// } else {
	// 	$('.nav-bar>li.has-flyout').hover(function() {
	// 		$(this).children('.flyout').show();
	// 	}, function() {
	// 		$(this).children('.flyout').hide();
	// 	})
	// }

  	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove or comment out when you dont need it */
	// $('input, textarea').placeholder();

	/* TOOLTIPS ------------- */
	/* Remove or comment out when you dont need it */
	// $(this).tooltips();

	/* FLEXSLIDER ------------- */
	/* Remove or comment out when you dont need it */
	// $('.flexslider').flexslider({
	// 	animation: "slide",
	// 	controlsContainer: ".flex-container"
	// });

    /* FANCYBOX ------------- */
    /* http://fancyapps.com/fancybox/ */
	/* Remove or comment out when you dont need it */
	// $(".fancybox").fancybox({
	// 	closeEffect : 'elastic',
	// 	padding     : '4',
	// 	helpers: {
	// 		title : {
	// 			type: 'inside'
	// 	},

	// 		overlay	: {
	// 			opacity : 0.6,
	// 			css : {
	// 				'background-color' : '#000'
	// 			}
	// 		}
	// 	}
	// });

	/* SMALLSCRIPT FOR THE CSS3 IMAGEWRAPPER ------------- */
	/* Remove or comment out when you dont need it */
	// $('.img3d').each(function() {
	// 	var imgClass = $(this).attr('class');
	// 	$(this).wrap('<span class="image-wrap ' + imgClass + '" style="width: auto; height: auto;"/>');
	// 	$(this).removeAttr('class');
	// });

	/* RESPONSIVE TOUCH OPTIMIZED NAVIGATION ------------- */
	/* https://github.com/samuelcotterall/touchdown ------ */
	/* Remove or comment out when you dont need it */
	// $('YOURNAVIGATION ID OR CLASS').Touchdown();

	/* SCROLLPANE INIT ------------- */
	// $('.CLASS OR ID WITH SCROLLING CONTENT').jScrollPane();

	/* Init Background Stretcher --- */
	// $('#bgstretch-container').bgStretcher({
	// 	images           : ['images/1.jpg', 'images/2.jpg', 'images/3.jpg'],
	// 	imageWidth       : 1024, 
	// 	imageHeight      : 768, 
	// 	slideDirection   : 'W',
	// 	nextSlideDelay   : 8000,
	// 	slideShowSpeed   : 6000,
	// 	transitionEffect : 'fade',
	// 	sequenceMode     : 'normal',
	// 	buttonPrev       : '#prev',
	// 	buttonNext       : '#next',
	// 	pagination       : '#nav',
	// 	anchoring        : 'left center',
	// 	anchoringImg     : 'left center'
	// });

	/* Hybrid Scroll Fixed Navigation -------------------- */
	// var $win = $(window)
	// 	, $nav = $('#site-navigate')
	// 	, navTop = $('#site-navigate').length && $('#site-navigate').offset().top - 10
	// 	, isFixed = 0
	// processScroll()
	// $win.on('scroll', processScroll)
	// function processScroll() {
	// 	var i, scrollTop = $win.scrollTop()
	// 	if (scrollTop >= navTop && !isFixed) {
	// 		isFixed = 1
	// 		$nav.addClass('site-navigate-fixed')
	// 	} else if (scrollTop <= navTop && isFixed) {
	// 		isFixed = 0
	// 		$nav.removeClass('site-navigate-fixed')
	// 	}
	// }

	/* Footer Slide Up ----------------------------------- */
	// var slide = false;
	// var height = $('#footer').height();
	// $('#footer-button').click(function() {
	// 	var docHeight = $(document).height();
	// 	var windowHeight = $(window).height();
	// 	var scrollPos = docHeight - windowHeight + height;
	// 	$('#footer').animate({ height: "toggle"}, 1000);
	// 	if(slide == false) {
	// 		if($.browser.opera) { //Fix opera double scroll bug by targeting only HTML.
	// 			$('html').animate({scrollTop: scrollPos+'px'}, 1000);
	// 		} else {
	// 			$('html, body').animate({scrollTop: scrollPos+'px'}, 1000);
	// 		}
	// 		slide = true;
	// 	} else {
	// 		slide = false;
	// 	}
	// });

});