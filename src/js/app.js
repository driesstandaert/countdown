import '../scss/app.scss';


////////////////////
// Count count count
////////////////////

(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  let dday = "Apr 20, 2021 09:00:00",
      countDown = new Date(dday).getTime(),
      x = setInterval(function() {    

        let now = new Date().getTime(),
            distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        if (distance < 0) {
          let headline = document.getElementById("headline"),
              countdown = document.getElementById("countdown");

          headline.innerText = "BOOM";
          countdown.style.display = "none";

          clearInterval(x);
        }
        //seconds
      }, 0)
  }());


////////////////////
// paint paint paint
////////////////////

let canvas = document.querySelector('#draw');
        let ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.strokeStyle = '#FF9966';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 200;
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        let hue = 0;
        let direction = true;

        function draw(e) {
          isDrawing = true;
            if (!isDrawing) return;
            // ctx.strokeStyle = `hsl(${hue},100%,50%)`;
            ctx.strokeStyle = '#F75F2A';
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            [lastX, lastY] = [e.offsetX, e.offsetY];
            hue++;
            if (hue >= 10) { //360
                hue = 0;
            };

            if (ctx.lineWidth >= 10 || ctx.lineWidth <= 1) { //100
                direction = !direction;
            };

            if (direction) {
                ctx.lineWidth++;
            } else {
                ctx.lineWidth--;
            };

        };

        // canvas.addEventListener('mousedown', (e) => {
        //     isDrawing = true;
        //     [lastX, lastY] = [e.offsetX, e.offsetY];
        // });
        canvas.addEventListener('mousemove', draw);

        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);



//////////////////
// drag drag drag
//////////////////

$( ".js-drag" ).draggable({
  containment: ".js-dragzone"
});


// Ensure that full animation plays.
// $(".js-key").bind("webkitAnimationEnd mozAnimationEnd oanimationEnd animationEnd", function() {
//   $(this).removeClass("js-animate");
// })

// Stop and start sound
function playSound() {
    var sound = document.getElementById('js-sound');
    if (sound.paused) {
        sound.play();
    } else{
        sound.currentTime = 0
    }
}

// clone elements
function cloneShizzle() {
  var $div = $('div[id^="clone"]:last');
      // get viewport width/height
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

      // Read the Number from that DIV's ID
      // And increment that number by 1
      var num = parseInt( $div.prop("id").match(/\d+/g), 10 ) +1;

      // Clone it and assign the new ID 
      var $clone = $div.clone().prop('id', 'clone'+num ).css({"left": Math.floor(Math.random() * vw) + "px", "top": Math.floor(Math.random() * vh) + "px"});

      // Insert $clone
      $clone.appendTo('body').draggable();
}



// initiate animation/sound by keystroke
$(window).keydown(function(event) {
  event.preventDefault();
  switch (event.which) {
    // key Spacebar
    case 32:
      playSound();
      cloneShizzle();
      break;
    default:
      break;
  }
})