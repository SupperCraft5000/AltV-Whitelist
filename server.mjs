import alt from "alt";
import config from "./config.json";

alt.on("playerConnect", (player) =>
{
    if(config.Enabled)
    {
        alt.emitClient(player, "getPlayerInformations", {type: config.Authorization});
    }
});

alt.onClient("responseClient", (player, data) =>
{
    if(config.Enabled)
    {
        let kick = true;
        switch(config.Authorization)
        {
            case 0:
                if(data.licensehash != undefined || data.licensehash != null)
                {
                    alt.log("[Whitelist] The " + player.name + " player is trying to connect (LicenseHash: " + data.licensehash + ")");
                    config.Access.forEach(row =>
                    {
                        if(data.licensehash == row) kick = false;  
                    });
                }
                break;
            case 1:
                if(data.discord != undefined || data.discord != null)
                {
                    alt.log("[Whitelist] The " + player.name + " player is trying to connect (Discord ID: " + data.discord.id + ")");
                    config.Access.forEach(row =>
                    {
                        if(data.discord.id == row) kick = false; 
                    });
                }
                break;
        }
        if(kick) player.kick();
    }
});