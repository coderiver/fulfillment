head.ready(function() {

	// animation block
	function anim_block () {
		var item = $('.anim-block');
		if (item.length) {
			var scroll_top = $(document).scrollTop(),
					wnd_height = $(window).height();
			item.each(function () {
				var top = $(this).offset().top;
				if (scroll_top >= (top - wnd_height/1.3)) {
					$(this).addClass('is-shown');
				};
			});
		};
	}
	anim_block();

	// main slider
	var main = $('.js-main'),
			main_slider = main.find('.main__slider'),
			main_slide = main_slider.find('.main__slide'),
			main_pager = main.find('.main__pager');
	main_slider.cycle({
		fx: 'scrollHorz',
		slides: main_slide,
		slideActiveClass: 'is-active',
		pager: main_pager,
		pagerActiveClass: 'is-active',
		timeout: 5000
	});
	main_pager.hover(function () {
		main_slider.cycle('pause');
	}, function () {
		main_slider.cycle('resume');
	});
	main_pager.find('button').on('click', function () {
		if ($(this).hasClass('is-active')) {
			var link = $(this).data('link');
			window.location.href = link;
		};
	});

	// go top
	var go_top = $('.js-go-top');
	go_top.on('click', function () {
		$('html, body').animate({scrollTop: 0}, 500);
	});

	// select
	function select() {
		var el = $('.js-select');
		el.find('.select__head').on('click', function(){		
			if ($(this).parent().hasClass('is-open')) {
				$(this).parent().removeClass('is-open');
				$(this).next().hide();
			}
			else {
				el.removeClass('is-open');
				el.find('.select__list').hide();
				$(this).parent().addClass('is-open');
				$(this).next().fadeIn();
			}
		})
		el.find('.select__list li').bind('click', function(){
			var val = $(this).text();
			$(this).parent().parent().prev().find('.select__title').html(val);
			$(this).parent().parent().next().val(val);
			$(this).parent().parent().hide();
			$(this).parents('.select').removeClass('is-open');
		})
		el.click(function(event){
			event.stopPropagation();
		});
		$(document).click(function() {
			el.find('.select__list').hide();
			el.removeClass('is-open');
		});
	}
	select();

	// reviews
	function reviews () {
		var el = $('.js-reviews'),
				slider = el.find('.reviews__slider'),
				slider_prev = el.find('.reviews__prev'),
				slider_next = el.find('.reviews__next'),
				slider_item = el.find('.reviews__item');
		slider.cycle({
			fx: 'carousel',
			timeout: 0,
			prev: slider_prev,
			next: slider_next,
			slides: slider_item
		});
	}
	reviews();

	//asks
	function asks () {
		var el = $('.js-asks'),
				list = el.find('.asks__list'),
				btn = el.find('.btn'),
				load = el.find('.asks__load');
		el.on('click', '.asks__title', function () {
			$(this).toggleClass('is-active');
			$(this).next().slideToggle();
		}).first().trigger('click');
		btn.on('click', function () {
			var items = load.html();
			list.append(items);
		});
	}
	asks();

	// delivery time
	function delivery_time () {
		var el = $('.js-delivery-time'),
				form = el.find('.delivery-time__in'),
				result = el.find('.delivery-time__result'),
				btn = el.find('.btn'),
				reload = el.find('.delivery-time__reload button');
		btn.on('click', function () {
			form.slideUp(function () {
				result.slideDown();
			});
		});
		reload.on('click', function () {
			result.slideUp(function () {
				form.slideDown();
			});
		});
	}
	delivery_time();

	// tariff
	function tariff () {
		var el = $('.js-tariff'),
				nav = el.find('.tariff__nav'),
				table = el.find('.tariff__table'),
				btn_calculate = el.find('.tariff__calculate'),
				calculator = el.find('.tariff__calculator');
		nav.slick({
			slide: 'div',
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: '0px',
			swipe: false,
			onInit: function () {
				table.first().show();
			},
			onAfterChange: function () {
				var index = nav.find('.slick-slide.slick-center').data('item');
				table.hide();
				$('.' + index).show();
			}
		});
		nav.find('.slick-slide').on('click', function (){
			if ($(this).prev().hasClass('slick-center')) {
				nav.slickNext();
			};
			if ($(this).next().hasClass('slick-center')) {
				nav.slickPrev();
			};
		});
		btn_calculate.on('click', function () {
			$(this).parent().slideUp(function () {
				calculator.slideDown();
			});
		});
	}
	tariff();

	// validate
	var el_validate = $('.js-validate');
	if (el_validate.length) {
		$.validate({
		  form: el_validate,
		  borderColorOnError : '#dc2f00',
		  onSuccess : function() {
		    alert('The form is valid!');
		    return false; // Will stop the submission of the form
		  }
		});
	};

	// gallery
	function gallery () {
		var el = $('.js-gallery'),
				slider = el.find('.gallery__slider'),
				slider_prev = el.find('.gallery__prev'),
				slider_next = el.find('.gallery__next'),
				trig = $('.js-gallery-triggers a');
		trig.on('click', function () {
			el.show();
			el.addClass('is-open');
			slider.cycle({
				fx: 'scrollHorz',
				timeout: 0,
				prev: slider_prev,
				next: slider_next,
				autoheight: 'container'
			});
			var current = $(this).attr('href');
			slider.cycle('goto', current);
			return false;
		});
	}
	gallery();

	// scroll
	$(document).scroll(function () {
		anim_block();
	});

});