import $ from "jQuery";
import Timing from "mojave/lib/timing/timing";

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
         * @type {{top: string, right: string, bottom: string, left: string}}
         */
        this.alternativePlacementMap = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
        };

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

        this.generateTooltip();
        this.appendTooltip();
        this.registerEventListener();
        this.checkForSufficientSpace();
    }

    /**
     * registers event listener
     */
    registerEventListener ()
    {
        this.$emitter
            .on("mouseenter mouseleave", () => this.toggleTooltip());

        $(window).on("resize scroll", Timing.debounce(() => this.checkForSufficientSpace(), 2000));
    }

    /**
     * show/hide tooltip
     */
    toggleTooltip ()
    {
        this.$tooltip.fadeToggle();
    }

    /**
     * generate tooltip structure
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
     * check for .hiddenElementContainer and append $tooltip
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
     * check if sufficient space is available for $tooltip to render
     */
    checkForSufficientSpace ()
    {
        const $window = $(window);
        const $document = $(document);
        const space = {
            vertical: this.$tooltip.outerHeight(),
            horizontal: this.$tooltip.outerWidth(),
        };

        let placement = this.placement;

        switch (placement)
        {
            case "top":
                space.vertical = this.$emitter.offset().top - $window.scrollTop();
                break;

            case "bottom":
                space.vertical = ($document.scrollTop() + $window.innerHeight()) - (this.$emitter.offset().top + this.$emitter.outerHeight());
                break;

            case "right":
                space.horizontal = document.body.clientWidth - (this.$emitter.offset().left + this.$emitter.outerWidth());
                break;

            case "left":
                space.horizontal = this.$emitter.offset().left;
                break;
        }

        placement = this.handlePlacementSwitch(placement, space);

        this.calculateOffset(placement);
    }

    /**
     * handle the alternative placement of $tooltip if not sufficient Space is available
     *
     * @param {string} placement
     * @param {{vertical: number, horizontal: number}} space
     * @returns {string}
     */
    handlePlacementSwitch (placement, space)
    {
        const alternativePlacement = this.alternativePlacementMap[placement];

        this.$tooltip.removeClass(`${placement} ${alternativePlacement}`);
        this.$tooltip.addClass(placement);

        if (space.horizontal < this.$tooltip.outerWidth() || space.vertical < this.$tooltip.outerHeight())
        {
            this.$tooltip.toggleClass(`${placement} ${alternativePlacement}`);
            return alternativePlacement;
        }

        return placement;
    }

    /**
     * calculate the position of $tooltip
     *
     * @param {string} placement
     */
    calculateOffset (placement)
    {
        const centerHorizontal = this.$emitter.offset().left + (this.$emitter.outerWidth() / 2);
        const centerVertical = this.$emitter.offset().top + (this.$emitter.outerHeight() / 2);

        let offsetTop = 0;
        let offsetLeft = 0;

        switch (placement)
        {
            case "top":
                offsetTop = this.$emitter.offset().top;
                offsetLeft = centerHorizontal;
                break;

            case "bottom":
                offsetTop = this.$emitter.offset().top + (this.$emitter.outerHeight());
                offsetLeft = centerHorizontal;
                break;

            case "right":
                offsetTop = centerVertical;
                offsetLeft = this.$emitter.offset().left + (this.$emitter.outerWidth());
                break;

            case "left":
                offsetTop = centerVertical;
                offsetLeft = this.$emitter.offset().left;
                break;

            default:
                break;
        }

        this.$tooltip.css({
            position: "absolute",
            top: offsetTop,
            left: offsetLeft,
        });
    }
}

export default Tooltip;
