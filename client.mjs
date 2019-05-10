import alt from "alt";

alt.onServer("getPlayerInformations", (data) =>
{
    switch(data.type)
    {
        case 0:
            alt.emitServer("responseClient", {licensehash: alt.getLicenseHash()});
            break;
        case 1:
            alt.emitServer("responseClient", {discord: alt.discordInfo()});
            break;
    }
});