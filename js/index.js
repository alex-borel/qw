import Layout from './layout.js';
import Slide from './slide.js';
import Request from './request.js';
import Resize from './resize.js';

class Main {
    constructor() {
        Main.render = new Layout();
        Main.request = new Request();
        Main.slide = new Slide();
        Main.resize = new Resize();
        Main.render.renderLayout();
        Main.slide.addListeners(Main.render);
    }

    addListeners() {
        document.querySelector('.search').addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                this.newSearch();
            }
        });
        document.querySelector('.lamp').addEventListener('click', () => this.newSearch());
    }

    newSearch() {
        Slide.slidePos = [0];
        Main.request.chooseVideosCount();
        document.querySelector('.wrapper').innerHTML = '';
        document.querySelector('.pages').innerHTML = '';
        Main.render.renderFirstSlides();
        Main.request.initialization(Main.render, Slide.slidePos);
        Slide.currentPage = 0;
    }
}

const main = new Main();
main.addListeners();
