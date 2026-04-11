import { app } from "../../scripts/app.js";

app.registerExtension({
    name: "MayoNodes.MayoLatent",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "MayoLatent") {
            
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                const r = onNodeCreated ? onNodeCreated.apply(this, arguments) : undefined;
                
                // Widget references
                const widgets = {
                    randomAR: this.widgets.find((w) => w.name === "randomize_aspect_ratio"),
                    aspectRatio: this.widgets.find((w) => w.name === "aspect_ratio"),
                    includeCustom: this.widgets.find((w) => w.name === "include_custom_in_randomizer"),
                    randomOri: this.widgets.find((w) => w.name === "randomize_orientation"),
                    orientation: this.widgets.find((w) => w.name === "orientation"),
                    width: this.widgets.find((w) => w.name === "custom_width"),
                    height: this.widgets.find((w) => w.name === "custom_height"),
                };

                const applyStyle = (widget, disabled) => {
                    if (!widget) return;
                    const el = widget.inputEl || widget.canvas;
                    if (el) {
                        el.style.opacity = disabled ? "0.4" : "1.0";
                        el.style.pointerEvents = disabled ? "none" : "auto";
                    }
                    widget.disabled = disabled;
                    widget.color = disabled ? "#666" : "";
                };

                const updateUI = () => {
                    const arRandomActive = widgets.randomAR.value;
                    const oriRandomActive = widgets.randomOri.value;

                    // 1. Aspect Ratio Dropdown: Disabled if Random is ON
                    applyStyle(widgets.aspectRatio, arRandomActive);

                    // 2. Include Custom Toggle: Disabled if Random is OFF
                    applyStyle(widgets.includeCustom, !arRandomActive);

                    // 3. Orientation Dropdown: Disabled if Random is ON
                    applyStyle(widgets.orientation, oriRandomActive);

                    // 4. Custom Sliders:
                    // Logic: Disable if (Manual mode AND not 'custom') OR (Random mode AND 'Include Custom' is OFF)
                    let slidersDisabled = false;
                    if (!arRandomActive) {
                        if (widgets.aspectRatio.value !== "custom") {
                            slidersDisabled = true;
                        }
                    } else {
                        if (!widgets.includeCustom.value) {
                            slidersDisabled = true;
                        }
                    }
                    applyStyle(widgets.width, slidersDisabled);
                    applyStyle(widgets.height, slidersDisabled);
                };

                // Add all listeners
                widgets.randomAR.callback = updateUI;
                widgets.randomOri.callback = updateUI;
                widgets.aspectRatio.callback = updateUI;
                widgets.includeCustom.callback = updateUI;

                // Initial run
                setTimeout(updateUI, 100);
                
                return r;
            };
        }
    },
});