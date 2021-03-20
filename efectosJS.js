const typed = new Typed('.typed', {
    strings: ['<i class="tipeoAnimado">Pensar</i>' , '<i class="tipeoAnimado">Sentir</i>', '<i class="tipeoAnimado">Entender</i>', '<i class="tipeoAnimado">Analizar</i>', '<i class="tipeoAnimado">Vivir</i>'],
    loop: true,
    loopCount: false,
    startDelay: 1000,
    backDelay: 1300,
    showCursor: true,
    cursorChar: '|',
    typeSpeed: 80,
    backSpeed: 75
})

$('#frases').click( function(e) {
    e.preventDefault();

    $('html,body').animate({
        scrollTop: $("#frasesitas").offset().top,
    },500);
})

$('#enlace-carrito').click( function(e) {
    e.preventDefault();

    $('html,body').animate({
        scrollTop: $("#carroCompra").offset().top,
    },500);
})

$(window).scroll( function() {
    let pixel = $(window).scrollTop()
    if (pixel > 250) {
        $('.scroll1').fadeIn(2000)
    }
})

$(window).scroll( function() {
    let pixel = $(window).scrollTop()
    if (pixel > 800) {
        $('.scroll2').fadeIn(3000)
    }}
)

$(window).scroll( function() {
    let pixel = $(window).scrollTop()
    if (pixel > 1000) {
        $('.scroll3').slideDown(3000)
    }}
)

