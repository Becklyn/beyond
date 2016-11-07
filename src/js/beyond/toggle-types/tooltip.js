import $ from "jQuery";
import ToggleType from "../toggle-type";

/**
 *
 */
class Tooltip extends ToggleType
{
    /**
     * @returns {jQuery}
     */
    getTemplate ()
    {
        const attachment = this.getData("attachment");
        const text = this.getData("text");

        const $tooltip = $("<div>", {
            class: `tooltip ${attachment}`,
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
}

export default Tooltip;
