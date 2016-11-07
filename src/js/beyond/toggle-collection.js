/**
 *
 */
class ToggleCollection
{
    /**
     *
     */
    constructor ()
    {
        /**
         * @type {Object}
         */
        this.collection = {};
    }

    /**
     * @param {string} uniqueElementIdentifier
     * @param {ToggleType} toggleType
     */
    add (uniqueElementIdentifier, toggleType)
    {
        this.collection[uniqueElementIdentifier] = toggleType;
    }

    /**
     * @param {string} uniqueElementIdentifier
     * @returns {ToggleType}
     */
    getTypeByEmitterUid (uniqueElementIdentifier)
    {
        return this.collection[uniqueElementIdentifier];
    }
}

export default ToggleCollection;
