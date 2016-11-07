import $ from "jQuery";
import ToggleType from "./toggle-type";

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
        const attachment = this.getAttachment();
        const text = `Tooltip ${attachment}`;

        const $tooltip = $("<div>", {
            class: `tooltip ${attachment}`,
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
}

export default Tooltip;
