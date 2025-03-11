class Carousel {
    #pauseOnHover;
    #restartTimeout;
    #autoScrollInterval;
    #activeSlide = 1;
    #allowUserScroll;
    #interval;

    constructor(id, options) {
        this.targetElement = document.getElementById(id);
        this.#autoScrollInterval = options.autoScrollInterval ?? 4000;
        this.#pauseOnHover = options.pauseOnHover ?? true;
        this.#restartTimeout = options.restartTimeout ?? 1000;
        this.#allowUserScroll = options.allowUserScroll ?? true;

        this.#addClasses();
    }

    #addClasses() {
        if (this.targetElement) {
            const carouselItems = this.targetElement.querySelectorAll(":scope > *");
            const addCarouselItemsClassnames = (carouselItem) => {
                carouselItem.classList.add("snap-center", "snap-always", "w-full", "min-w-full", "max-w-full");
            };

            this.#allowUserScroll === true
                ? this.targetElement.classList.add("overflow-x-auto")
                : this.targetElement.classList.add("overflow-x-hidden");
            this.targetElement.classList.add("snap-x", "snap-mandatory", "max-w-full", "flex", "items-center");
            carouselItems.forEach(addCarouselItemsClassnames);
        }
    }

    #pauseAutoScroll() {
        if (this.#interval) clearInterval(this.#interval);
    }

    #restartAutoScroll() {
        if (this.targetElement) {
            const singleFrameWidth = this.targetElement.clientWidth;

            setTimeout(() => {
                this.#interval = setInterval(() => {
                    if (this.#activeSlide > this.targetElement.childElementCount) this.#activeSlide = 1;

                    this.targetElement.scroll({ left: singleFrameWidth * (this.#activeSlide - 1), behavior: "smooth" });
                    this.#activeSlide++;
                }, this.#autoScrollInterval);
            }, this.#restartTimeout);
        }
    }

    start() {
        if (this.targetElement) {
            const singleFrameWidth = this.targetElement.clientWidth;

            if (this.#interval) clearInterval(this.#interval);

            this.#interval = setInterval(() => {
                if (this.#activeSlide > this.targetElement.childElementCount) this.#activeSlide = 1;

                this.targetElement.scroll({ left: singleFrameWidth * (this.#activeSlide - 1), behavior: "smooth" });
                this.#activeSlide++;
            }, this.#autoScrollInterval);

            if (this.#pauseOnHover === true) {
                this.targetElement.addEventListener("mouseenter", () => this.#pauseAutoScroll());
                this.targetElement.addEventListener("mouseleave", () => this.#restartAutoScroll());
            }
        }
    }
}
