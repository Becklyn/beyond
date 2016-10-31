import $ from "jQuery";

class Select
{
    /**
     * @param {HTMLElement} domElement
     */
    constructor (domElement)
    {
        /**
         * @type {jQuery}
         */
        this.$originalSelect = $(domElement);

        /**
         * @type {jquery[]}
         */
        this.$originalOptions = this.$originalSelect.find("option");

        /**
         * @type {string}
         */
        this.$virtualSelect = $("<div>", {
            class: "form-control dropdown",
            tabIndex: 0,
        });

        /**
         * @type {jquery[]}
         */
        this.$virtualOptions = [];

        /**
         * @type {string}
         */
        this.$virtualSelectValue = $("<div>", {
            class: "value",
        });

        /**
         * @type {jQuery}
         */
        this.$optionContainer = $("<div>", {
            class: "option-container",
        });

        /**
         * @type {boolean}
         */
        this.isMultiple = this.$originalSelect.prop("multiple");
    }

    /**
     * Initialize component
     */
    initialize ()
    {
        this.$originalOptions.each((i, domElement) => this.generateOption(i, domElement));

        this.$virtualOptions = this.$optionContainer.find(".option");

        this.$virtualSelect.append(this.$virtualSelectValue);
        this.$virtualSelect.append(this.$optionContainer);

        this.$originalSelect.after(this.$virtualSelect);

        this.updateVirtualSelect();
        this.registerEventHandler();
    }

    /**
     * Registers Event Handle
     */
    registerEventHandler ()
    {
        this.$originalSelect
            .on("focus", () => {
                this.$virtualSelect.focus();
            });

        this.$virtualSelect
            .on("click", () => {
                if(!this.$virtualSelect.is(":focus"))
                {
                    this.$virtualSelect.focus();
                }
                else if(!this.$virtualSelect.hasClass("is-active"))
                {
                    this.$virtualSelect.addClass("is-active");
                }
            })
            .on("blur", () => {
                this.$virtualSelect.removeClass("is-active");
            });

        this.$virtualOptions.on("click", (event) => this.onVirtualOptionClick(event));
    }

    /**
     * generate option
     *
     * @param {number} i
     * @param {HTMLElement} domElement
     */
    generateOption (i, domElement)
    {
        const $element = $(domElement);

        const $option = $("<div>", {
            class: "option",
            "data-value": $element.attr("value"),
            text: $element.text(),
        });

        this.$optionContainer.append($option);
    }

    /**
     * Updates virtual select
     */
    updateVirtualSelect ()
    {
        const $currentSelectedOptions = this.$originalSelect.find("option:selected");

        let values = [];

        this.$virtualOptions.removeClass("is-selected");
        this.$virtualOptions.each((i, element) => {
            const $element = $(element);

            $currentSelectedOptions.each((j, currentSelectedOption) => {
                if($element.data("value") === $(currentSelectedOption).attr("value"))
                {
                    $element.addClass("is-selected");
                    values.push($element.text());
                }
            });
        });

        this.$virtualSelectValue.text(values);
    }

    /**
     * Handles click on option of virtual select
     *
     * @param {Event} event
     */
    onVirtualOptionClick (event)
    {
        event.stopPropagation();

        const $element = $(event.currentTarget);

        if (this.isMultiple)
        {
            $element.toggleClass("is-selected");
        }
        else
        {
            this.$virtualOptions.removeClass("is-selected");

            if (!$element.hasClass("is-selected"))
            {
                $element.addClass("is-selected");
            }

            this.$virtualSelect.removeClass("is-active");
        }

        this.updateOriginalSelect();
        this.updateVirtualSelect();
    }

    /**
     * Updates original <select>
     */
    updateOriginalSelect ()
    {
        this.$originalOptions.removeProp("selected");

        this.$virtualOptions.each((i, virtualElement) => {
            const $virtualElement = $(virtualElement);

            this.$originalOptions.each((j, domElement) => {
                const $domElement = $(domElement);

                if ($virtualElement.data("value") === $domElement.attr("value"))
                {
                    if ($virtualElement.hasClass("is-selected"))
                    {
                        $domElement.prop("selected", true);
                    }
                    else
                    {
                        $domElement.prop("selected", false);
                    }
                }
            });
        });

        this.$originalSelect.change();
    }
}

export default Select;
