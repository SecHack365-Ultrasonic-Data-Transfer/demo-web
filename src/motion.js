const pos = [];
const fps = 1000 / 30;

const update = (time, radius) => {
    // floating balls
    [...document.querySelectorAll('.ball')].map((dom, index) => {
        if (pos[index] === undefined) {
            const x = getComputedStyle(dom).left.match(/\d+/)[0] >> 0;
            const y = getComputedStyle(dom).top.match(/\d+/)[0] >> 0;
            pos[index] = { x, y };
        } else {
            const delta = time + index * 60;
            const y = pos[index].y + Math.sin(delta * Math.PI / 180) * radius;
            dom.style.top = `${y >> 0}px`;
        }
    });

    // waves
    [...document.querySelectorAll('.water-surface')].map((dom) => {
        const area = Math.max(innerHeight, innerWidth) + 200;
        const actual = getComputedStyle(dom).width.match(/\d+/)[0] >> 0;
        const expect = actual > area ? 0 : actual + 1.2;
        dom.style.height = `${expect}px`;
        dom.style.width = `${expect}px`;
    });
}

(() => {
    onload = () => {
        time = 0;
        setInterval(() => {
            time += 3;
            update(time, 20);
        }, fps);
    }
})();
