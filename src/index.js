/**
 * When the user moves the panel on desktop.
 *
 * @param {JSSlidingUpPanel} ctx - Context we're altering
 * @param {TouchEvent} e 
 */
const onDesktopMove = (ctx, e) => {
    const currentTransform = e.currentTarget.style.transform || "translateY(0)";
    const value = ctx.getValue(currentTransform);
    const threshold = ((window.innerHeight - e.pageY) / window.innerHeight) * 100 >= ctx.threshold;
    ctx.moved = ctx.moved + e.movementY;

    e.currentTarget.style.transform = `translateY(${value + e.movementY}px)`;

    if (threshold === true) {
        ctx.isPastThreshold = true;
        if (ctx.events['threshold:hit'] != null) {
            ctx.events['threshold:hit'](ctx.el);
        }
    }
    
    if (threshold === false && ctx.isPastThreshold === true) {
        ctx.isPastThreshold = false;
    }
}

/**
 * When the user moves the panel on mobile.
 * 
 * TODO;
 * implement this for mobile.
 *
 * @param {JSSlidingUpPanel} ctx - Context we're altering
 * @param {TouchEvent} e 
 */
const onMobileMove = (ctx, e) => {
    const currentTransform = e.currentTarget.style.transform || "translateY(0)";
    const value = ctx.getValue(currentTransform);
    const threshold = ((window.innerHeight - e.pageY) / window.innerHeight) * 100 >= ctx.threshold;
    ctx.moved = ctx.moved + e.movementY;

    e.currentTarget.style.transform = `translateY(${value + e.movementY}px)`;

    if (threshold === true) {
        ctx.isPastThreshold = true;
        if (ctx.events['threshold:hit'] != null) {
            ctx.events['threshold:hit'](ctx.el);
        }
    }
    
    if (threshold === false && ctx.isPastThreshold === true) {
        ctx.isPastThreshold = false;
    }
}
class JSSlidingUpPanel {

    /**
     * 
     * @param {HTMLElement} el - The element.
     * @param {Number} threshold - The threshold that we need to hit before it should automatically continue to the top.
     */
    constructor ({ el, threshold }) {
        // Ensure we're not being duped.
        const _thres = parseInt(threshold);
        if (isNaN(_thres)) throw new Error("Threshold must be a number.");
        this.moving = false;
        this.moved = 0;
        this.events = {};
        this.isPastThreshold = false;
        this.threshold = _thres;
        this.el = el;
        this.el.addEventListener('touchstart', this.onBeginMove.bind(this));
        this.el.addEventListener('touchmove', this.onMove.bind(this));
        this.el.addEventListener('touchend', this.onFinishMove.bind(this));

        this.el.addEventListener('mousedown', this.onBeginMove.bind(this));
        this.el.addEventListener('mousemove', this.onMove.bind(this));
        this.el.addEventListener('mouseup', this.onFinishMove.bind(this));
        this.el.addEventListener('mouseleave', this.onFinishMove.bind(this));
    }

    on (event, handler) {
        this.events[event] = handler;
    }

    onBeginMove (e) {
        console.log('fuck');
        this.moving = true;
        this.moved = 0;
    }

    onFinishMove (e) {
        this.moving = false;
        let goTo = 0;
        if (this.isPastThreshold) {
            goTo = -(window.innerHeight - this.el.clientHeight);
            console.log(goTo);
        }
        this.el.style.transition = `transform 0.3s ease-in-out;`
        // this.el.addEventListener('transitionend', e => {
        //     this.el.style.transition = ``;
        // })
        this.el.style.transform = `translateY(${goTo}px)`;
        this.moved = 0;
    }

    getValue (currentTransform) {
        let value = 0;
        let possibleValue = currentTransform.split('translateY(')[1].split(')')[0];
        if (possibleValue.indexOf('px') !== -1) possibleValue = possibleValue.split('px')[0];
        if (!isNaN(parseInt(possibleValue))) value = parseInt(possibleValue);
        return value;
    }

    

    /**
     * 
     * @param {MouseEvent} e 
     */
    onMove (e) {
        if (this.moving) {
            console.log(e);
            // e.currentTarget.style;
            
            if (e.changedTouches != null && e.changedTouches.length != 0) {
                onMobileMove(this, e);
            } else {
                onDesktopMove(this, e);
            }
            
        }
    }

}

export { JSSlidingUpPanel };