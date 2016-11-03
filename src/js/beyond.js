import $ from "jQuery";
import SortableHandler from "./beyond/sortable-handler";

$(".sortable-area").each((index, element) =>
{
    const sortableHandler = new SortableHandler(element);
    sortableHandler.init();
});
