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

navSlide();
