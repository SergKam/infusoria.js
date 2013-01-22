define(function(require){
    var Point = require('geometry/Point');
    
    function Box(leftTop, rightBottom)
    {
        this.leftTop = leftTop || new Point(0, 0);
        this.rightBottom = rightBottom || new Point(0, 0);
    }
    
    Box.prototype = {
       extend: function(point)
       {
           if(point.x < this.leftTop.x) this.leftTop.x = point.x;
           if(point.x > this.rightBottom.x) this.rightBottom.x = point.x;
           if(point.y < this.leftTop.y) this.leftTop.y = point.y;
           if(point.y > this.rightBottom.y) this.rightBottom.y = point.y;
           return this;
       },
       setBounds: function (left, top, width, height)
       {
            this.leftTop.x = left;
            this.leftTop.y = top;
            this.rightBottom.x = left + width;
            this.rightBottom.y = top + height;   
            return this;
       },
       isInside: function(box)
       {
            return (this.leftTop.x > box.leftTop.x &&
            this.leftTop.y > box.leftTop.x &&
            this.rightBottom.x < box.rightBottom.x &&
            this.rightBottom.y < box.rightBottom.x );
           
       },
       getSize: function()
       {
           return new Point(
                   this.rightBottom.x - this.leftTop.x,
                   this.rightBottom.y - this.leftTop.y
           )
       },
       moveTo: function(point)
       {
           this.leftTop.addPoint(point);
           this.rightBottom.addPoint(point);
           return this;
       },
       clone: function()
       {
           return new Box(this.leftTop.clone(), this.rightBottom.clone());
       }
    };
    

    return Box;
});