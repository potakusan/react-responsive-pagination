import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePaginationItems } from './hooks/usePaginationItems.js';
import { preventDefault } from './helpers/dom.js';
import { defaultLabelBehaviour } from './labelBehaviour.js';
import { incRenderCount } from './debug.js';
export * from './narrowBehaviour.js';
export * from './presets.js';
export * from './labelBehaviour.js';
/**
 * @public
 */
const ResponsivePaginationComponent = memo(ResponsivePagination);
export default ResponsivePaginationComponent;
/* eslint-disable jsx-a11y/anchor-is-valid */
function ResponsivePagination(props) {
    incRenderCount();
    if (process.env.NODE_ENV !== 'production') {
        checkLegacyProps(props);
    }
    const { current, total, onPageChange: handlePageChange, maxWidth, narrowBehaviour, className, extraClassName = 'justify-content-center', pageItemClassName = 'page-item', pageLinkClassName = 'page-link', activeItemClassName = 'active', disabledItemClassName = 'disabled', navClassName, previousClassName, nextClassName, previousLabel, nextLabel, ariaPreviousLabel, ariaNextLabel, renderNav = true, ariaCurrentAttr = true, linkHref = 'hash', labelBehaviour: getLabel = defaultLabelBehaviour, } = props;
    const { visible, items, ref, clearCache } = usePaginationItems(current, total, maxWidth, {
        narrowBehaviour,
        previousLabel,
        nextLabel,
        ariaPreviousLabel,
        ariaNextLabel,
        renderNav,
    });
    useEffect(() => {
        return () => clearCache();
    }, [
        clearCache,
        className,
        pageItemClassName,
        pageLinkClassName,
        activeItemClassName,
        disabledItemClassName,
        navClassName,
        previousClassName,
        nextClassName,
    ]);
    if (items.length === 0)
        return null;
    function getContainerClassName() {
        if (className !== undefined) {
            return className;
        }
        else if (extraClassName) {
            return `pagination ${extraClassName}`;
        }
        else {
            return 'pagination';
        }
    }
    return (React.createElement("ul", { className: getContainerClassName(), ref: ref, ...(!visible && { style: { visibility: 'hidden' } }) }, items.map(item => item.gotoPage !== undefined ? (
    // item = ClickableItem
    React.createElement("li", { key: item.key, className: classNames([
            pageItemClassName,
            item.active && activeItemClassName,
            item.type === 'next' && (nextClassName ?? navClassName),
            item.type === 'previous' && (previousClassName ?? navClassName),
        ]), "aria-current": item.active && ariaCurrentAttr ? 'page' : undefined },
        React.createElement("a", { className: pageLinkClassName, href: `./${item.gotoPage}${window.location.search}`, onClick: preventDefault(() => handlePageChange(item.gotoPage)), "aria-label": item.a11yLabel }, getLabel(item)))) : (
    // item = NonClickableItem
    React.createElement("li", { key: item.key, className: classNames([
            pageItemClassName,
            disabledItemClassName,
            item.type === 'next' && (nextClassName ?? navClassName),
            item.type === 'previous' && (previousClassName ?? navClassName),
        ]), "aria-hidden": item.a11yHidden },
        React.createElement("span", { className: pageLinkClassName, "aria-label": item.a11yLabel }, getLabel(item)))))));
}
function classNames(names) {
    return names.filter(name => name).join(' ');
}
ResponsivePagination.propTypes = {
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    maxWidth: PropTypes.number,
    narrowBehaviour: PropTypes.func,
    className: PropTypes.string,
    extraClassName: PropTypes.string,
    pageItemClassName: PropTypes.string,
    pageLinkClassName: PropTypes.string,
    activeItemClassName: PropTypes.string,
    disabledItemClassName: PropTypes.string,
    disabledLinkClassName: PropTypes.string,
    navClassName: PropTypes.string,
    previousClassName: PropTypes.string,
    nextClassName: PropTypes.string,
    previousLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    nextLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    ariaPreviousLabel: PropTypes.string,
    ariaNextLabel: PropTypes.string,
    renderNav: PropTypes.bool,
    ariaCurrentAttr: PropTypes.bool,
    linkHref: PropTypes.oneOf(['hash', 'omit']),
    labelBehaviour: PropTypes.func,
};
const legacyUsageWarnings = [];
function checkLegacyProps(props) {
    for (const legacyProp of [
        'srOnlyClassName',
        'a11yActiveLabel',
        'narrowStrategy',
    ]) {
        if (props[legacyProp] !== undefined &&
            !legacyUsageWarnings.includes(legacyProp)) {
            console.warn(`react-responsive-pagination: '${legacyProp}' prop no longer supported, please see migration guide: https://react-responsive-pagination.elantha.com/migration/`);
            legacyUsageWarnings.push(legacyProp);
        }
    }
}
