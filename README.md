# MayoNodes
Just some nodes with niche usecases, mainly for myself, but maybe for others as well

## Mayo Aspect Ratio Randomizer
![Preview of the node Mayo Aspect Ratio Randomizer](https://github.com/Pasu2k/comfyui-mayo-nodes/blob/main/img/mayo_aspect_ratio_randomizer.png)

A node that allows you to choose a base latent size in certain aspect ratios, as well as the option to randomize the latent aspect ratio and/or orientation. All sizes are divisible by 16 to ensure maximum compatability with most models, like SDXL, Illustrious, Noob, and more.

By default, aspect ratios of 1:1, 3:4, 5:8 and 9:16 are included, but users can edit the included aspect_ratios.txt file to add their own, or set aspect_ratio to custom and use custom_width and custom_height to set their own.
