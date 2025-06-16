import gsap from 'gsap'

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle')
  const menuOverlay = document.querySelector('.menu-overlay')
  const menuContent = document.querySelector('.menu-content')
  const menuPreviewImg = document.querySelector('.menu-preview-img')
  const menuLinks = document.querySelectorAll('.link a')
  const menuOpen = document.getElementById('menu-open')
  const menuClose = document.getElementById('menu-close')

  let isOpen = false
  let isAnimating = false

  gsap.from('#header', {
    y: -100,
    opacity: 0,
    duration: 1.25,
    delay: 1.5,
    ease: 'power4.out',
  })

  function handleOverlayClick(e) {
    if (isOpen && !isAnimating) closeMenu()
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape' && isOpen && !isAnimating) closeMenu()
  }

  menuOverlay.addEventListener('click', handleOverlayClick)
  document.addEventListener('keydown', handleKeyDown)

  function setAria(isOpen) {
    menuToggle.setAttribute('aria-expanded', isOpen)
    menuContent.setAttribute('aria-hidden', !isOpen)
    menuOverlay.setAttribute('aria-hidden', !isOpen)
  }

  menuToggle.setAttribute('tabindex', '0')
  menuToggle.setAttribute('role', 'button')
  menuToggle.setAttribute('aria-label', 'Abrir menú de navegación')
  setAria(false)

  menuToggle.addEventListener('click', () => {
    if (!isOpen) openMenu()
    else closeMenu()
  })

  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!isOpen) openMenu()
      else closeMenu()
    }
  })

  function cleanupPreviewImages() {
    const previewImages = menuPreviewImg.querySelectorAll('img')
    while (previewImages.length > 1) {
      menuPreviewImg.removeChild(previewImages[0])
    }
  }

  function resetPreviewImage() {
    menuPreviewImg.innerHTML = ''
    const defaultImg = document.createElement('img')
    defaultImg.src =
      'https://images.unsplash.com/photo-1748033766479-fa6b0f9f6b33?q=80&w=1974&auto=format&fit=crop'
    defaultImg.className =
      'w-full h-full object-cover absolute top-0 left-0 min-w-[200px] min-h-[300px] max-w-full max-h-full rounded-2xl'
    menuPreviewImg.appendChild(defaultImg)
  }

  function animateMenuToggle(isOpening) {
    gsap.to(isOpening ? menuOpen : menuClose, {
      x: isOpening ? -5 : 5,
      y: isOpening ? -10 : 10,
      rotation: isOpening ? -5 : 5,
      opacity: 0,
      delay: 0.25,
      duration: 0.5,
      ease: 'power2.out',
    })
    gsap.to(isOpening ? menuClose : menuOpen, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      delay: 0.5,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  function openMenu() {
    if (isAnimating || isOpen) return
    isAnimating = true
    setAria(true)
    animateMenuToggle(true)
    gsap.to(menuContent, {
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.25,
      ease: 'power4.inOut',
      onStart: () => menuContent.focus(),
    })
    gsap.to(['.link a', '.social a'], {
      y: '0%',
      opacity: 1,
      duration: 1,
      delay: 0.75,
      stagger: 0.1,
      ease: 'power3.out',
    })
    gsap.to(menuOverlay, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)',
      duration: 1.25,
      ease: 'power4.inOut',
      onComplete: () => {
        isOpen = true
        isAnimating = false
      },
    })
  }

  function closeMenu() {
    if (isAnimating || !isOpen) return
    isAnimating = true
    setAria(false)
    animateMenuToggle(false)
    gsap.to(menuContent, {
      rotation: -15,
      x: -100,
      y: -100,
      scale: 1.5,
      opacity: 0.25,
      duration: 1.25,
      ease: 'power4.inOut',
    })
    gsap.to(menuOverlay, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 1.25,
      ease: 'power4.inOut',
      onComplete: () => {
        isOpen = false
        isAnimating = false
        gsap.set(['.link a', '.social a'], { y: '120%' })
        resetPreviewImage()
        menuToggle.focus()
      },
    })
  }

  menuLinks.forEach((link) => {
    link.addEventListener('mouseover', () => {
      if (!isOpen || isAnimating) return
      const imgSrc = link.getAttribute('data-img')
      if (!imgSrc) return
      const previewImages = menuPreviewImg.querySelectorAll('img')
      const lastImg = previewImages[previewImages.length - 1]
      // Si ya está la imagen correcta, no hacer nada
      if (lastImg && lastImg.src.split('?')[0] === imgSrc.split('?')[0]) return
      // Crear nueva imagen y animar entrada
      const newPreviewImg = document.createElement('img')
      newPreviewImg.src = imgSrc
      newPreviewImg.style.opacity = 0
      newPreviewImg.style.transform = 'scale(1.15) rotate(8deg)'
      newPreviewImg.className =
        'w-full h-full object-cover absolute top-0 left-0 min-w-[200px] min-h-[300px] max-w-full max-h-full rounded-2xl'
      menuPreviewImg.appendChild(newPreviewImg)
      // Animar salida de la anterior (si existe)
      if (lastImg) {
        gsap.to(lastImg, {
          opacity: 0,
          scale: 1.05,
          rotation: 4,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            if (lastImg !== newPreviewImg && lastImg.parentNode) {
              lastImg.parentNode.removeChild(lastImg)
            }
          },
        })
      }
      // Animar entrada de la nueva
      gsap.to(newPreviewImg, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    })

    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href')
      const isExternal = href.startsWith('http') || href.startsWith('mailto:')
      if (isExternal) return

      e.preventDefault()

      if (isOpen && !isAnimating) {
        closeMenu()
        setTimeout(() => {
          window.location.href = href
        }, 1300)
      } else {
        window.location.href = href
      }
    })
  })

  resetPreviewImage()
  gsap.set(['.link a', '.social a'], { y: '120%' })
})
