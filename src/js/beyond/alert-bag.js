import $ from "jQuery";
import Alert from "./alert";

/**
 * AlertBag
 */
class AlertBag
{
    /**
     *
     */
    constructor ()
    {
        /**
         * @type {Alert[]}
         */
        this.alertBag = this.getPreservedAlertBag();

        /**
         * @type {jQuery|HTMLElement}
         */
        this.$alertBagTemplate = $("<div>",{
            class: "alert-bag",
        });
    }

    /**
     * add new alert
     *
     * @private
     * @param {string} type
     * @param {string} message
     * @param {number} timeToLive
     */
    addAlert (type, message, timeToLive)
    {
        this.alertBag.push(new Alert(type, message, timeToLive));

        this.preserveAlertBag();
    }

    /**
     * add new default alert
     *
     * @param {string} message
     * @param {number} timeToLive
     */
    addDefault (message, timeToLive = 0)
    {
        this.addAlert("default", message, timeToLive);
    }

    /**
     * add new info alert
     *
     * @param {string} message
     * @param {number} timeToLive
     */
    addInfo (message, timeToLive = 0)
    {
        this.addAlert("info", message, timeToLive);
    }

    /**
     * add new success alert
     *
     * @param {string} message
     * @param {number} timeToLive
     */
    addSuccess (message, timeToLive = 0)
    {
        this.addAlert("success", message, timeToLive);
    }

    /**
     * add new warning alert
     *
     * @param {string} message
     * @param {number} timeToLive
     */
    addWarning (message, timeToLive = 0)
    {
        this.addAlert("warning", message, timeToLive);
    }

    /**
     * add new error alert
     *
     * @param {string} message
     * @param {number} timeToLive
     */
    addError (message, timeToLive = 0)
    {
        this.addAlert("error", message, timeToLive);
    }

    /**
     * returns all stored alerts and clears alertBag
     *
     * @returns {Alert[]|[]}
     */
    getAlerts ()
    {
        const alerts = this.alertBag;
        this.alertBag = [];

        this.preserveAlertBag();

        return alerts;
    }

    /**
     * print all alerts stored in alertBag
     */
    printAlerts ()
    {
        const alerts = this.getAlerts();

        alerts.forEach((alert) => {
            const $alertTemplate = alert.getTemplate();

            this.$alertBagTemplate.append($alertTemplate);
            alert.startLifeCycle();
        });

        $("body").append(this.$alertBagTemplate);
    }

    /**
     * get preserved alertBag from localStorage or return empty Array
     *
     * @returns {Alert[]|[]}
     */
    getPreservedAlertBag ()
    {
        const preservedAlerts = JSON.parse(window.localStorage.getItem("preservedAlertBag"));

        if (preservedAlerts === null) return [];

        return preservedAlerts.map((value) => new Alert(value.type, value.message));
    }

    /**
     * saves alertBag to localStorage
     */
    preserveAlertBag ()
    {
        window.localStorage.setItem("preservedAlertBag", JSON.stringify(this.alertBag));
    }
}

export default AlertBag;
