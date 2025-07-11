export const closeDropDown = () => {
    const elem = document.activeElement;
    if (elem) {
        elem?.blur();
    }
};
