"use strict";

// SELECTORS
const openMenu = document.getElementById("open--menu");
const closeMenu = document.getElementById("close--menu");
const orderNum = document.getElementById("orderNum");
const countValue = document.getElementById("count");
const nav__links = document.querySelector(".nav__links");
const menu = document.querySelector(".hamburger--menu");
const overlay = document.querySelector(".overlay");
const cartContainer = document.querySelector(".cart--container");
const cartIcon = document.querySelector(".cart");
const decreaseCountButton = document.querySelector(".decrease");
const increaseCountButton = document.querySelector(".increase");
const orderButton = document.querySelector(".itemBtn");
const emptyText = document.querySelector(".emptyText");
const displayOrder = document.querySelector(".displayOrder");
const numOfItem = document.querySelector(".numOfItem");
const deleteButton = document.querySelector(".deleteIcon");
const defaultPrice = document.querySelector(".defaultPrice");
const totalAmount = document.querySelector(".total-amount");
const nextBtn = document.querySelector(".mainNext");
const prevBtn = document.querySelector(".mainPrev");
const sliderWrapper = document.querySelector(".mainSliderContainer");
const lightboxOverlay = document.querySelector(".lightbox-overlay");
const modalLightBox = document.querySelector(".modalLightBox");
const modalCloseIcon = document.querySelector(".modalCloseIcon");
const modalNextBtn = document.querySelector(".modalNext");
const modalPrevBtn = document.querySelector(".modalPrev");
const slide = document.querySelectorAll(".slide");
const slidePagination = document.querySelectorAll(".pagination");

let curSlide = 1;
let maxSlide = 4;
let count = 0;

// IMPLEMENTING THE HAMBURGER MENU
const toggleMenu = () => {
  openMenu.classList.toggle("activeMenu");
  closeMenu.classList.toggle("activeMenu");
  nav__links.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
};

// REMOVE ITEM FROM THE CART CONTAINER
const removeItem = () => {
  emptyText.style.display = "block";
  displayOrder.style.display = "none";
  orderNum.style.display = "none";
};

// UPDATE THE NUMBER OF ITEM AND CALCULATION
const updateOrder = () => {
  orderNum.textContent = count;
  numOfItem.textContent = count;

  // CALCULATE THE TOTAL PRICE
  const convertPrice = parseFloat(defaultPrice.textContent.match(/(\d+)/)[0]);
  const total = convertPrice * count;
  let totalPrice = `$${total}.00`;
  totalAmount.innerHTML = totalPrice;
};

// IMPLEMENTING THE NEXT SLIDE SHOW
const nextSlide = () => {
  if (curSlide >= maxSlide) return;
  document
    .querySelectorAll(`.slide-${curSlide}`)
    .forEach((slide) => slide.classList.add("hiddenslide"));
  document
    .querySelectorAll(`.pag--${curSlide}`)
    .forEach((pagslide) => pagslide.classList.remove("activePagination"));
  curSlide++;
  document
    .querySelectorAll(`.slide-${curSlide}`)
    .forEach((slide) => slide.classList.remove("hiddenslide"));
  document
    .querySelectorAll(`.pag--${curSlide}`)
    .forEach((pagslide) => pagslide.classList.add("activePagination"));
};

// IMPLEMENTING THE PREVIOUS SLIDE SHOW
const prevSlide = () => {
  if (curSlide <= 1) return;
  document
    .querySelectorAll(`.slide-${curSlide}`)
    .forEach((slide) => slide.classList.add("hiddenslide"));
  document
    .querySelectorAll(`.pag--${curSlide}`)
    .forEach((pagslide) => pagslide.classList.remove("activePagination"));
  curSlide--;
  document
    .querySelectorAll(`.slide-${curSlide}`)
    .forEach((slide) => slide.classList.remove("hiddenslide"));
  document
    .querySelectorAll(`.pag--${curSlide}`)
    .forEach((pagslide) => pagslide.classList.add("activePagination"));
};

// DISPLAY IMAGE BASED ON THE PAGINATION
const updateImage = (pagData) => {
  slide.forEach((imgSlide) => {
    if (imgSlide.id === pagData) {
      imgSlide.classList.remove("hiddenslide");
      curSlide = Number(pagData.split("--")[1]);
    } else {
      imgSlide.classList.add("hiddenslide");
    }
  });
};

// IMPLEMENTING THE PAGINATION
slidePagination.forEach((paginaton) => {
  paginaton.addEventListener("click", (e) => {
    // REMOVE ACTIVE CLASS
    slidePagination.forEach((removeSlide) =>
      removeSlide.closest(".slidepage").classList.remove("activePagination")
    );
    // ADD ACTIVE CLASS
    e.target.closest(".slidepage").classList.add("activePagination");

    const pagData = paginaton.getAttribute("data-main");
    updateImage(pagData);
  });
});

// DISPLAY THE LIGHTBOX
const addLightbox = () => {
  modalLightBox.classList.remove("hideLightBox");
  lightboxOverlay.classList.remove("hideOverlay");
};

// REMOVE THE LIGTBOX
const removeLightbox = () => {
  modalLightBox.classList.add("hideLightBox");
  lightboxOverlay.classList.add("hideOverlay");
};

// BUTTONS

// INCREASE THE COUNT
increaseCountButton.addEventListener("click", () => {
  count++;
  countValue.innerHTML = count;
  updateOrder();
});

// DECREASE THE COUNT
decreaseCountButton.addEventListener("click", () => {
  if (count <= 0) return;
  count--;
  countValue.innerHTML = count;
  updateOrder();
  if (count == 0) {
    removeItem();
  }
});

orderButton.addEventListener("click", () => {
  if (count !== 0) {
    emptyText.style.display = "none";
    displayOrder.style.display = "block";
    orderNum.style.display = "block";
    updateOrder();
  } else {
    removeItem();
  }
});

// DELETE ITEMS IN THE CART
deleteButton.addEventListener("click", () => {
  removeItem();
  count = 0;
  countValue.innerHTML = count;
  cartContainer.classList.toggle("invisible");
});

slide.forEach((slide) => {
  slide.addEventListener("click", addLightbox);
});
cartIcon.addEventListener("click", () => {
  cartContainer.classList.toggle("invisible");
});
openMenu.addEventListener("click", toggleMenu);
closeMenu.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);
lightboxOverlay.addEventListener("click", removeLightbox);
modalCloseIcon.addEventListener("click", removeLightbox);
modalNextBtn.addEventListener("click", nextSlide);
modalPrevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);
