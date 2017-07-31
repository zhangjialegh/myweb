var swiper = new Swiper('.swiper-container', {
    loop: true,
    mousewheelControl: true,
    initialSlide: 1,
    speed: 1500,
    hashnav: true,
    hashnavWatchState: true,
    roundLengths: true,
    // noSwiping: true,
    onInit() {
        star();
        swiCard();
        window.onresize();
        skewDeg();
        replacePath();
    },
    onSlideNextStart(s) {
        var snapIndex = s.snapIndex;
        var previousIndex = s.previousIndex;
        if (previousIndex === 1) previousIndex = 7;
        slideNext(snapIndex,previousIndex);
    },
    onSlidePrevStart(s) {
        var snapIndex = s.snapIndex;
        var previousIndex = s.previousIndex;
        if (snapIndex === 0) snapIndex = 6;
        slidePrev(snapIndex,previousIndex);
    }
});
//--------------------滑动执行函数------------------------------------------

//next
function slideNext(snapIndex,previousIndex) {
  
  switch (snapIndex) {
      case 3:
          $('.weather-board').css({
              right: '50%',
              width: '2px',
              left: '',
          });
          $('.weather-board').animate({
              height: '100%',
          }, 1000);
          $('.weather-board').animate({
              width: '50%',
          }, 500, function () {
              $('.weather .desc').css({
                  transform: 'translateY(50px)',
                  height: '38px',
              });
              $('.weather .title').css({
                  transform: 'translateY(0)',
                  height: '38px',
              });
              $('.weather .circle').addClass('draw-circle');
              $('.weather .arrow').addClass('move-arrow');
          });
          break;
      case 4:
          $('.c-board').css('left', '-20%');
          $('.c-board').delay(500).animate({
              left: '40%'
          }, 500, function () {
              $('.cloud .desc').css({
                  transform: 'translateY(50px)',
                  height: '38px',
              });
              $('.cloud .title').css({
                  transform: 'translateY(0)',
                  height: '38px',
              });
              $('.cloud .circle').addClass('draw-circle');
              $('.cloud .arrow').addClass('move-arrow');
          })
          break;
      case 5:
      setTimeout(function () {
        $('.m-boardB').css('left','100%');
         $('.m-boardT').css('left','-100%');
             $('.music .desc').css({
                 transform: 'translateY(50px)',
                 height: '38px',
             });
             $('.music .title').css({
                 transform: 'translateY(0)',
                 height: '38px',
             });
             $('.music .circle').addClass('draw-circle');
             $('.music .arrow').addClass('move-arrow');
      },500)
          break;
      case 6:
          $('.nature .bg').css({
              height: '3px',
              top: '50%',
              left: '50%',
              width: 0,
          }).animate({
              left: 0,
              right:0,
              width: '100%',
          }, 500).animate({
              top: 0,
              bottom:0,
              height: '100%',
          }, 300, function () {
              $('.n-board').animate({
                  bottom: '30px'
              }, 500, function () {
                  $('.nature .desc').css({
                      transform: 'translateY(50px)',
                      height: '38px',
                  });
                  $('.nature .title').css({
                      transform: 'translateY(0)',
                      height: '38px',
                  });
                  $('.nature .circle').addClass('draw-circle');
                  $('.nature .arrow').addClass('move-arrow');
              })
          });
          break;
      case 7:
          $('.mobile .bg').css({
              'width':'30%',
              'height':'100%',
              'opacity':1
          });
          $('.mobile .right-top').css({
              'width':'40%',
              'height':'100%',
              'opacity':1
          });
          $('.mobile .right-bottom').css({
              'width':'30%',
              'height':'100%',
              'opacity':1
          });

          $('.mobile .desc').css({
              transform: 'translateY(50px)',
              height: '38px',
          });
          $('.mobile .title').css({
              transform: 'translateY(0)',
              height: '38px',
          });
          $('.mobile .circle').addClass('draw-circle');
          $('.mobile .arrow').addClass('move-arrow');

          break;
      default:
          break;
  }
  switch (previousIndex) {
      case 3:
          $('.weather .circle').removeClass('draw-circle');
          $('.weather .arrow').removeClass('move-arrow');

          $('.weather .desc').animate({
              height: 0,
          }, 200, () => {
              $(this).css('transform', 'translateY(88px)');
          });
          $('.weather .title').animate({
              height: 0,
          }, 200, () => {
              $(this).css('transform', 'translateY(38px)');
          })
          $('.weather-board').css({
              left: '50%',
              height: '100%',
              width: 0,
          });
          $('.weather-board').animate({
              width: '50%',
          }, 500);

          break;
      case 4:
          $('.cloud .circle').removeClass('draw-circle');
          $('.cloud .arrow').removeClass('move-arrow');

          $('.cloud .desc').animate({
              height: 0,
          }, 200, () => {
              $(this).css('transform', 'translateY(88px)');
          });
          $('.cloud .title').animate({
              height: 0,
          }, 200, () => {
              $(this).css('transform', 'translateY(38px)');
              $('.c-board').animate({
                  left: '100%'
              }, 300)
          })
          break;
      case 5:
          $('.music .circle').removeClass('draw-circle');
          $('.music .arrow').removeClass('move-arrow');

          $('.music .desc').animate({
              height: 0,
          }, 100, function () {
              $('.music .desc').css('transform', 'translateY(88px)');
          });
          $('.music .title').animate({
              height: 0,
          }, 100, function () {
              $('.music .title').css('transform', 'translateY(38px)');
              $('.m-boardT').css('left','-50%');
               $('.m-boardB').css('left','50%');
              // $('.m-boardT').animate({
              //     left: '-50%',
              // }, 200);
              // $('.m-boardB').animate({
              //     left: '50%',
              // }, 200)
          })
          break;
      case 6:
          $('.nature .circle').removeClass('draw-circle');
          $('.nature .arrow').removeClass('move-arrow');
          $('.nature .desc').animate({
              height: 0,
          }, 100, () => {
              $(this).css('transform', 'translateY(88px)');
          });
          $('.nature .title').animate({
              height: 0,
          }, 100, () => {
              $(this).css('transform', 'translateY(38px)');
              $('.n-board').animate({
                  bottom: '-230px'
              }, 100, function () {
                  $('.nature .bg').animate({
                      height: '3px',
                      top: '50%',
                  }, 300).animate({
                      width: 0,
                      left: '50%',
                  }, 300)
              })
          })
          break;
      case 7:
          $('.mobile .circle').removeClass('draw-circle');
          $('.mobile .arrow').removeClass('move-arrow');

          $('.mobile .desc').animate({
              height: 0,
          }, 100, () => {
              $(this).css('transform', 'translateY(88px)');
          });
          $('.mobile .title').animate({
              height: 0,
          }, 100, () => {
              $(this).css('transform', 'translateY(38px)');
              $('.mobile .bg').css({
              'width':'15%',
              'height':'50%',
              'opacity':0
          });
          $('.mobile .right-top').css({
              'width':'20%',
              'height':'50%',
              'opacity':0
          });
          $('.mobile .right-bottom').css({
              'width':'15%',
              'height':'50%',
              'opacity':0
          });
          })
          break;
      default:
          break;
  }
}
//prev
function slidePrev(snapIndex,previousIndex) {
  switch (snapIndex) {
      case 1:
          $('.mobile .bg').css({
              'width':'30%',
              'height':'100%',
              'opacity':1
          });
          $('.mobile .right-top').css({
              'width':'40%',
              'height':'100%',
              'opacity':1
          });
          $('.mobile .right-bottom').css({
              'width':'30%',
              'height':'100%',
              'opacity':1
          });

          $('.mobile .desc').css({
              transform: 'translateY(50px)',
              height: '38px',
          });
          $('.mobile .title').css({
              transform: 'translateY(0)',
              height: '38px',
          });
          $('.mobile .circle').addClass('draw-circle');
          $('.mobile .arrow').addClass('move-arrow');
          break;
      case 3:
          $('.weather-board').css({
              right: '50%',
              width: '2px',
              left: '',
          });
          $('.weather-board').animate({
              height: '100%',
          }, 1000);
          $('.weather-board').animate({
              width: '50%',
          }, 500, function () {
              $('.weather .desc').css({
                  transform: 'translateY(50px)',
                  height: '38px',
              });
              $('.weather .title').css({
                  transform: 'translateY(0)',
                  height: '38px',
              });
              $('.weather .circle').addClass('draw-circle');
              $('.weather .arrow').addClass('move-arrow');
          });
          break;
      case 4:
          $('.c-board').delay(500).animate({
              left: '40%'
          }, 500, function () {
              $('.cloud .desc').css({
                  transform: 'translateY(50px)',
                  height: '38px',
              });
              $('.cloud .title').css({
                  transform: 'translateY(0)',
                  height: '38px',
              });
              $('.cloud .circle').addClass('draw-circle');
              $('.cloud .arrow').addClass('move-arrow');
          })
          break;
      case 5:
          setTimeout(function () {
            $('.m-boardB').css('left','100%');
            $('.m-boardT').css('left','-100%');
                $('.music .desc').css({
                    transform: 'translateY(50px)',
                    height: '38px',
                });
                $('.music .title').css({
                    transform: 'translateY(0)',
                    height: '38px',
                });
                $('.music .circle').addClass('draw-circle');
                $('.music .arrow').addClass('move-arrow');
          },500)
          break;
      case 6:
          $('.nature .bg').css({
              height: '3px',
              top: '50%',
              left: '50%',
              width: 0,
          }).animate({
              left: 0,
              right:0,
              width: '100%',
          }, 500).animate({
              top: 0,
              bottom:0,
              height: '100%',
          }, 300, function () {
              $('.n-board').animate({
                  bottom: '30px'
              }, 500, function () {
                  $('.nature .desc').css({
                      transform: 'translateY(50px)',
                      height: '38px',
                  });
                  $('.nature .title').css({
                      transform: 'translateY(0)',
                      height: '38px',
                  });
                  $('.nature .circle').addClass('draw-circle');
                  $('.nature .arrow').addClass('move-arrow');
              })
          });
          break;
      default:
          break;
  }
  switch (previousIndex) {
      case 1:
          $('.mobile .circle').removeClass('draw-circle');
          $('.mobile .arrow').removeClass('move-arrow');

          $('.mobile .desc').animate({
              height: 0,
          }, 100, () => {
              $(this).css('transform', 'translateY(88px)');
          });
          $('.mobile .title').animate({
              height: 0,
          }, 100, () => {
              $(this).css('transform', 'translateY(38px)');

               $('.mobile .bg').css({
              'width':'15%',
              'height':'50%',
              'opacity':0
          });
          $('.mobile .right-top').css({
              'width':'20%',
              'height':'50%',
              'opacity':0
          });
          $('.mobile .right-bottom').css({
              'width':'15%',
              'height':'50%',
              'opacity':0
          });
          });
          break;
      case 3:
          $('.weather .circle').removeClass('draw-circle');
          $('.weather .arrow').removeClass('move-arrow');
          $('.weather .desc').animate({
              height: 0,
          }, 100, () => {
              $(this).css('transform', 'translateY(88px)')
          });
          $('.weather .title').animate({
              height: 0,
          }, 100, () => {
              $(this).css('transform', 'translateY(38px)');
              $('.weather-board').animate({
                  width: 0,
              }, 300);
          });
          break;
      case 4:
          $('.cloud .circle').removeClass('draw-circle');
          $('.cloud .arrow').removeClass('move-arrow');
          $('.cloud .desc').animate({
              height: 0,
          }, 200, () => {
              $(this).css('transform', 'translateY(88px)')
          });
          $('.cloud .title').animate({
              height: 0,
          }, 200, () => {
              $(this).css('transform', 'translateY(38px)');
              $('.c-board').animate({
                  left: '-20%'
              }, 300)
          })
          break;
      case 5:
          $('.music .circle').removeClass('draw-circle');
          $('.music .arrow').removeClass('move-arrow');

          $('.music .desc').animate({
              height: 0,
          }, 100, () => {
              $(this).css('transform', 'translateY(88px)');
          });
          $('.music .title').animate({
              height: 0,
          }, 100, () => {
              $(this).css('transform', 'translateY(38px)');
              $('.m-boardT').css('left','-50%');
               $('.m-boardB').css('left','50%');
          })
          break;
      case 6:
          $('.nature .circle').removeClass('draw-circle');
          $('.nature .arrow').removeClass('move-arrow');
          $('.nature .desc').animate({
              height: 0,
          }, 100, () => {
              $(this).css('transform', 'translateY(88px)');
          });
          $('.nature .title').animate({
              height: 0,
          }, 100, () => {
              $(this).css('transform', 'translateY(38px)');
              $('.n-board').animate({
                  bottom: '-230px'
              }, 100, function () {
                  $('.nature .bg').animate({
                      height: '3px',
                      top: '50%',
                  }, 300).animate({
                      width: 0,
                      left: '50%',
                  }, 300)
              })
          })
          break;
      default:
          break;
  }
}