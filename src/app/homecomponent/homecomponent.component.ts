import { Component, OnInit, AfterViewInit } from '@angular/core';
import AOS from 'aos';
import GLightbox from 'glightbox';
import Swiper from 'swiper';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

@Component({
  selector: 'app-homecomponent',
  standalone: true,
  templateUrl: './homecomponent.component.html',
  styleUrls: ['./homecomponent.component.scss']
})
export class HomecomponentComponent implements OnInit, AfterViewInit {

  ngOnInit() {
    window.addEventListener('scroll', this.toggleScrolled);
    window.addEventListener('load', this.toggleScrolled);

    window.addEventListener('load', this.toggleScrollTop);
    document.addEventListener('scroll', this.toggleScrollTop);

    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
      });
    }

    document.querySelectorAll('#navmenu a').forEach(link => {
      link.addEventListener('click', () => {
        if (document.body.classList.contains('mobile-nav-active')) {
          mobileNavToggleBtn?.dispatchEvent(new Event('click'));
        }
      });
    });
  }

  ngAfterViewInit() {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true, mirror: false });
    GLightbox({ selector: '.glightbox' });
    this.initSwiper();
    this.initIsotope();

    document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach(el => {
      el.addEventListener('click', () => {
        el.parentElement?.classList.toggle('faq-active');
      });
    });

    this.navmenuScrollspy();
    this.initSlider();
  }

  private toggleScrolled = () => {
    const header = document.querySelector('#header');
    if (!header) return;
    if (!header.classList.contains('scroll-up-sticky') &&
        !header.classList.contains('sticky-top') &&
        !header.classList.contains('fixed-top')) return;

    document.body.classList.toggle('scrolled', window.scrollY > 100);
  };

  private toggleScrollTop = () => {
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      scrollTop.classList.toggle('active', window.scrollY > 100);
    }
  };

  private initSwiper() {
    document.querySelectorAll<HTMLElement>('.init-swiper').forEach(el => {
      const configEl = el.querySelector('.swiper-config');
      if (!configEl) return;
      const config = JSON.parse(configEl.innerHTML.trim());
      new Swiper(el, config);
    });
  }

  private initIsotope() {
    document.querySelectorAll<HTMLElement>('.isotope-layout').forEach(isotopeItem => {
      const layout = isotopeItem.getAttribute('data-layout') as 'masonry' | 'fitRows' | 'vertical' || 'masonry';
      const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
      let initIsotope: any;

      imagesLoaded(isotopeItem.querySelector('.isotope-container') as HTMLElement, () => {
        initIsotope = new Isotope(
          isotopeItem.querySelector('.isotope-container') as HTMLElement,
          {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter,
            sortBy: sort
          }
        );
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(btn => {
        btn.addEventListener('click', () => {
          isotopeItem.querySelector('.filter-active')?.classList.remove('filter-active');
          btn.classList.add('filter-active');
          initIsotope.arrange({ filter: btn.getAttribute('data-filter') });
          AOS.refresh();
        });
      });
    });
  }

  private navmenuScrollspy() {
    const links = document.querySelectorAll<HTMLAnchorElement>('.navmenu a');
    const spy = () => {
      links.forEach(link => {
        if (!link.hash) return;
        const section = document.querySelector(link.hash) as HTMLElement | null;
        if (!section) return;
        const pos = window.scrollY + 200;
        if (pos >= section.offsetTop && pos <= section.offsetTop + section.clientHeight) {
          document.querySelectorAll('.navmenu a.active').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };
    window.addEventListener('load', spy);
    document.addEventListener('scroll', spy);
  }

  private initSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentIndex = 0;

    const showSlide = (index: number) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    };

    nextBtn?.addEventListener('click', nextSlide);
    prevBtn?.addEventListener('click', prevSlide);

    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);
  }
}