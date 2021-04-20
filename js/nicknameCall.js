const navSlide = () => {
  const burger = document.querySelector(".burger");
  const navCon = document.querySelector(".nav-con");
  const navItems = document.querySelectorAll(".nav-con .nav-item");

  burger.addEventListener("click", () => {
    //   show the menu
    navCon.classList.toggle("nav-con-toggle");

    //   show the texts animation
    navItems.forEach((item, index) => {
      if (item.style.animation.indexOf("text-animation-in") !== -1) {
        item.style.animation = `.1s linear forwards text-animation-out`;
      } else {
        item.style.animation = `0.3s ease-in-out ${
          index / 9
        }s forwards text-animation-in`;
      }
    });
    //   change the burger
    burger.classList.toggle("burger-toggle");
  });
};

// const heroDisplay = () => {
//   const bg = document.querySelector(".bg");
//   const heroImage = document.querySelector(".hero-image");
//   const heroText = document.querySelector(".hero-text");
//   window.addEventListener("load", () => {
//     bg.classList.add("bg-display");
//     heroImage.classList.add("hero-image-display");
//     heroText.classList.add("hero-text-display");
//   });
// };

// const briefText = document.querySelector(".brief");

// const textAnimation = (obj) => {
//   obj.classList.add("text-animation");
// };

// // d：持续时间 duration
// const smoothScroll = (targetClassName, duration) => {
//   let target = document.querySelector(targetClassName);
//   // b：开始值 start value
//   let startPosition = window.pageYOffset;
//   let targetPosition = target.offsetTop;
//   // c：改变值 change in value
//   // this 60 means the height of navigation bar
//   let ditance = targetPosition - startPosition - 60;
//   // t：经过的时间 = 当前时间-开始时间
//   let startTime;

//   const animation = (currentTime) => {
//     if (!startTime) startTime = currentTime;
//     let timeElapsed = currentTime - startTime;
//     // axisY为文档中的纵轴坐标
//     let axisY = ease(timeElapsed, startPosition, ditance, duration);
//     console.log(axisY);
//     window.scrollTo(0, axisY);

//     // 添加一个判断条件，结束循环
//     timeElapsed < duration && requestAnimationFrame(animation);
//   };

//   requestAnimationFrame(animation);
//   // t: elapsed time 经过的时间 = 当前时间 - 开始时间, b: 开始值 start value, c:改变值 change in value, d: 持续时间 duration
//   const ease = (t, b, c, d) => {
//     t /= d;
//     return -c * t * (t - 2) + b;
//   };
// };

// // using scroll down button to go to the brief part
// const scrollDown = document.querySelector(".scroll-down");
// scrollDown.addEventListener("click", () => {
//   // alert("ok");
//   smoothScroll(".brief", 500);
// });

// // using back to top button to back to the top
// const btt = document.querySelector(".btt");
// btt.addEventListener("click", () => {
//   smoothScroll(".burger", 500);
// });

navSlide();
// heroDisplay();
// textAnimation(briefText);

// try to add some effect when mouse move into content
// const hoverChangeColor = () => {
//   const contentA = document.querySelectorAll(".project-item a");
//   const contentImgs = document.querySelectorAll(".project-item img");
//   contentImgs.forEach((img, index) => {
//     console.log(img, index);
//     // img.classList.toggle("gray");
//     contentA[index].addEventListener("mouseenter", function () {
//       img.classList.remove("gray");
//     });
//     contentA[index].addEventListener("mouseleave", function () {
//       img.classList.add("gray");
//     });
//   });
// };
// contentA.addEventListener("mouseover", function () {
//   contentImgs[0].classList.toggle("gray");
// });
// contentA.addEventListener("mouseout", function () {
//   contentImgs[0].classList.toggle("gray");
// });

// hoverChangeColor();
