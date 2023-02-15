import { refs } from "../refs";

export const hideLoader = () => {
    refs.loader.classList.remove("show");
};

export const showLoader = () => {
    refs.loader.classList.add("show");
};