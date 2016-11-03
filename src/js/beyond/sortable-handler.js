import $ from "jQuery";
import Sortable from "sortablejs";


class SortableHandler
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
        if (1 >= this.$container.children().length)
        {
            return;
        }

        new Sortable(this.$container[0], {
            animation: 150,
        });
    }
}


export default SortableHandler;
