import Request from './request.js';
import Slide from './slide.js';

export default class Layout {
    constructor() {
        this.request = new Request();
    }

    renderLayout() {
        const header = document.createElement('header');
        const main = document.createElement('main');
        const footer = document.createElement('footer');
        const searchSection = document.createElement('section');
        const span = document.createElement('span');
        const input = document.createElement('input');
        const videosSection = document.createElement('section');
        const wrapper = document.createElement('div');
        const pagingSection = document.createElement('section');
        const ul = document.createElement('ul');

        document.querySelector('body').appendChild(header);
        header.appendChild(searchSection);
        searchSection.classList.add('search-section');
        span.classList.add('fa', 'fa-search', 'lamp');
        input.setAttribute('type', 'text');
        input.classList.add('search');
        input.setAttribute('autofocus', true);
        searchSection.appendChild(span);
        searchSection.appendChild(input);

        document.querySelector('body').appendChild(main);
        main.appendChild(videosSection);
        videosSection.classList.add('videos');
        wrapper.classList.add('wrapper');
        videosSection.appendChild(wrapper);

        pagingSection.classList.add('paging');
        ul.classList.add('pages');
        pagingSection.appendChild(ul);
        document.querySelector('body').appendChild(footer);
        footer.appendChild(pagingSection);
    }

    renderFirstSlides() {
        Layout.height = true;
        this.renderSlide(0);
        document.querySelector('.pages li').className = 'active';
    }

    renderSlide(index) {
        const sectionSlide = document.createElement('section');
        const divComponent = document.createElement('div');
        const h3 = document.createElement('h3');
        const a = document.createElement('a');
        const img = document.createElement('img');
        const ul = document.createElement('ul');
        let li = document.createElement('li');
        let p = document.createElement('p');
        let span = document.createElement('span');
        const pageDescription = document.createElement('p');
        const page = document.createElement('li');
        const coverPreview = document.createElement('div');

        sectionSlide.classList.add('slide');
        sectionSlide.setAttribute('style', 'left: 0px');
        divComponent.classList.add('component');
        a.classList.add('title');
        h3.appendChild(a);
        divComponent.appendChild(h3);

        coverPreview.classList.add('coverPreview');
        img.classList.add('preview');
        span.classList.add('fa', 'fa-youtube-play');
        coverPreview.appendChild(img);
        coverPreview.appendChild(span);
        divComponent.appendChild(coverPreview);

        ul.classList.add('info');
        span = document.createElement('span');
        span.classList.add('fa', 'fa-user-circle');
        p.classList.add('author');
        li.appendChild(span);
        li.appendChild(p);
        ul.appendChild(li);

        li = document.createElement('li');
        span = document.createElement('span');
        span.classList.add('fa', 'fa-calendar-o');
        p = document.createElement('p');
        p.classList.add('date');
        li.appendChild(span);
        li.appendChild(p);
        ul.appendChild(li);

        li = document.createElement('li');
        span = document.createElement('span');
        span.classList.add('fa', 'fa-eye');
        p = document.createElement('p');
        p.classList.add('viewers');
        li.appendChild(span);
        li.appendChild(p);
        ul.appendChild(li);
        divComponent.appendChild(ul);

        pageDescription.classList.add('description');
        divComponent.appendChild(pageDescription);

        for (let i = 0; i < Request.videosCount; i++) {
            sectionSlide.appendChild(divComponent.cloneNode(true));
        }

        document.querySelector('.wrapper').appendChild(sectionSlide);
        page.innerHTML = index + 1;
        document.querySelector('.pages').appendChild(page);

        if (Layout.height) {
            document.querySelector('.videos').style.height = document.querySelector('.component').offsetHeight + 60 + 'px';
            Layout.height = false;
        }
    }

    addNewSlide() {
        if (Request.isSearchText()) {
            this.renderSlide(Slide.slidePos.length);
            const slides = document.querySelectorAll('.slide');
            const left = Slide.slidePos[Slide.slidePos.length - 1] + window.innerWidth;
            slides[slides.length - 1].style.left = left + 'px';
            Slide.slidePos.push(parseInt(slides[slides.length - 1].style.left));
            this.request.newRequest();
        }
    }
}
