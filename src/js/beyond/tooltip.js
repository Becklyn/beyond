import $ from "jQuery";
import Utility from "./utility";

/**
 * Tooltip
 */
class Tooltip
{
    /**
     * @param {jQuery|HTMLElement|string} element
     */
    constructor (element)
    {
        /**
         * @private
         * @type {jQuery}
         */
        this.$emitter = $(element);

        /**
         * @type {jQuery|null}
         */
        this.$tooltip = null;

        /**
         * @private
         * @type {string}
         */
        this.placement = "";

        /**
         * @private
         * @type {string}
         */
        this.text = "";
    }

    /**
     * initialize tooltip
     */
    initialize ()
    {
        this.placement = this.$emitter.data("placement");
        this.text = this.$emitter.data("text");

        this.registerEventListener();
        this.generateTooltip();
        this.appendTooltip();
        this.calculateOffset();
    }

    /**
     * registers event listener
     */
    registerEventListener ()
    {
        this.$emitter
            .on("mouseenter mouseleave", () => this.toggleTooltip());

        $(window).on("resize", Utility.debounce(() => this.calculateOffset()));
    }

    /**
     *
     */
    toggleTooltip ()
    {
        this.$tooltip.fadeToggle();
    }

    /**
     * generates tooltip
     */
    generateTooltip ()
    {
        this.$tooltip = $("<div>", {
            class: `tooltip ${this.placement}`,
        });

        this.$tooltip.append($("<div>", {
            class: "tooltip-inner",
            text: this.text,
        }));

        this.$tooltip.hide();
    }

    /**
     *
     */
    appendTooltip ()
    {
        let $hiddenElementContainer = $(".hiddenElementContainer");

        if ($hiddenElementContainer.length === 0)
        {
            $hiddenElementContainer = $("<div>", {
                class: "hiddenElementContainer",
            });

            $("body").append($hiddenElementContainer);
        }

        $hiddenElementContainer.append(this.$tooltip);
    }

    /**
     *
     */
    calculateOffset ()
    {
        const centerHorizontal = this.$emitter.offset().left + (this.$emitter.outerWidth() / 2);
        const centerVertical = this.$emitter.offset().top + (this.$emitter.outerHeight() / 2);

        let top = 0;
        let left = 0;

        switch (this.placement)
        {
            case ("top"):
                top = this.$emitter.offset().top;
                left = centerHorizontal;
                break;
            case ("right"):
                top = centerVertical;
                left = this.$emitter.offset().left + (this.$emitter.outerWidth());
                break;
            case ("bottom"):
                top = this.$emitter.offset().top + (this.$emitter.outerHeight());
                left = centerHorizontal;
                break;
            case ("left"):
                top = centerVertical;
                left = this.$emitter.offset().left;
                break;
            default:
                break;
        }

        this.$tooltip.css({
            position: "absolute",
            top,
            left,
        });
    }

    /**
     *
     */
    checkForSufficientSpace ()
    {
        // Todo: Remove console.log()
        // ---------- Log ----------
        // window.console.log(document.body.clientWidth - (this.$emitter.offset().left + this.$emitter.outerWidth()));
        // -------------------------

    }
}

export default Tooltip;
