define(function(require) {
    'use strict';

    var Pool = require('Pool');
    var PoolRenderer = require('PoolRenderer');

    var gui = {

        lifeLoop: null,
        renderLoop: null,
        renderer: null,
        pool: null,
        fpsCount: 0,
        fpsLabel: null,
        run: function()
        {
            this.init();
            this.start();
        },
        init: function()
        {
            document.getElementById("pause").addEventListener('click',
                    this.pause.bind(this), false);
            document.getElementById("cont").addEventListener('click',
                    this.start.bind(this), false);
            document.getElementById("stop").addEventListener('click',
                    this.stop.bind(this), false);

            this.fpsLabel = document.getElementById("fps");
            var ctx = document.getElementById("mainCanvas").getContext("2d");

            this.renderer = new PoolRenderer(ctx);

            this.pool = new Pool();
            this.pool.init(100);
        },
        start: function()
        {
            var self = this;
            self.fpsCount = 0;
            self.startTime = new Date().getTime();
            self.lifeLoop = setInterval(function() {
                self.fpsCount++
                self.pool.update();
                
            }, 1)

            self.renderLoop = setInterval(function() {
                var current = new Date().getTime();
                var time = Math.round((current - self.startTime) / 1000);
                var dt = (current - self.lastTime) / 1000;//sec
                self.fpsLabel.innerHTML = 'tiks/s:' + Math.round((self.fpsCount / dt)) + ' fps:' + Math.round(1 / dt) + ' time(s):' + time;
                self.fpsCount = 0;
                self.lastTime = current;
                self.renderer.render(self.pool);
            }, 30 )

        },
        pause: function()
        {
            clearInterval(this.lifeLoop);
            clearInterval(this.renderLoop);
        },
        stop: function()
        {
            this.pause();
            this.init();
        }
    }

    return gui;
});