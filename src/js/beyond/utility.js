/**
 * Utility
 */
class Utility
{
    /**
     * debounces functions invoked by events
     *
     * @param {function} func       function to be invoked
     * @param {number} wait         time to wait before func is invoked
     * @returns {function(...[*]=)}
     */
    static debounce (func, wait = 80)
    {
        let timeoutId = null;

        return (...args) =>
        {
            const later = () =>
            {
                timeoutId = null;
                func.apply(null, args);
            };

            clearTimeout(timeoutId);

            timeoutId = window.setTimeout(later, wait);
        };
    }
}

export default Utility;
