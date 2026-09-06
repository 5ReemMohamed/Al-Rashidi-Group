document.addEventListener("DOMContentLoaded", function () {

  const navbar = document.querySelector(".velora-navbar");

  if (navbar) {

    window.addEventListener("scroll", function () {

      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

    });

  }

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length && navLinks.length) {

    window.addEventListener("scroll", function () {

      let current = "";

      sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {

          current = section.getAttribute("id");

        }

      });

      navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
          link.getAttribute("href") === "#" + current
        ) {

          link.classList.add("active");

        }

      });

    });

  }

  const navLinksMobile = document.querySelectorAll(
    ".navbar-nav .nav-link"
  );

  const navbarCollapse = document.querySelector(
    "#veloraNavbar"
  );

  if (
    navLinksMobile.length &&
    navbarCollapse &&
    typeof bootstrap !== "undefined"
  ) {

    navLinksMobile.forEach(function (link) {

      link.addEventListener("click", function () {

        if (window.innerWidth < 992) {

          const bsCollapse =
            bootstrap.Collapse.getInstance(
              navbarCollapse
            );

          if (bsCollapse) {
            bsCollapse.hide();
          }

        }

      });

    });

  }

  const offersSlider = document.querySelector(
    ".veloraOffersSwiper"
  );

  if (
    offersSlider &&
    typeof Swiper !== "undefined"
  ) {

    new Swiper(
      ".veloraOffersSwiper",
      {

        loop: true,

        speed: 800,

        spaceBetween: 22,

        grabCursor: true,

        autoplay: {

          delay: 2500,

          disableOnInteraction: false,

          pauseOnMouseEnter: true

        },

        navigation: {

          nextEl: ".offers-next",

          prevEl: ".offers-prev"

        },

        pagination: {

          el: ".offers-pagination",

          clickable: true

        },

        slidesPerView: 4,

        breakpoints: {

          0: {

            slidesPerView: 1,

            spaceBetween: 15

          },

          576: {

            slidesPerView: 2,

            spaceBetween: 18

          },

          768: {

            slidesPerView: 3,

            spaceBetween: 20

          },

          1200: {

            slidesPerView: 4,

            spaceBetween: 22

          }

        }

      }
    );

  }


const contactForm =
  document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    function (e) {

      e.preventDefault();

      // Get inputs
      const nameInput =
        document.getElementById("name");

      const addressInput =
        document.getElementById("address");

      const phoneInput =
        document.getElementById("phone");

      const serviceInput =
        document.getElementById("service");

      const messageInput =
        document.getElementById("message");


      // Get values
      const name =
        nameInput?.value.trim() || "";

      const address =
        addressInput?.value.trim() || "";

      const phone =
        phoneInput?.value.trim() || "";

      const service =
        serviceInput?.value.trim() || "";

      const message =
        messageInput?.value.trim() || "";


      // Validate fields
      if (
        !name ||
        !address ||
        !phone ||
        !service ||
        !message
      ) {

        alert(
          "يرجى ملء جميع البيانات واختيار الخدمة."
        );

        return;

      }


      // WhatsApp numbers according to service
      const whatsappNumbers = {

        "عطور": "966564014040",

        "سبا": "966507142569",

        "Plastic": "966553033346"

      };


      // Get WhatsApp number
      const whatsappNumber =
        whatsappNumbers[service];


      // Safety check
      if (!whatsappNumber) {

        alert(
          "يرجى اختيار خدمة صحيحة."
        );

        return;

      }


      // WhatsApp message
      const whatsappMessage =
`✨ *رسالة جديدة من موقع الراشدي جروب*

━━━━━━━━━━━━━━━━━━

👤 *الاسم:*
${name}

📍 *العنوان:*
${address}

📱 *رقم الهاتف:*
${phone}

💎 *الخدمة المطلوبة:*
${service}

💬 *الرسالة:*
${message}

━━━━━━━━━━━━━━━━━━

تم إرسال الرسالة من موقع Velora`;


      // Encode message
      const encodedMessage =
        encodeURIComponent(
          whatsappMessage
        );


      // WhatsApp URL
      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


      // Open WhatsApp
      window.open(
        whatsappURL,
        "_blank"
      );


      // Reset form after sending
      contactForm.reset();

    }
  );

}



  const mainImage =
    document.getElementById(
      "mainProductImage"
    );

  const thumbnails =
    document.querySelectorAll(
      ".thumbnail"
    );

  const prevButton =
    document.querySelector(
      ".prev-image"
    );

  const nextButton =
    document.querySelector(
      ".next-image"
    );

  if (
    mainImage &&
    thumbnails.length
  ) {

    let currentIndex = 0;

    const images =
      Array.from(thumbnails).map(
        function (thumbnail) {

          return thumbnail.dataset.image;

        }
      );

    function changeImage(index) {

      if (
        !mainImage ||
        images.length === 0
      ) {

        return;

      }

      if (index < 0) {

        index =
          images.length - 1;

      }

      if (index >= images.length) {

        index = 0;

      }

      currentIndex = index;

      mainImage.classList.add(
        "image-changing"
      );

      setTimeout(
        function () {

          mainImage.src =
            images[currentIndex];

          mainImage.classList.remove(
            "image-changing"
          );

        },
        200
      );

      thumbnails.forEach(
        function (thumbnail) {

          thumbnail.classList.remove(
            "active"
          );

        }
      );

      if (
        thumbnails[currentIndex]
      ) {

        thumbnails[
          currentIndex
        ].classList.add(
          "active"
        );

      }

    }

    thumbnails.forEach(
      function (
        thumbnail,
        index
      ) {

        thumbnail.addEventListener(
          "click",
          function () {

            changeImage(index);

          }
        );

      }
    );

    if (nextButton) {

      nextButton.addEventListener(
        "click",
        function () {

          changeImage(
            currentIndex + 1
          );

        }
      );

    }

    if (prevButton) {

      prevButton.addEventListener(
        "click",
        function () {

          changeImage(
            currentIndex - 1
          );

        }
      );

    }

    document.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "ArrowLeft") {

          changeImage(
            currentIndex + 1
          );

        }

        if (event.key === "ArrowRight") {

          changeImage(
            currentIndex - 1
          );

        }

      }
    );

  }

  const whatsappOrderBtn =
    document.getElementById(
      "whatsappOrderBtn"
    );

  if (whatsappOrderBtn) {

    whatsappOrderBtn.addEventListener(
      "click",
      function () {

        const whatsappNumber =
          "201XXXXXXXXX";

        const productTitle =
          document.querySelector(
            ".product-title"
          );

        const productName =
          productTitle
            ? productTitle.textContent.trim()
            : "المنتج";

        const productPrice =
          document.querySelector(
            ".product-price-box strong"
          );

        const price =
          productPrice
            ? productPrice.textContent.trim()
            : "";

        const message =
`مرحباً، أرغب في طلب المنتج التالي:

المنتج: ${productName}

السعر: ${price}

أرغب في معرفة التفاصيل وإتمام الطلب.`;

        const encodedMessage =
          encodeURIComponent(
            message
          );

        const whatsappURL =
          `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(
          whatsappURL,
          "_blank"
        );

      }
    );

  }

  const products =
    document.querySelectorAll(
      ".product-item"
    );

  const filterButtons =
    document.querySelectorAll(
      ".category-filter-btn"
    );

  const categoryTitle =
    document.getElementById(
      "categoryTitle"
    );

  const categoryDescription =
    document.getElementById(
      "categoryDescription"
    );

  const noProducts =
    document.getElementById(
      "noProducts"
    );

  if (
    products.length &&
    filterButtons.length
  ) {

    const categories = {

      all: {

        title:
          "جميع المنتجات",

        description:
          "اكتشف مجموعتنا المميزة من العطور وخدمات السبا والتجميل."

      },

      perfumes: {

        title:
          "العطور",

        description:
          "مجموعة فاخرة ومميزة من العطور المختارة بعناية."

      },

      spa: {

        title:
          "خدمات SPA",

        description:
          "تجربة استرخاء وعناية متكاملة للجسم والروح."

      },

      beauty: {

        title:
          "التجميل والبلاستيك",

        description:
          "خدمات تجميل متقدمة تجمع بين الخبرة والنتائج الطبيعية."

      }

    };

    const urlParams =
      new URLSearchParams(
        window.location.search
      );

    let currentCategory =
      urlParams.get(
        "category"
      ) || "all";

    if (
      !categories[currentCategory]
    ) {

      currentCategory =
        "all";

    }

    function updatePage(
      category
    ) {

      let visibleProducts = 0;

      products.forEach(
        function (product) {

          const productCategory =
            product.dataset.category;

          if (
            category === "all" ||
            productCategory === category
          ) {

            product.style.display =
              "";

            visibleProducts++;

            setTimeout(
              function () {

                product.classList.add(
                  "show"
                );

              },
              50
            );

          } else {

            product.style.display =
              "none";

            product.classList.remove(
              "show"
            );

          }

        }
      );

      if (categoryTitle) {

        categoryTitle.textContent =
          categories[
            category
          ].title;

      }

      if (categoryDescription) {

        categoryDescription.textContent =
          categories[
            category
          ].description;

      }

      filterButtons.forEach(
        function (button) {

          button.classList.remove(
            "active"
          );

          if (
            button.dataset.filter ===
            category
          ) {

            button.classList.add(
              "active"
            );

          }

        }
      );

      if (noProducts) {

        if (
          visibleProducts === 0
        ) {

          noProducts.classList.add(
            "show"
          );

        } else {

          noProducts.classList.remove(
            "show"
          );

        }

      }

    }

    filterButtons.forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            const category =
              button.dataset.filter;

            if (
              category === "all"
            ) {

              return;

            }

            updatePage(
              category
            );

          }
        );

      }
    );

    updatePage(
      currentCategory
    );

  }
/* =========================================
   Floating WhatsApp
========================================= */

const floatingWhatsapp =
  document.querySelector(".floating-whatsapp");

const floatingWhatsappBtn =
  document.getElementById("floatingWhatsappBtn");

const whatsappMenu =
  document.getElementById("whatsappMenu");

const whatsappServices =
  document.querySelectorAll(".whatsapp-service");


if (
  floatingWhatsapp &&
  floatingWhatsappBtn
) {

  /* Open / Close Menu */

  floatingWhatsappBtn.addEventListener(
    "click",
    function (e) {

      e.stopPropagation();

      floatingWhatsapp.classList.toggle(
        "active"
      );

    }
  );


  /* Service Numbers */

  const serviceNumbers = {

    "عطور": "966564014040",

    "سبا": "966507142569",

    "Plastic": "966553033346"

  };


  /* Service Click */

  whatsappServices.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function () {

          const service =
            button.dataset.service;

          const whatsappNumber =
            serviceNumbers[service];


          if (!whatsappNumber) {
            return;
          }


          const whatsappMessage =
`مرحباً 👋

أرغب في التواصل مع قسم ${service}.

تم التواصل من خلال موقع Velora.`;


          const encodedMessage =
            encodeURIComponent(
              whatsappMessage
            );


          const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


          window.open(
            whatsappURL,
            "_blank"
          );


          /* Close Menu */

          floatingWhatsapp.classList.remove(
            "active"
          );

        }
      );

    }
  );


  /* Close when clicking outside */

  document.addEventListener(
    "click",
    function (e) {

      if (
        !floatingWhatsapp.contains(e.target)
      ) {

        floatingWhatsapp.classList.remove(
          "active"
        );

      }

    }
  );

}
/* =========================================
   Back To Top
========================================= */

const backToTop =
  document.getElementById("backToTop");


if (backToTop) {

  // Show button after scrolling
  window.addEventListener(
    "scroll",
    function () {

      if (window.scrollY > 400) {

        backToTop.classList.add("show");

      } else {

        backToTop.classList.remove("show");

      }

    }
  );


  // Scroll to top
  backToTop.addEventListener(
    "click",
    function () {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: false,
  offset: 100
});
});

