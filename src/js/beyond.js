import $ from "jQuery";
import Tooltip from "./beyond/tooltip";

$("[data-toggle='tooltip']").each((i, element) => {
    const tooltip = new Tooltip(element);
    tooltip.initialize();
});
