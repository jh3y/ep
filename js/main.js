//Feed me javascript here.
var setDemo = function (name, element) {
	$('.demo-container').remove();
	$('.show').removeClass('show');
	$('.code-snippet[name="' + name + '"]').addClass('show');
	$('body').prepend(element);
};
$('.action').on('click', function (event) {
	var action = $(this).attr('name');
	switch(action) {
	case "basic":
		setDemo('basic', '<div class = "demo-container progrecss fixed blue" data-progrecss = "0"></div>')
		setTimeout(function () {$('.demo-container').attr('data-progrecss', '75');}, 1000);
		break;
	case "mock":
		setDemo('mock', '<div class = "demo-container progrecss mock fixed red" data-progrecss-mock = "5"></div>');
		break;
	case "staggered-mock":
		setDemo('staggered-mock', '<div class = "demo-container progrecss fixed mock staggered green" data-progrecss-mock = "5"></div>');
		break;
	case "timer":
		setDemo('timer', '<div class = "demo-container progrecss fixed timer purple" data-progrecss-timer = "10"></div>');
		break;
	}
});