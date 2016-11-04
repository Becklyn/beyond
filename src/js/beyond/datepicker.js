import $ from "jQuery";
import Pikaday from "pikaday";

class Datepicker
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

        new Pikaday({
            field: this.$container[0],
            theme: 'beyond-theme',
            firstDay: 1,
            i18n: {
                months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                weekdays : ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                weekdaysShort: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
            },
        });
    }
}


export default Datepicker;
