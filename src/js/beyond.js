import $ from "jQuery";
import Datepicker from "./beyond/datepicker";

$(".datepicker").each((index, element) =>
{
    const datepicker = new Datepicker(element);
    datepicker.init();
});
