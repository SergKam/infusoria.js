define(function(require) {
    'use strict';

    function Point(x, y)
    {
        this.x = x;
        this.y = y;
    }

    Point.prototype = {
        addVector: function(vector)
        {
            this.x = this.x + Math.cos(vector.angle) * vector.length;
            this.y = this.y + Math.sin(vector.angle) * vector.length;
            return this;
        },
        addPoint: function(point)
        {
            this.x = this.x + point.x;
            this.y = this.y + point.y;
            return this;
        },
        getDistace: function(point)
        {
            var width = Math.abs(this.x - point.x);
            var height = Math.abs(this.y - point.y);
            return Math.sqrt(width * width + height * height);
        },
        clone: function()
        {
            return new Point(this.x, this.y);
        }

    };

    return Point;
});

