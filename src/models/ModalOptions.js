/**
 * This object represents values to pass to the Modal component.
 * This approach helps us avoid too many re-renders issue.
 */
export default class ModalOptions {
    /**
     * @param {boolean} isOpen
     * @param {object | null} itemToEdit
     */
    constructor(isOpen, itemToEdit = null) {
        this.isOpen = isOpen;
        this.itemToEdit = itemToEdit;
    }
}