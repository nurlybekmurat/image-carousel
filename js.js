const debounce = (callback, timeoutDelay = 300) => {
    let timeoutId;

    return (...rest) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    };
};

let counter = 0;

const images = [
    'https://picsum.photos/id/237/720/360',
    'https://picsum.photos/id/238/720/360',
    'https://picsum.photos/id/239/720/360',
    'https://picsum.photos/id/240/720/360',
    'https://picsum.photos/id/241/720/360',
];

const carouselBullets = document.querySelector('.carousel-bullets');
const imageBg = document.querySelector('.carousel-image');

imageBg.style.backgroundImage = `url(${images[counter]})`;

for (let i = 0; i < images.length; i++) {
    const bullet = document.createElement('div');
    bullet.classList.add('carousel-bullets__item');
    bullet.dataset.id = i;
    carouselBullets.append(bullet);
}

const bullets = document.querySelectorAll('.carousel-bullets__item');
bullets[counter].classList.add('carousel-bullets__item--active');

const bulletHandler = (evt) => {
    counter = evt.currentTarget.dataset.id;
    imageBg.style.backgroundImage = `url(${images[counter]})`;
    bullets.forEach((bullet) => {
        bullet.classList.remove('carousel-bullets__item--active');
    });
    bullets[counter].classList.add('carousel-bullets__item--active');
};

bullets.forEach((bullet) => {
    bullet.addEventListener('click', bulletHandler);
});

const carouselHandler = (evt) => {
    if (evt.target.classList.contains('carousel__button--left')) {
        if (counter === 0) {
            counter = images.length - 1;
        } else {
            counter--;
        }
        imageBg.style.backgroundImage = `url(${images[counter]})`;
        bullets.forEach((bullet) => {
            bullet.classList.remove('carousel-bullets__item--active');
        });
        bullets[counter].classList.add('carousel-bullets__item--active');
    } else if (evt.target.classList.contains('carousel__button--right')) {
        if (counter === images.length - 1) {
            counter = 0;
        } else {
            counter++;
        }
        imageBg.style.backgroundImage = `url(${images[counter]})`;
        bullets.forEach((bullet) => {
            bullet.classList.remove('carousel-bullets__item--active');
        });
        bullets[counter].classList.add('carousel-bullets__item--active');
    }
};

const btns = document.querySelectorAll('.carousel__button');
btns.forEach((btn) => {
    btn.addEventListener('click', debounce(carouselHandler));
});
