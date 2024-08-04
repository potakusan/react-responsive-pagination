import React from 'react';
/**
 * @public
 */
export function defaultLabelBehaviour({ a11yLabel, label, }) {
    return !a11yLabel ? label : React.createElement("span", { "aria-hidden": "true" }, label);
}
/**
 * @public
 */
export function srOnlySpanLabel({ a11yActiveLabel = '(current)', srOnlyClassName = 'sr-only', } = {}) {
    return (item) => {
        const activePage = item.gotoPage !== undefined && item.active;
        const srOnlyLabel = activePage && a11yActiveLabel ? ` ${a11yActiveLabel}` : item.a11yLabel;
        return (React.createElement(React.Fragment, null,
            !item.a11yLabel ? item.label : React.createElement("span", { "aria-hidden": "true" }, item.label),
            srOnlyLabel && React.createElement("span", { className: srOnlyClassName }, srOnlyLabel)));
    };
}