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
	};
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

	//select
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

	// scroll
	$(document).scroll(function () {
		anim_block();
	});

});