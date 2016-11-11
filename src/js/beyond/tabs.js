import $ from "jQuery";


class Tabs
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

        // Let's append a new `li` with class 'nav-underline' to the tabs `ul`
        // And save it in a variable
        $(".tabs").append("<li class='nav-underline'></li>");
        const underline = $(".nav-underline");

        // Now we're setting its width to the width of the currently active tab (cat)
        // This way it looks like a proper underline
        // Next we're setting its left position to that of the cat
        // And save those two values as data
        // This way we'll always know where the line needs to go back to when we blur
        underline.width($(".is_opened").width())
            .css("left", $(".is_opened").position().left)
            .data("origLeft", underline.position().left)
            .data("origWidth", underline.width());

        // Let's hover over the tabs
        this.$container.find(".tab")
            .on("mouseenter", () => this.hoverOn(underline));
        this.$container.find(".tab")
            .on("mouseleave", () => this.hoverOff(underline));

        // Let's click on the tabs
        this.$container.find(".tab")
            .on("click", (event) => this.switchTabs(event, underline));
    }

    /**
     * @private
     *
     * @param {jQuery} $underline
     */
    hoverOn ($underline)
    {
        // When we start our hovering we want the underline to move to the hovered tab
        // And it needs to be a smooth transition, not a sudden jump
        // Change its left position to that of the hovered tab
        // Same with its width
        $underline.stop()
            .animate({
                left: $(event.currentTarget).position().left,
                width: $(event.currentTarget).width(),
            });
    }

    /**
     * @private
     *
     * @param {jQuery} $underline
     */
    hoverOff ($underline)
    {
        // When we end our hovering we want the underline to move to its original position
        // And again, it needs to be a smooth transition, not a sudden jump
        // Change its left position to the one we saved as data
        // Same with its width
        $underline.stop()
            .animate({
                left: $underline.data("origLeft"),
                width: $underline.data("origWidth"),
            });
    }

    /**
     * @private
     *
     * @param {Event} event
     * @param {jQuery} $underline
     */
    switchTabs (event, $underline)
    {
        // When we click on a tab we want the underline to move to the clicked tab
        // And it needs to be an smooth transition, not a sudden jump
        // Change its left position to that of the clicked tab
        // Same with its width
        // This is gonna be a permanent new place for the underline
        // So we need to save its new position and width as data
        $underline.width($(event.currentTarget).width())
            .css("left", $(event.currentTarget).position().left)
            .data("origLeft", $underline.position().left)
            .data("origWidth", $underline.width());

        $(event.currentTarget).siblings()
            .removeClass("is_opened");
        $(event.currentTarget).addClass("is_opened");

        const thisId = $(event.currentTarget).attr("id");
        $(".tab-content").removeClass("is_opened");
        $(`.tab-content#${thisId}`).addClass("is_opened");
    }
}


export default Tabs;
