import $ from "jQuery";
import ToggleCollection from "./toggle-collection";
import Tooltip from "./toggle-types/tooltip";

/**
 *
 */
class ToggleHandler
{
    /**
     *
     */
    constructor ()
    {
        /**
         * @type {{}}
         */
        this.toggleTypes = {};

        /**
         * @type {ToggleCollection}
         */
        this.toggleCollection = new ToggleCollection();

        /**
         * @type {jQuery|HTMLElement}
         */
        this.$toggleEmitter = $("[data-toggle]");


        this.prepareEmitters();
        this.setUniqueIdentifier();
        this.registerToggleTypes();
        this.populateToggleCollection();
        this.registerEventListener();
    }

    /**
     *
     */
    prepareEmitters ()
    {
        this.$toggleEmitter.css("position", "relative");
    }

    /**
     *
     */
    registerEventListener ()
    {
        this.$toggleEmitter
            .on("mouseenter", (event) => this.showToggleTarget(event.currentTarget))
            .on("mouseleave", (event) => this.hideToggleTarget(event.currentTarget));
    }

    /**
     *
     */
    setUniqueIdentifier ()
    {
        this.$toggleEmitter.each((index, emitter) => {
            $(emitter).data("uid", `${Date.now()}${index}`);
        });
    }

    /**
     *
     */
    registerToggleTypes ()
    {
        this.toggleTypes[Tooltip.getType()] = Tooltip;
    }

    /**
     *
     */
    populateToggleCollection ()
    {
        this.$toggleEmitter.each((i, emitter) => {

            const $emitter = $(emitter);
            const desiredToggleType = $emitter.data("toggle");
            const emitterData = $emitter.data();

            if (this.toggleTypes.hasOwnProperty(desiredToggleType))
            {
                this.toggleCollection.add(emitterData["uid"], new this.toggleTypes[desiredToggleType](emitterData));
            }
        });
    }

    /**
     * @param {jQuery|HTMLElement|string} emitter
     */
    showToggleTarget (emitter)
    {
        const $emitter = $(emitter);

        const toggleTarget = this.toggleCollection.getTypeByEmitterUid($emitter.data("uid"));
        $emitter.append(toggleTarget.getTemplate());
    }

    /**
     * @param {jQuery|HTMLElement|string} emitter
     */
    hideToggleTarget (emitter)
    {
        const $emitter = $(emitter);

        $emitter.find(`[data-uid=${$emitter.data("uid")}]`).fadeOut(400);
    }
}

export default new ToggleHandler();
