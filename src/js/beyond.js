"use strict";

import Select from "./beyond/select";

$("select").each((index, domElement) =>
{
    const select = new Select(domElement);
    select.initialize();
});
