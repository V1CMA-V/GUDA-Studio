import Swiper from 'swiper'
import {
  Autoplay,
  EffectCreative,
  Navigation,
  Pagination,
} from 'swiper/modules'

// Swiper de Eventos (Sección principal del Bento)
setTimeout(() => {
  new Swiper('.swiper-container', {
    modules: [Pagination, Autoplay, EffectCreative],
    effect: 'creative',
    loop: true,
    grabCursor: true,
    speed: 600,
    autoplay: {
      delay: 8000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    creativeEffect: {
      prev: {
        translate: ['-5%', 0, -40],
        scale: 0.96,
        opacity: 0.75,
      },
      next: {
        translate: ['5%', 0, -40],
        scale: 0.96,
        opacity: 0.75,
      },
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })
}, 0)

// Swiper de Instructores (Team)
setTimeout(() => {
  new Swiper('.swiper-team', {
    modules: [Pagination, EffectCreative, Navigation],
    effect: 'creative',
    loop: true,
    grabCursor: true,
    speed: 500,
    creativeEffect: {
      prev: {
        translate: ['-4%', 0, -20],
        scale: 0.98,
        opacity: 0.85,
      },
      next: {
        translate: ['4%', 0, -20],
        scale: 0.98,
        opacity: 0.85,
      },
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next-team',
      prevEl: '.swiper-button-prev-team',
    },
  })
}, 0)
