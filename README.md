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
- Works on its own or with **ox_inventory**
- Label and Streetname colors can be changed via the style.css file in the html folder

---

## Installation

1. Download or clone the repository into your server’s `resources` folder:


## Inventory Item (ox_inventory)

['compass'] = {
    label = 'Compass',
    weight = 100,
    stack = false,
    close = true,
    description = 'Navigate with confidence.'
}
