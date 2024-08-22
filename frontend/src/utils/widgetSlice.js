import { createSlice } from "@reduxjs/toolkit";
import widgetData from "../widgetData";

const initialState = widgetData.categories.reduce((acc, category) => {
    acc[category.id] = {
        ...category,
        widgets: category.widgets.reduce((widgetAcc, widget) => {
            widgetAcc[widget.id] = { ...widget, widgetVisible: widget.widgetVisible ?? true };
            return widgetAcc;
        }, {})
    };
    return acc;
}, {});

const widgetSlice = createSlice({
    name: 'widgets',
    initialState,
    reducers: {
        toggleWidgetVisiblity: (state, action) => {
            const { categoryId, widgetId } = action.payload;
            if (state[categoryId] && state[categoryId].widgets[widgetId]) {
                state[categoryId].widgets[widgetId].widgetVisible = !state[categoryId].widgets[widgetId].widgetVisible;
            }
        },
        addWidget: (state, action) => {
            const { categoryId, widget } = action.payload;
            const newWidgetId = Date.now().toString();  // unique ID for the widget

            if (!state[categoryId]) {
                state[categoryId] = { widgets: {} };
            }

            state[categoryId].widgets[newWidgetId] = {
                id: newWidgetId,
                name: widget.name,
                text: widget.text,
                widgetVisible: true,  
            };
        },
    },
});

export const { toggleWidgetVisiblity, addWidget } = widgetSlice.actions;
export default widgetSlice.reducer;
