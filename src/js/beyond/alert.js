import $ from "jQuery";

/**
 * Alert
 */
class Alert
{
    /**
     * @param {string} type
     * @param {string} message
     * @param {number} timeToLive
     */
    constructor (type, message, timeToLive)
    {
        /**
         * @private
         * @type {string}
         */
        this.type = type;

        /**
         * @private
         * @type {string}
         */
        this.message = message;

        /**
         * @private
         * @type {number}
         */
        this.timeToLive = timeToLive;

        /**
         * @private
         * @type {jQuery|HTMLElement}
         */
        this.$alert = $("<div>", {
            class: `alert alert-${ this.getType() }`,
            html: this.getMessage(),
        });

        const $closeButton = $("<button>", {
            type: "button",
            class: "close",
            html: "&times;"
        });

        $closeButton.on("click", () => this.onClose());

        this.$alert.prepend($closeButton);
    }

    /**
     * returns type of the alert
     *
     * @returns {string}
     */
    getType ()
    {
        return this.type;
    }

    /**
     * returns message of the alert
     *
     * @returns {string}
     */
    getMessage ()
    {
        return this.message;
    }

    /**
     * returns alert template as jQuery object
     *
     * @returns {jQuery|HTMLElement}
     */
    getTemplate ()
    {
        return this.$alert;
    }

    /**
     * handles the closing of the alert
     */
    onClose ()
    {
        this.$alert.fadeOut(500, () => this.$alert.remove());
    }

    /**
     * starts lifecycle of alert if this.timeToLive is set above 0
     */
    startLifeCycle ()
    {
        if(this.timeToLive > 0)
        {
            window.setTimeout(() => {
                this.onClose();
            }, this.timeToLive * 1000);
        }
    }
}

export default Alert;
