<p align="center">
  <img src="preview.PNG" alt="PhoQ Compass Preview" width="700">
</p>

# PhoQ Compass

PhoQ Compass is a clean and lightweight compass HUD for FiveM.  
It’s built for servers that want a minimal, modern interface that actually feels smooth when players move or turn.

---

## Features

- Real-time compass tape that glides with player movement  
- Shows your current street name and direction (N, NE, E, SE, S, SW, W, NW)  
- Minimal HUD placement at the top-center of the screen  
- Automatically hides unless the player has a **compass** item  
- Low resource usage (around **0.04–0.05 ms** on average)  
- Label and Streetname colors can be changed via the style.css file in the html folder

---

## Installation

1. Download or clone the repository into your server’s `resources` folder
2. Place the image found in `assets` into your **ox_inventory/web/images/** folder. (Check your specific inventory configuration for the exact path if different)
3. Go to your server.cfg and ensure the resource, `ensure PhoQ_Compass`

## Camera vs Player Heading

By default, PhoQ_Compass uses the gameplay camera yaw, so the compass updates whenever the player looks around with their mouse.
If you prefer the compass to follow the player heading instead, you can swap the heading source in 'client/client.lua'
```lua
local ped = PlayedPedID()
local coords = GetEntityCoords(ped)
local camRot = GetGameplayCamrot(0) or vector3(0.0, 0.0, 0.0)
local heading = ((camRot.z % 360) + 360) % 360
```

## Inventory Item (ox_inventory)

```lua
['compass'] = {
    label = 'Compass',
    weight = 100,
    stack = false,
    close = true,
    description = 'Navigate with confidence.'
}
```
<p align="center"> <img src="assets/compass.png" alt="In-game inventory item icon" width="100"> </p>



