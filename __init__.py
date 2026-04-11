"""
@author: Mayo
@title: Mayo Nodes
@nickname: Mayo Nodes
@description: Just some nodes with niche usecases, mainly for myself, but maybe for others as well~
"""

from .mayo_nodes import MayoDropdown, MayoLatent

NODE_CLASS_MAPPINGS = {
    "MayoDropdown": MayoDropdown,
    "MayoLatent": MayoLatent,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "MayoDropdown": "Mayo Dropdown",
    "MayoLatent": "Mayo Aspect Ratio Randomizer",
}

WEB_DIRECTORY = "./js"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]