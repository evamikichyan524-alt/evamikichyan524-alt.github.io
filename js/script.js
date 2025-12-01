const htmlElement = document.documentElement;
const toggleLight = document.querySelector('.dropdown-item.light');
const toggleDark = document.querySelector('.dropdown-item.dark');

const toggleTheme = (button, theme) => {

  if (theme !== "light" && theme !== "dark") {
    throw new Error("Invalid theme mode");
  }

  button.addEventListener("click", () => {
    localStorage.setItem("theme", theme);
    htmlElement.dataset.theme = localStorage.getItem("theme");
  });

  return `Theme color toggle to ${theme} successfully`;
}

!function () {
  htmlElement.dataset.theme = localStorage.getItem("theme") || "light";
  toggleTheme(toggleLight, "light");
  toggleTheme(toggleDark, "dark");
}();

const sculptures = [
  {
    title: "Հնչունային համակարգ",
    description: `Հայերենը հնչունաբանական համակարգ ունեցող, որտեղ յուրաքանչյուր տառ հիմնականում համապատասխանում է մեկ հնչյունի։ Հայոց լեզվում հնչյունները բաժանվում են երկու խմբի՝`
  },
  {
    title: "Ձայնավորներ",
    description: `Դրանք արտաբերվում են առանց խանգարումների և կազմում են վանկի հիմքը։ Հայերենում կա վեց ձայնավոր հնչյուն՝ ա, օ, ու, ի, է, ը։`
  },
  {
    title: "Բաղաձայններ",
    description: `Դրանք տարբերվում են արգելքներով՝ շուրթերի, լեզվի, ատամների և քմի մասնակցությամբ։`
  },
  {
    title: "Բաղաձայնները բաժանվում են՝",
    list: [
      "պայթյունայիններ (բ, պ, դ, տ, գ, կ)",
      "շնչեղներ (փ, թ, խ)",
      "նազալներ (մ, ն)",
      "շրթնայիններ և ատամնայիններ (վ, ֆ, ս, զ, ձ, ծ, ց)",
      "հնչեղներ (ր, լ, ղ, ժ, շ, չ, ջ, հ)"
    ]
  }
];


const modalContent = document.querySelector('.modal-content');

document.querySelectorAll('.swiper-slide.card').forEach((card, index) => {
  card.addEventListener('click', () => {
    const sculpture = sculptures[index];
    modalContent.innerHTML = '';

    // Close button
    const modalClose = document.createElement('span');
    modalClose.className = 'modal-close';
    modalClose.innerHTML = '&times;';
    modalClose.style.cssText = `
      cursor: pointer;
      position: absolute;
      top: 15px;
      right: 20px;
      font-size: 32px;
      font-weight: 400;
      color: var(--color);
    `;
    modalContent.appendChild(modalClose);

    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflowY = '';
    });

    // Title
    const titleEl = document.createElement('h2');
    titleEl.textContent = sculpture.title;
    titleEl.style.marginTop = '40px';
    modalContent.appendChild(titleEl);

    // Description (if exists)
    if (sculpture.description) {
      const descEl = document.createElement('p');
      descEl.textContent = sculpture.description;
      modalContent.appendChild(descEl);
    }

    // List (if exists)
    if (sculpture.list) {
      const ul = document.createElement('ul');
      sculpture.list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
      modalContent.appendChild(ul);
    }

    modal.style.display = 'flex';
    document.body.style.overflowY = 'hidden';
  });
});

// Close outside modal
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflowY = '';
  }
});

// Swiper
new Swiper('.swiper', {
  slidesPerView: 3,
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  breakpoints: {
    768: { slidesPerView: 3 },
    425: { slidesPerView: 2 },
    320: { slidesPerView: 1 }
  }
});
