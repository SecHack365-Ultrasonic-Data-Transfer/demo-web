const socketio = require('socket.io');
const http = require('http');

const exec = require('child_process').exec;
const fs = require('fs');

const serverSetting = (request, response) => {
        const url = request.url.split('?')[0];
        const path = '.' + url;
        const tmp = url.split('.');
        const extension = tmp[tmp.length - 1];

        switch (extension) {
            case '/':
                fs.readFile('./index.html', (err, data) => {
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.end(data, 'utf-8');
                });
                break;

            default:
                let type = null;
                switch (extension) {
                    case 'js':
                                type = 'text/javascript';
                                break;

                        case 'css':
                                type = 'text/css';
                                break;
                }

                fs.readFile(path, (err, data) => {
                    response.writeHead(200, {'Content-Type': type});
                    response.end(data, 'utf-8');
                });
                break;
        }
};

const server = http.createServer(serverSetting);
const io = socketio.listen(server);

io.sockets.on('connection', socket => {
    socket.on('connected', data => {
        console.log(`${'-'.repeat(130)}>`);
        console.log('SYS:', 'New access.');
        console.log('SYS:', 'socket.id ->', socket.id);
        console.log(`<${'-'.repeat(130)}`);
    });

    socket.on('streaming', config => {
        console.log('run it ->', config.command);
        exec(config.command, (err, stdout, stderr) => {
              if (err) console.log(err);
              console.log(stdout);
        });
    });
});

// Connextion
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`${'-'.repeat(130)}>`);
    console.log('OK: Started server');
    console.log('OK: Listening port on', port);
    console.log(`<${'-'.repeat(130)}`);
});
