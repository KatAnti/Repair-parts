$(document).ready(function(){
	$('.main-nav-levels-pointer').hover(function(){
		$(this).siblings('a').addClass('hover');
	},function(){
		$(this).siblings('a').removeClass('hover');
	});
	
	$('.aside-catalog-menu-submenu').hide();
	
	$('.aside-catalog-menu-point').each(function(){
		if ($(this).children('.aside-catalog-menu-submenu').html()){
			$(this).addClass('aside-catalog-menu-point-levels');
		}
	});
	
	$('.aside-catalog-menu-point').on('click', function(event){
		if($(this).children('.aside-catalog-menu-submenu').html()){
			event.preventDefault();
			$(this).children('.aside-catalog-menu-submenu').slideToggle();
			$(this).toggleClass('active');
		}
	});
	
	$('.filter-checkbox').on('change', function(){
		var checked = false;
		$(this).closest('.filter-section').find('.filter-checkbox').each(function(){
			if ($(this).prop('checked')){
				checked = true;
			}
		});
		
		if (checked){
			$(this).parent().prev().addClass('filter-section-ttl-active');
		}
		else{
			$(this).parent().prev().removeClass('filter-section-ttl-active');
		}
	});
	
	$('.product-point-counter-control.plus').on('click', function(event){
		var count = $(this).siblings('.product-point-counter-input').val();
		$(this).siblings('.product-point-counter-input').val(+count+1);
	});
	
	$('.product-point-counter-control.minus').on('click', function(event){
		var count = $(this).siblings('.product-point-counter-input').val();
		if(count>0){
			$(this).siblings('.product-point-counter-input').val(+count-1);
		}
	});
	
	$('.price-range-input').on('change', sliderStateChange);
	
	
	
	//slick
	$('.index-main-slider').slick({
		arrows: false,
		autoplay: true,
		dots: true,
		dotsClass: 'slider-panagation',
	});
	
	$('.video-slider, .news-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: false,
		dots: true,
		dotsClass: 'slider-panagation intop-panagation',
	});
	
	/* видео находится в атрибуте, чтобы не тормозила загрузка iframe  */
	$('.video-preview').click(function(){
		var video = $(this).find('code').data('frame');
		if (video)
			$(this).html(video);
	});
});

function sliderStateChange(){
	if ($('#minPrice').val() != $('#minPrice').data('val') || $('#maxPrice').val() != $('#maxPrice').data('val')){
		$('#price-range').closest('.filter-section').prev().addClass('filter-section-ttl-active');
	}
	else{
		$('#price-range').closest('.filter-section').prev().removeClass('filter-section-ttl-active');
	}
}

var slider = document.getElementById('price-range');

noUiSlider.create(slider, {
	start: [10, 1000],
	connect: true,
	range: {
		'min': 10,
		'max': 1000
	}
});

var minPrice = document.getElementById('minPrice');
var maxPrice = document.getElementById('maxPrice');

slider.noUiSlider.on('update', function( values, handle ) {

	var value = values[handle];

	if ( handle ) {
		maxPrice.value = value;
	} else {
		minPrice.value = Math.round(value);
	}
	sliderStateChange();
});

minPrice.addEventListener('change', function(){
	slider.noUiSlider.set([this.value, null]);
});

maxPrice.addEventListener('change', function(){
	slider.noUiSlider.set([null, this.value]);
});