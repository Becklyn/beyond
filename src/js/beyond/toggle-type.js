import $ from "jQuery";

/**
 *
 */
class ToggleType
{
    /**
     * @param {{}} data
     */
    constructor (data)
    {
        /**
         * @private
         * @type {string[]}
         */
        this.requiredProperties = [];

        /**
         * @private
         * @type {{}}
         */
        this.data = data;

        this.checkRequiredData();
    }

    /**
     * @param key
     * @returns {*}
     */
    getData (key)
    {
        return this.data[key];
    }

    checkRequiredData ()
    {
        this.requiredProperties.forEach((requiredProperty) => {
            if (!this.data.hasOwnProperty(requiredProperty))
            {
                throw new Error(`required 'data-${requiredProperty}' attribute is missing.`);
            }
        });
    }

    /**
     * @returns {jQuery}
     */
    getTemplate ()
    {
        const text = "no template set for given toggleType";

        const $tooltip = $("<div>", {
            class: `tooltip ${this.getData("attachment")}`,
            role: "tooltip",
            "data-uid": this.getData("uid"),
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
