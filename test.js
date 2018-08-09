import { JSSlidingUpPanel } from './src/index.js';

const jsSlidingPanel = new JSSlidingUpPanel({
    el: document.querySelector('#designated'),
    threshold: 45
});

jsSlidingPanel.on('threshold:hit', e => {
    console.log(e);
})