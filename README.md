# MayoNodes
Just some nodes with niche usecases, mainly for myself, but maybe for others as well

## How to install
Open your `custom_nodes` folder in your ComfyUI installation, right-click inside the folder and open in Terminal. Paste the following command: `git clone https://github.com/Pasu2k/comfyui-mayo-nodes/`

## Overview of nodes

### Mayo Aspect Ratio Randomizer
![Preview of the node Mayo Aspect Ratio Randomizer](https://github.com/Pasu2k/comfyui-mayo-nodes/blob/main/img/mayo_aspect_ratio_randomizer.png)

A node that allows you to choose a base latent size in certain aspect ratios, as well as the option to randomize the latent aspect ratio and/or orientation. All sizes are divisible by 16 to ensure maximum compatability with most models, like SDXL, Illustrious, Noob, and more.

By default, aspect ratios of 1:1, 3:4, 5:8 and 9:16 are included, but users can edit the included aspect_ratios.txt file to add their own, or set aspect_ratio to custom and use custom_width and custom_height to set their own.

### Mayo Dropdown
![Preview of the node Mayo Dropdown](https://github.com/Pasu2k/comfyui-mayo-nodes/blob/main/img/mayo_dropdown.png)
A dropdown node with the ability to customize the dropdown list to whatever you want. The outputs are either the `STRING` name of the chosen value, or an `INT` ordered by position in the list, starting with 1. Right-click the node, open the Properties Panel, to customize the dropdown values.
