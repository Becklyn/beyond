import $ from "jQuery";
import Selection from "./beyond/selection";
import SortableHandler from "./beyond/sortable-handler";

$(".card").each((index, element) =>
{
    const selection = new Selection(element);
    selection.init();
});

$(".sortable-area").each((index, element) =>
{
    const sortableHandler = new SortableHandler(element);
    sortableHandler.init();
});
