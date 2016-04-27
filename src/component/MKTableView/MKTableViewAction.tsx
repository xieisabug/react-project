/**
 * Created by Gene on 16/4/11.
 */

export const INIT_SCROLL_HEIGHT = 'INIT_SCROLL_HEIGHT';

export const initScrollHeight = (scrollContainerHeight, scrollContentHeight) => {
    return {
        type: INIT_SCROLL_HEIGHT,
        scrollContainerHeight,
        scrollContentHeight
    }
};