"""
@author: Mayo
@title: Mayo Nodes
@nickname: Mayo Nodes
@description: Sleek and responsive custom nodes for latent aspect ratio management, time formatting, text formatting, and dynamic dropdown properties.
"""

from .mayo_nodes import MayoDropdown, MayoLatent, MayoTimeFormatter, MayoTextFormatter

NODE_CLASS_MAPPINGS = {
    "MayoDropdown": MayoDropdown,
    "MayoLatent": MayoLatent,
    "MayoTimeFormatter": MayoTimeFormatter,
    "MayoTextFormatter": MayoTextFormatter,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "MayoDropdown": "Mayo Dropdown",
    "MayoLatent": "Mayo SDXL Latent",
    "MayoTimeFormatter": "Mayo Time Formatter",
    "MayoTextFormatter": "Mayo Text Formatter",
}

WEB_DIRECTORY = "./js"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]