function Pool()
{
    this.lastId = 0;
    this.microbs = {};
}

Pool.prototype = {
    init: function(count)
    {
        count = count || 100;

        for (var i = 0; i < count; i++)
        {
            var microb = new Microb(this);

            this.add(microb);
        }
    },
    add: function(microb)
    {
        this.microbs[this.lastId] = microb;
        microb.id = this.lastId;
        this.lastId++;
    },
    remove: function(microb)
    {
        delete this.microbs[microb.id];
    },
    update: function()
    {
        var count = 0;

        for(var id in this.microbs)
        {
            this.microbs[id].update();
            this.collisionTest(this.microbs[id]);
            count++;
        }

        this.count = count;
    },

    collisionTest: function(target)
    {
        for(var id in this.microbs)
        {
            if( target === this.microbs[id])
            {
                continue;
            }

            this.microbs[id].collisionTest(target);
        }
    }
    
}
