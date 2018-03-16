// /*
// 	Spectral by HTML5 UP
// 	html5up.net | @ajlkn
// 	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
// */

// (function($) {

// 	skel
// 		.breakpoints({
// 			xlarge:	'(max-width: 1680px)',
// 			large:	'(max-width: 1280px)',
// 			medium:	'(max-width: 980px)',
// 			small:	'(max-width: 736px)',
// 			xsmall:	'(max-width: 480px)'
// 		});

// 	$(function() {

// 		var	$window = $(window),
// 			$body = $('body'),
// 			$wrapper = $('#page-wrapper'),
// 			$banner = $('#banner'),
// 			$header = $('#header');

// 		// Disable animations/transitions until the page has loaded.
// 			$body.addClass('is-loading');

// 			$window.on('load', function() {
// 				window.setTimeout(function() {
// 					$body.removeClass('is-loading');
// 				}, 100);
// 			});

// 		// Mobile?
// 			if (skel.vars.mobile)
// 				$body.addClass('is-mobile');
// 			else
// 				skel
// 					.on('-medium !medium', function() {
// 						$body.removeClass('is-mobile');
// 					})
// 					.on('+medium', function() {
// 						$body.addClass('is-mobile');
// 					});

// 		// Fix: Placeholder polyfill.
// 			$('form').placeholder();

// 		// Prioritize "important" elements on medium.
// 			skel.on('+medium -medium', function() {
// 				$.prioritize(
// 					'.important\\28 medium\\29',
// 					skel.breakpoint('medium').active
// 				);
// 			});

// 		// Scrolly.
// 			$('.scrolly')
// 				.scrolly({
// 					speed: 1500,
// 					offset: $header.outerHeight()
// 				});

// 		// Menu.
// 			$('#menu')
// 				.append('<a href="#menu" class="close"></a>')
// 				.appendTo($body)
// 				.panel({
// 					delay: 500,
// 					hideOnClick: true,
// 					hideOnSwipe: true,
// 					resetScroll: true,
// 					resetForms: true,
// 					side: 'right',
// 					target: $body,
// 					visibleClass: 'is-menu-visible'
// 				});

// 		// Header.
// 			if (skel.vars.IEVersion < 9)
// 				$header.removeClass('alt');

// 			if ($banner.length > 0
// 			&&	$header.hasClass('alt')) {

// 				$window.on('resize', function() { $window.trigger('scroll'); });

// 				$banner.scrollex({
// 					bottom:		$header.outerHeight() + 1,
// 					terminate:	function() { $header.removeClass('alt'); },
// 					enter:		function() { $header.addClass('alt'); },
// 					leave:		function() { $header.removeClass('alt'); }
// 				});

// 			}

// 	});

// })(jQuery);

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
});

$("#getDonation").click(function(e) {
    var address = $('#walletAddress').text();
    console.log(address);
    var url = "https://api.blockcypher.com/v1/btc/test3/addrs/" + address; // the script where you handle the form input.
    console.log(url);
    $.ajax({
        type: "GET",
        url: url,
        success: function(data) {



            $("#donationList").empty();

            if (data.hasOwnProperty("unconfirmed_txrefs")) {
                for (var i = 0; i < data.unconfirmed_txrefs.length; i++) {
                    $("#donationList").append("<div class = \" col-md-4 col-md-offset-4 donation\">" +
                         "<h3 class = \"bitcoinDonation\">" + (data.unconfirmed_txrefs[i].value / 100000000)  + " Bitcoin </h3>"  +
                        "<h3 class = \"unconfirmedDonation\" data-toggle=\"tooltip\" title=\"We're waiting for this transaction to be confirmed!\">" + data.unconfirmed_txrefs[i].received.substring(0,10) + "</h3>" +
                        "</div>");
                }
            }

            if (data.hasOwnProperty("txrefs")) {
                for (var i = 0; i < data.txrefs.length; i++) {
                    $("#donationList").append("<div class = \" col-md-4 col-md-offset-4  donation\">" +
                        "<h3 class = \"bitcoinDonation\">" + (data.txrefs[i].value / 100000000)  + " Bitcoin </h3>"  +
                        "<h3 class = \"confirmedDonation\">" + data.txrefs[i].confirmed.substring(0,10) + "</h3>" +
                        "</div>");
                }
            }
        }
    });
});
