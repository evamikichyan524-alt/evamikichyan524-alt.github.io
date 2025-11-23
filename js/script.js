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
    isAlone: true,
    title: "Introduction",
    img: "media/images/sculpture-card-1.jpg",
    description: `Sculpture is an art that makes three-dimensional (3D) shapes.
Artists who make sculptures are called sculptors.
They use materials like stone, wood, clay, or metal.
Some sculptures stand alone, and some are part of buildings or walls.
People make sculptures to show beauty, remember heroes, or decorate places.
Sculpture is an important part of art and culture around the world.`,
  },
  {
    isAlone: true,
    title: "Sculpture Groups",
    img: "media/images/sculpture-card-2.jpg",
    description: `Sculpture is divided into three groups: monumental, machine-made, and decorative. The purpose of monumental sculpture is to perpetuate memory, it is mainly placed in public places. Machine sculpture has no connection with the natural environment, it is placed in museums, and decorative sculpture is a means of decoration.`,
  },
  {
    isAlone: true,
    title: "Types of Sculpture",
    img: "media/images/sculpture-card-3.jpg",
    description: `1. Round sculpture – You can look at it from all sides. (like a statue) 2. Relief sculpture – It is part of a wall and you see it from the front.`,
  },
  {
    isAlone: true,
    title: "Why People Make Sculptures",
    img: "media/images/sculpture-card-4.jpg",
    description: `• To show people or animals.
• To remember important persons or events.
• To decorate cities, parks, or buildings`,
  },
  {
    isAlone: false,
    title: "Famous Sculptures in Armenia",
    img: "media/images/sculpture-card-5.jpg",
    sculptures: [
      {
        title: `Mother Armenia (Մայր Հայաստան)`,
        img: "media/images/sculpture-card-5.jpg",
        description: `Mother Armenia is a big statue in Yerevan.
It shows a strong woman with a sword.
She symbolizes peace and protection of the country.
The statue was made by Ara Harutyunyan.`,
      },
      {
        title: `David of Sassoun (Սասունցի Դավիթ)`,
        img: "media/images/sculpture-card-6.jpg",
        description: `This statue shows David, a hero from Armenian legend.
He rides his horse, Kurkik Jalali.
It is in front of Yerevan Railway Station.
The sculptor is Yervand Kochar.`,
      },
      {
        title: `Komitas Statue (Կոմիտաս Վարդապետ)`,
        img: "media/images/sculpture-card-7.jpg",
        description: `The statue of Komitas is in Yerevan.
It honors the great Armenian composer and priest.
It shows him sitting and thinking about his music.`,
      },
    ],
  },
  {
    isAlone: true,
    title: "Epilogue",
    img: "media/images/sculpture-card-8.jpg",
    description: `Sculpture is a wonderful form of art.
It helps people express feelings and ideas through shapes.
Sculpture is not just stone or metal — it is art that lives forever.
It shows the history, beauty, and spirit of people.
Every sculpture has a story.
It speaks without words and connects us to our past and future.
Sculpture will always be an important part of human art and culture.`,
  }
];

const modalContent = document.querySelector('.modal-content');

document.querySelectorAll('#sculpture-carousel .swiper-slide.card').forEach((card, index) => {
  card.addEventListener('click', () => {
    const sculpture = sculptures[index];
    modalContent.innerHTML = '';
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

    // Close listener
    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflowY = '';
    });

    // Modal վերնագիր
    const titleEl = document.createElement('h2');
    titleEl.textContent = sculpture.title;
    titleEl.style.marginTop = '40px';
    modalContent.appendChild(titleEl);

    if (sculpture.isAlone) {
      const imgEl = document.createElement('img');
      imgEl.src = sculpture.img;
      imgEl.alt = sculpture.title;
      imgEl.style.cssText = "width:100%; max-height:300px; object-fit:cover; margin-bottom:15px; border-radius:5px;";
      modalContent.appendChild(imgEl);

      const descEl = document.createElement('p');
      descEl.textContent = sculpture.description;
      modalContent.appendChild(descEl);
    } else {
      sculpture.sculptures.forEach(s => {
        const block = document.createElement('div');
        block.style.marginBottom = '20px';

        const imgEl = document.createElement('img');
        imgEl.src = s.img;
        imgEl.alt = s.title;
        imgEl.style.cssText = "width:100%; max-height:300px; object-fit:cover; margin-bottom:5px; border-radius:5px;";
        block.appendChild(imgEl);

        const descEl = document.createElement('p');
        descEl.textContent = `${s.title}\n${s.description}`;
        block.appendChild(descEl);

        modalContent.appendChild(block);
      });
    }

    modal.style.display = 'flex';
    document.body.style.overflowY = 'hidden';

  });
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflowY = '';
  }
});

new Swiper('.swiper', {
  slidesPerView: 3,
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  breakpoints: {
    768: {
      slidesPerView: 3
    },
    425: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1
    }
  }
});