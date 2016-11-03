import $ from "jQuery";


class Selection
{
    /**
     *
     * @param {jQuery|HTMLElement|string} container
     */
    constructor (container)
    {
        /**
         * @private
         * @type {jQuery}
         */
        this.$container = $(container);
    }


    /**
     * Initializes the component
     */
    init ()
    {
        if (!this.$container.length)
        {
            return;
        }

        this.$container
            .on("mousedown", (event) => this.toggleSelection(event));
    }

    /**
     * @private
     *
     * @param {Event} event
     */
    toggleSelection (event)
    {
        $(event.currentTarget).parent()
            .children()
            .removeClass("selected");
        $(event.currentTarget).toggleClass("selected");
    }
}


export default Selection;
