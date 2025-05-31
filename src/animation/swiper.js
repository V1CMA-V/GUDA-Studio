import Swiper from 'swiper'
import {
  Autoplay,
  Controller,
  EffectCreative,
  Pagination,
} from 'swiper/modules'

// Espera a que el DOM esté listo
setTimeout(() => {
  new Swiper('.swiper-container', {
    modules: [Pagination, Autoplay, EffectCreative],
    grabCursor: true,
    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    },
    loop: true,
    autoplay: {
      delay: 5000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  })
}, 0)

// Swiper TEAM
setTimeout(() => {
  new Swiper('.swiper-team', {
    modules: [Pagination, EffectCreative, Controller],
    grabCursor: true,
    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: ['-120%', 0, -500],
      },
      next: {
        shadow: true,
        translate: ['120%', 0, -500],
      },
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    controller: {
      control: '.swiper-team',
    },
  })
}, 0)
