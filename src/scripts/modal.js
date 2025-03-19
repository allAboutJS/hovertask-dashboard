class Modal {
    #modalContentElem;
    #triggerElems = [];
    #closeBtn = document.createElement("button");
    #modalElem = document.createElement("div");
    #modalOverlay = document.createElement("div");

    constructor(contentElemId, ...triggerElemsIds) {
        this.#modalContentElem = document.getElementById(contentElemId);
        this.#triggerElems = triggerElemsIds.map((id) => document.getElementById(id)).filter((res) => Boolean(res));

        if (this.#modalContentElem) {
            // Add attributes
            this.#modalElem.classList.add(
                "w-fit",
                "max-w-screen-md",
                "bg-white",
                "rounded-4xl",
                "shadow-lg",
                "p-6",
                "relative",
                "pointer-events-auto"
            );
            this.#modalOverlay.classList.add(
                "hidden",
                "bg-black/30",
                "fixed",
                "inset-0",
                "pointer-events-none",
                "transition-opacity",
                "z-[9999]",
                "flex",
                "justify-center",
                "items-center"
            );
            this.#closeBtn.classList.add("modal-close-btn");
            this.#closeBtn.setAttribute("title", "Close");
            this.#modalElem.setAttribute("aria-modal", "true");
            this.#modalElem.setAttribute("role", "dialog");

            // Insert modal into DOM
            this.#modalContentElem.parentElement.insertBefore(this.#modalOverlay, this.#modalContentElem);
            this.#modalOverlay.appendChild(this.#modalElem);
            this.#modalElem.appendChild(this.#modalContentElem);
            this.#modalElem.appendChild(this.#closeBtn);
            this.#closeBtn.classList.add("absolute", "top-0", "right-0", "p-6", "cursor-pointer", "Z-10");
            this.#closeBtn.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';

            // Add event listeners
            this.#triggerElems.forEach((el) => el.addEventListener("click", () => this.openModal()));
            this.#closeBtn.addEventListener("click", () => this.#closeModal());
            this.#closeBtn.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    this.#closeModal();
                }
            });
            this.#modalOverlay.addEventListener("click", (e) => {
                if (e.target === this.#modalOverlay) {
                    this.#closeModal();
                }
            });
        }
    }

    #closeModal() {
        this.#modalOverlay.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
    }

    openModal() {
        this.#modalOverlay.classList.remove("hidden");
        this.#closeBtn.focus();
        document.body.classList.add("overflow-hidden");
    }
}
