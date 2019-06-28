import * as alt from "alt";
import config from "./config.json";

alt.on("playerConnect", (player) =>
{
    if(config.Enabled) alt.emitClient(player, "getPlayerInformations", config.Authorization);
});

alt.onClient("responseClient", (player, data) =>
{
    if(config.Enabled)
    {
        let kick = true;
        if(data !== undefined || data !== null)
        {
            switch(config.Authorization)
            {
                case 0:
                    alt.log(`[Whitelist] The ${player.name} player is trying to connect (LicenseHash: ${data})`);
                    config.Access.forEach(row =>
                    {
                        if(data === row) kick = false;
                        return;
                    });
                    break;
                case 1:
                    alt.log(`[Whitelist] The ${player.name} player is trying to connect (Discord ID ${data.id})`);
                    config.Access.forEach(row =>
                    {
                        if(data.id === row) kick = false;
                        return;
                    });
                    break;
            }
        }
        if(kick) player.kick();
    }
});
