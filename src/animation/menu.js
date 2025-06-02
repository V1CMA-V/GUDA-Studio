import { gsap } from 'gsap';

export function initMenuAnimation() {
  const menuToggle = document.getElementById('menu-toggle');
  const fullscreenMenu = document.getElementById('fullscreen-menu');
  const menuItems = document.querySelectorAll('.menu-item');
  const menuHeader = document.querySelector('.menu-header');
  const menuSocial = document.querySelector('.menu-social');
  const menuDecorations = document.querySelectorAll('.menu-decoration');
  const menuLines = document.querySelectorAll('.line');
  
  // Initial state
  gsap.set(fullscreenMenu, { 
    visibility: 'hidden',
    opacity: 0,
    clipPath: 'circle(0% at top right)'
  });
  
  gsap.set(menuItems, { 
    y: 100,
    opacity: 0
  });
  
  gsap.set(menuHeader, {
    opacity: 0,
    y: -50
  });
  
  gsap.set(menuSocial, {
    opacity: 0,
    y: 30
  });
  
  gsap.set(menuDecorations, {
    scale: 0,
    opacity: 0
  });
  
  let menuOpen = false;
  
  menuToggle?.addEventListener('click', () => {
    menuOpen = !menuOpen;
    
    if (menuOpen) {
      openMenu({fullscreenMenu, menuItems, menuHeader, menuSocial, menuDecorations, menuLines});
    } else {
      closeMenu({fullscreenMenu, menuItems, menuHeader, menuSocial, menuDecorations, menuLines});
    }
  });
  
  // Close menu when clicking on menu items
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      if (menuOpen) {
        menuOpen = false;
        closeMenu({fullscreenMenu, menuItems, menuHeader, menuSocial, menuDecorations, menuLines});
      }
    });
  });
}

function openMenu({fullscreenMenu, menuItems, menuHeader, menuSocial, menuDecorations, menuLines}) {
  // Open menu animation
  gsap.set(fullscreenMenu, { visibility: 'visible' });
  
  // Animate menu background with more advanced effects
  gsap.to(fullscreenMenu, {
    clipPath: 'circle(150% at top right)',
    opacity: 1,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  // Animate menu header
  gsap.to(menuHeader, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'back.out(1.7)',
    delay: 0.2
  });
  
  // Animate menu items with more interesting effect
  gsap.to(menuItems, {
    y: 0,
    opacity: 1,
    stagger: 0.08,
    duration: 0.7,
    ease: 'back.out(1.7)',
    delay: 0.3
  });
  
  // Add a slight rotation to menu items for extra flair
  gsap.from(menuItems, {
    rotateX: -15,
    duration: 0.7,
    stagger: 0.08,
    delay: 0.3
  });
  
  // Animate social icons
  gsap.to(menuSocial, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'back.out(1.7)',
    delay: 0.6
  });
  
  // Animate decorative elements
  gsap.to(menuDecorations, {
    scale: 1,
    opacity: 0.6,
    stagger: 0.2,
    duration: 1,
    ease: 'elastic.out(1, 0.3)',
    delay: 0.4
  });
  
  // Create floating animation for decorations
  menuDecorations.forEach((decoration, index) => {
    gsap.to(decoration, {
      y: index % 2 === 0 ? '-=20' : '+=20',
      x: index % 3 === 0 ? '+=15' : '-=15', 
      duration: 3 + index,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.5 + (index * 0.2)
    });
  });
  
  // Animate hamburger to X
  gsap.to(menuLines[0], {
    rotate: 45,
    y: 8,
    width: '32px',
    marginLeft: 0,
    duration: 0.3
  });
  
  gsap.to(menuLines[1], {
    rotate: -45,
    y: 0,
    width: '32px',
    marginLeft: 0,
    duration: 0.3
  });
  
  // Enable pointer events
  fullscreenMenu.classList.add('active');
}

function closeMenu({fullscreenMenu, menuItems, menuHeader, menuSocial, menuDecorations, menuLines}) {
  // Kill any floating animations
  gsap.killTweensOf(menuDecorations);
  
  // Animate menu items out
  gsap.to(menuItems, {
    y: -50,
    opacity: 0,
    stagger: 0.05,
    duration: 0.4,
    ease: 'power2.in'
  });
  
  // Animate menu header out
  gsap.to(menuHeader, {
    opacity: 0,
    y: -30,
    duration: 0.3,
    ease: 'power2.in'
  });
  
  // Animate social icons out
  gsap.to(menuSocial, {
    opacity: 0,
    y: 30,
    duration: 0.3,
    ease: 'power2.in'
  });
  
  // Animate decorative elements out
  gsap.to(menuDecorations, {
    scale: 0,
    opacity: 0,
    stagger: 0.1,
    duration: 0.4,
    ease: 'power3.in'
  });
  
  // Animate menu background
  gsap.to(fullscreenMenu, {
    clipPath: 'circle(0% at top right)',
    opacity: 0,
    duration: 0.7,
    ease: 'power3.in',
    onComplete: () => {
      gsap.set(fullscreenMenu, { visibility: 'hidden' });
    }
  });
  
  // Animate X back to hamburger
  gsap.to(menuLines[0], {
    rotate: 0,
    y: 0,
    width: '32px',
    duration: 0.3
  });
  
  gsap.to(menuLines[1], {
    rotate: 0,
    y: 0,
    width: '24px',
    marginLeft: '8px',
    duration: 0.3
  });
  
  // Disable pointer events
  fullscreenMenu.classList.remove('active');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initMenuAnimation);
