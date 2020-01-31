(() => {
    onload = () => {
        start(); // motion

        const socketio = io();
        (input = document.querySelector('.enter')).addEventListener('keydown', event => {
            // console.log(event);
            if (event.keyCode === 13) {
                // console.log('entered message', input.value);
                socketio.emit('streaming', {
                    // command: 'ls -A .'
                    command: 'python3 ./src/python/receive.py'
                });
            }
        });
    };
})();
