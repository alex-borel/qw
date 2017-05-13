import Request from './request.js';
import Layout from './layout.js';
import Slide from './slide.js';

export default class Resize {
    constructor() {
        Resize.render = new Layout();
        window.onresize = function() {
            if (document.querySelector('.wrapper').innerHTML !== '') {
                const videosCount = Request.videosCount;

                if (window.innerWidth > 1600) {
                    if (Request.videosCount !== 4) {
                        Request.videosCount = 4;
                        Resize.rerendering(4, videosCount);
                    }
                } else if (window.innerWidth > 1250) {
                    if (Request.videosCount !== 3) {
                        Request.videosCount = 3;
                        Resize.rerendering(3, videosCount);
                    }
                } else if (window.innerWidth > 930) {
                    if (Request.videosCount !== 2) {
                        Request.videosCount = 2;
                        Resize.rerendering(2, videosCount);
                    }
                } else if (window.innerWidth < 930) {
                    if (Request.videosCount !== 1) {
                        Request.videosCount = 1;
                        Resize.rerendering(1, videosCount);
                    }
                }

                Resize.changeSlidesPosition();
            }
        };
    }

    static changeSlidesPosition() {
        const width = window.innerWidth;
        const slides = document.querySelectorAll('.slide');
        let leftPos = (-1) * Slide.currentPage * width;
        Slide.slidePos = [];

        for (let i = 0; i < slides.length; i++) {
            Slide.slidePos.push(leftPos);
            slides[i].style.left = leftPos + 'px';
            leftPos += width;
        }
    }

    static rerendering(count, previousCount) {
        const components = Array.from(document.querySelectorAll('.component'));
        const docFragment = document.createDocumentFragment();
        const length = components.length / count;
        let offset = 0;

        components.reverse();
        document.querySelector('.wrapper').innerHTML = '';
        document.querySelector('.pages').innerHTML = '';
        Slide.slidePos = [];
        Request.pageNumber = -1;

        for (let i = 0; i < Math.floor(length); i++) {
            const sectionSlide = document.createElement('section');
            const page = document.createElement('li');

            Request.pageNumber++;
            sectionSlide.className = 'slide';
            sectionSlide.setAttribute('style', 'left:' + offset + 'px');
            Slide.slidePos.push(offset);
            for (let j = 0; j < count; j++) {
                if (components.length) {
                    sectionSlide.appendChild(components[components.length - 1]);
                    components.pop();
                }
            }
            offset += window.innerWidth;
            docFragment.appendChild(sectionSlide);

            page.innerHTML = i + 1;
            document.querySelector('.pages').appendChild(page);
        }

        document.querySelector('.wrapper').appendChild(docFragment);

        const targetIndex = Math.floor(previousCount * Slide.currentPage / count);
        document.querySelectorAll('.pages li')[targetIndex].click();
        if (!targetIndex) {
            setTimeout(function() {
                document.querySelectorAll('.pages li')[targetIndex].click();
            }, 0);
            document.querySelector('.pages li').className = 'active';
        }
    }
}
