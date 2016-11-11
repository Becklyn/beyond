import $ from "jQuery";
import Tabs from "./beyond/tabs";

$(".tabs-container").each((index, element) =>
{
    const tabs = new Tabs(element);
    tabs.init();
});
