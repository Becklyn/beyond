import $ from "jQuery";

class PageTree
{
    /**
     * @param {HTMLElement} htmlElement
     */
    constructor (htmlElement)
    {
        /**
         * @type {jQuery}
         */
        this.$pageTreeContainer = $(htmlElement);

        /**
         * @type {string}
         */
        this.expansionFlag = "is-expanded";

        /**
         * @type {string}
         */
        this.selectionFlag = "is-selected";

        /**
         * @type {string}
         */
        this.ancestorFlag = "is-ancestor";

        /**
         * @type {jQuery[]}
         */
        this.$pageTreeExpander = this.$pageTreeContainer.find(".page-tree-expander");

        /**
         * @type {jQuery[]}
         */
        this.$pageTreeNodes = this.$pageTreeContainer.find(".page-tree-node");

        /**
         * @type {jQuery[]}
         */
        this.$pageTreeNodeContainers = this.$pageTreeNodes.parent("li");
    }

    /**
     * Initialize Module
     */
    initialize () {
        this.$pageTreeExpander.each((index, element) => {
            $(element).on("click", (event) => this.handleNodeExpansion(event));
        });

        this.$pageTreeNodes.each((index, element) => {
            $(element).on("click", (event) => this.handleNodeSelection(event));
        });
    }

    /**
     * Handles expansion and reduction of the content of page-tree-nodes
     *
     * @param {Event} event
     */
    handleNodeExpansion (event)
    {
        const $nodeContainer = $(event.currentTarget).parent();

        if (!$nodeContainer.hasClass(this.expansionFlag))
        {
            $nodeContainer.addClass(this.expansionFlag);
        }
        else
        {
            $nodeContainer.removeClass(this.expansionFlag);
            $nodeContainer.find("li").removeClass(this.expansionFlag);
        }
    }

    /**
     * Handles selection and deselection of page-tre-nodes
     *
     * @param {Event} event
     */
    handleNodeSelection (event)
    {
        const $target = $(event.currentTarget);

        this.$pageTreeNodes.each((index, element) => {
            $(element).removeClass(this.selectionFlag);
        });

        $(event.currentTarget).addClass(this.selectionFlag);

        this.setAncestry($target);
    }

    /**
     * Handles setting and removing of ancestor flag
     *
     * @param {jQuery} jQueryElement
     */
    setAncestry (jQueryElement)
    {
        const $target = $(jQueryElement);
        const $ancestors = $target.parentsUntil(this.$pageTreeContainer, "li");

        this.$pageTreeContainer.find("li").each((index, element) => {
            $(element).removeClass(this.ancestorFlag);
        });

        $ancestors.addClass(this.ancestorFlag);
    }
}

export default PageTree;
