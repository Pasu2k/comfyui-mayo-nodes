import { app } from "../../scripts/app.js";

app.registerExtension({
    name: "MayoDropdownExtension",

    async beforeRegisterNodeDef(nodeType, nodeData, _app) {
        if (nodeData.name !== "MayoDropdown") return;

        const onNodeCreated = nodeType.prototype.onNodeCreated;
        nodeType.prototype.onNodeCreated = function () {
            if (onNodeCreated) onNodeCreated.apply(this, []);

            this.properties = this.properties || {};
            this.properties.dropdown_values = this.properties.dropdown_values || "Option 1, Option 2, Change in Properties Panel";
            this.addProperty("dropdown_values", this.properties.dropdown_values, "string");

            // --- THE AGGRESSIVE HIDE ---
            const listWidget = this.widgets.find(w => w.name === "options_list");
            if (listWidget) {
                listWidget.type = "hidden"; 
                listWidget.hidden = true; // High-level LiteGraph flag
                
                // Force the widget to have no height and no draw function
                listWidget.computeSize = () => [0, 0];
                listWidget.draw = () => {}; 
            }

            const dropdown = this.widgets.find(w => w.name === "option");

            const refreshDropdown = () => {
                const val = this.properties.dropdown_values || "";
                const newValues = val.split(",").map(s => s.trim()).filter(s => s !== "");
                const finalValues = newValues.length > 0 ? newValues : ["Option 1"];

                if (dropdown) {
                    dropdown.options.values = finalValues;
                    if (!finalValues.includes(dropdown.value)) {
                        dropdown.value = finalValues[0];
                    }
                }
                
                if (listWidget) {
                    listWidget.value = val;
                }
            };

            const origOnPropertyChanged = this.onPropertyChanged;
            this.onPropertyChanged = function (name, value) {
                if (name === "dropdown_values") {
                    this.properties.dropdown_values = value;
                    refreshDropdown();
                }
                if (origOnPropertyChanged) return origOnPropertyChanged.apply(this, arguments);
            };

            // Initial sync
            setTimeout(() => {
                refreshDropdown();
                // Final layout pass to collapse the empty space
                this.setSize(this.computeSize());
                this.setDirtyCanvas(true, true);
            }, 20);
        };
    }
});