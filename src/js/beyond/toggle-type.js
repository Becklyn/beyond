import $ from "jQuery";

/**
 *
 */
class ToggleType
{
    /**
     * @param {string} uid
     * @param {string} attachment
     */
    constructor (uid, attachment = "bottom")
    {
        /**
         * @private
         * @type {string}
         */
        this.uid = uid;

        /**
         * @private
         * @type {string}
         */
        this.attachment = attachment;
    }

    /**
     * @returns {string}
     */
    getUid ()
    {
        return this.uid;
    }

    /**
     * @returns {string}
     */
    getAttachment ()
    {
        return this.attachment;
    }

    /**
     * @returns {jQuery}
     */
    getTemplate ()
    {
        const text = "no template set for given toggleType";

        const $tooltip = $("<div>", {
            class: `tooltip ${this.attachment}`,
            role: "tooltip",
            "data-uid": this.getUid(),
        });

        const $tooltipArrow = $("<div>", {
            class: "tooltip-arrow",
        });

        const $tooltipInner = $("<div>", {
            class: "tooltip-inner",
            text,
        });

        $tooltip
            .append($tooltipArrow)
            .append($tooltipInner);

        return $tooltip;
    }

    /**
     * returns lowercase class name
     *
     * @returns {string}
     */
    static getType ()
    {
        return this.name.toLowerCase();
    }
}

export default ToggleType;
