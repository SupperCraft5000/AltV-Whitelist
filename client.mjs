import * as alt from "alt";

alt.onServer("getPlayerInformations", (data) =>
{
    switch(data)
    {
        case 0:
            alt.emitServer("responseClient", alt.getLicenseHash());
            break;
        case 1:
            alt.emitServer("responseClient", alt.discordInfo());
            break;
    }
});
