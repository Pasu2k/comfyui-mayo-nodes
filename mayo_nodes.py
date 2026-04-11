import torch
import random
import os

class MayoDropdown:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "option": (["Option 1", "Option 2", "Change in Properties Panel"],), 
                "options_list": ("STRING", {"default": "Option 1, Option 2, Change in Properties Panel"}),
            }
        }

    RETURN_TYPES = ("INT", "STRING")
    RETURN_NAMES = ("value", "label")
    FUNCTION = "execute"
    CATEGORY = "MayoNodes"

    def execute(self, option, options_list):
        opts = [s.strip() for s in options_list.split(",") if s.strip()]
        try:
            index = opts.index(option) + 1
        except ValueError:
            index = 1
            
        return (index, option)

    @classmethod
    def VALIDATE_INPUTS(cls, **kwargs):
        return True

class MayoLatent:
    # Hardcoded fallback presets
    DEFAULT_PRESETS = {
        "custom": (None, None),
        "1:1 1024x1024": (1024, 1024),
        "3:4 896x1152": (896, 1152),
        "5:8 832x1216": (832, 1216),
        "9:16 768x1344": (768, 1344),
    }

    BASE_PATH = os.path.dirname(os.path.realpath(__file__))
    TXT_PATH = os.path.join(BASE_PATH, "aspect_ratios.txt")

    def __init__(self):
        pass

    @classmethod
    def LOAD_PRESETS(cls):
        presets = {"custom": (None, None)}
        if not os.path.exists(cls.TXT_PATH):
            return cls.DEFAULT_PRESETS
        try:
            with open(cls.TXT_PATH, 'r', encoding='utf-8') as f:
                for line in f:
                    line = line.strip()
                    if not line or line.startswith("#"):
                        continue
                    parts = [p.strip() for p in line.split(",")]
                    if len(parts) == 3:
                        name, w, h = parts[0], int(parts[1]), int(parts[2])
                        presets[name] = (w, h)
            if len(presets) <= 1:
                return cls.DEFAULT_PRESETS
            return presets
        except Exception as e:
            print(f"MayoNodes Error: TXT file is broken, using default presets instead. ({e})")
            return cls.DEFAULT_PRESETS

    @classmethod
    def INPUT_TYPES(s):
        presets = s.LOAD_PRESETS()
        return {
            "required": {
                "aspect_ratio": (list(presets.keys()),),
                "orientation": (["Portrait", "Landscape"],), 
                "batch_size": ("INT", {"default": 1, "min": 1, "max": 64}),
                "custom_width": ("INT", {"default": 1024, "min": 64, "max": 8192, "step": 16}),
                "custom_height": ("INT", {"default": 1024, "min": 64, "max": 8192, "step": 16}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "randomize_aspect_ratio": ("BOOLEAN", {"default": False}),
                "include_custom_in_randomizer": ("BOOLEAN", {"default": False}),
                "randomize_orientation": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = ("LATENT", "INT", "INT", "INT",)
    RETURN_NAMES = ("empty_latent", "width", "height", "batch_size",)
    FUNCTION = "Aspect_Ratio"
    CATEGORY = "MayoNodes"

    def Aspect_Ratio(self, custom_width, custom_height, batch_size, aspect_ratio, orientation, randomize_aspect_ratio, randomize_orientation, include_custom_in_randomizer, seed):
        random.seed(seed)
        presets = self.LOAD_PRESETS()
        
        # Start with sliders
        width, height = custom_width, custom_height
        
        # Handle Randomization
        if randomize_aspect_ratio:
            choices = list(presets.keys())
            if not include_custom_in_randomizer and "custom" in choices:
                choices.remove("custom")
            aspect_ratio = random.choice(choices)
            print(f"Mayo Aspect Ratio Randomizer: Seed {seed} picked aspect ratio: {aspect_ratio}")

        # Get values from dictionary (overwrites sliders if not "custom")
        preset_w, preset_h = presets.get(aspect_ratio, (None, None))
        if preset_w is not None and preset_h is not None:
            width, height = preset_w, preset_h

        # Orientation Logic
        active_orientation = orientation
        if randomize_orientation:
            active_orientation = random.choice(["Portrait", "Landscape"])
            print(f"Mayo Aspect Ratio Randomizer: Seed {seed} picked orientation: {active_orientation}")

        if active_orientation == "Landscape":
            width, height = height, width
             
        latent = torch.zeros([batch_size, 4, height // 8, width // 8])
            
        return ({"samples": latent}, width, height, batch_size)