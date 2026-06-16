import { app } from "../../scripts/app.js";

app.registerExtension({
    name: "MayoNodes.MayoTimeFormatter",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "MayoTimeFormatter") {
            
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                const r = onNodeCreated ? onNodeCreated.apply(this, arguments) : undefined;
                
                // Widget references
                const widgets = {
                    useDate: this.widgets.find((w) => w.name === "use_date"),
                    dateFormat: this.widgets.find((w) => w.name === "date_format"),
                    useTime: this.widgets.find((w) => w.name === "use_time"),
                    timeFormat: this.widgets.find((w) => w.name === "time_format"),
                    delimiter: this.widgets.find((w) => w.name === "delimiter"),
                };

                const applyStyle = (widget, enabled) => {
                    if (!widget) return;
                    const el = widget.inputEl || widget.canvas;
                    if (el) {
                        el.style.opacity = enabled ? "1.0" : "0.4";
                        el.style.pointerEvents = enabled ? "auto" : "none";
                    }
                    widget.disabled = !enabled;
                    widget.color = enabled ? "" : "#666";
                };

                const updateUI = () => {
                    const dateEnabled = widgets.useDate.value;
                    const timeEnabled = widgets.useTime.value;

                    // 1. Enable dropdown only if its toggle is checked
                    applyStyle(widgets.dateFormat, dateEnabled);
                    applyStyle(widgets.timeFormat, timeEnabled);

                    // 2. Delimiter Logic: Only enable if BOTH date and time are active
                    const delimiterEnabled = dateEnabled && timeEnabled;
                    applyStyle(widgets.delimiter, delimiterEnabled);
                };

                // Attach callbacks
                widgets.useDate.callback = updateUI;
                widgets.useTime.callback = updateUI;

                // Run on initial load
                setTimeout(updateUI, 100);
                
                return r;
            };
        }
    },
});