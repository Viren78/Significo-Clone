function homeAnimation() {
  gsap.set(".slidesm", { scale: 5 });

  var tl = gsap.timeline(
    {
      scrollTrigger: {
        trigger: ".home",
        scrub: 2,
        start: "top top",
        end: "bottom bottom",
      },
    },
    "a"
  );

  tl.to(
    ".vdodiv",
    {
      "--clip": "0%",
      ease: Power2,
    },
    "a"
  )
    .to(
      ".slidesm",
      {
        scale: 1,
        ease: Power2,
      },
      "a"
    )
    .to(
      ".lft",
      {
        xPercent: -5,
        stagger: 0.03,
        ease: Power4,
      },
      "b"
    )
    .to(
      ".rgt",
      {
        xPercent: 10,
        stagger: 0.03,
        ease: Power4,
      },
      "b"
    );
}

function realAnimation() {
  gsap.to(".slide", {
    scrollTrigger: {
      trigger: ".real",
      start: "top top",
      end: "bottom bottom",
      // markers: true,
      scrub: 1,
    },
    xPercent: -200,
    ease: Power4,
  });
}

function teamAnimation(){
    document.querySelectorAll(".listElem").forEach((el) => {
        el.addEventListener("mousemove", function (dets) {
          let moveX = gsap.utils.mapRange(0, window.innerWidth, -200, 200, dets.clientX);
          gsap.to(this.querySelector(".picture"), {
            opacity: 1,
            x: moveX,
            ease: Power4,
            duration: 0.5,
          });
        });
        el.addEventListener("mouseleave", function (dets) {
          gsap.to(this.querySelector(".picture"), {
            opacity: 0,
            ease: Power4,
            duration: 0.5,
          });
        });
      });
}

function paraAnimation(){
    var clutter = '';
    document.querySelector('.textPara').textContent.split('')
    .forEach(function(e){
        if(e === ' ') clutter += `<span>&nbsp;</span>`
        clutter += `<span>${e}</span>`
    })
    document.querySelector('.textPara').innerHTML = clutter;

    gsap.set('.textPara span', {opacity: .1})
    gsap.to('.textPara span', {
        scrollTrigger: {
            trigger: '.para',
            start: 'top 50%',
            end: 'bottom 80%',
            scrub: 1
        },
        opacity: 1,
        stagger: .03,
        ease: Power4
    })
}

(function () {
    const locomotiveScroll = new LocomotiveScroll();
})();

function sectionAnimation() {
    document.querySelectorAll('.section').forEach(function(e){
        ScrollTrigger.create({
            trigger: e,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: function(){
                document.body.setAttribute('theme', e.dataset.color);
            },
            onEnterBack: function(){
                document.body.setAttribute('theme', e.dataset.color);
            }
        })
    })
}

homeAnimation();
realAnimation();
teamAnimation();
paraAnimation();
sectionAnimation();