/*
 * Container
 *
 * Public attribute:
 *  that.bars;
 *  that.ctx;
 * Public Methods:
 *  that.toggleEditable;
 *  that.add_bar;
 *
 * TODO: Accept time as '4/4' or '6/8' ...
 */
Ava.Container = function (spec) {
    var that = Ava;

    var clef,
        numBeat,
        beatValue,
        containerDivId,
        containerWidth,
        containerOffset,
        editable,
        canvas,
        renderer,
        cursor,
        cursorPositio,
        htmlContent;



    /*
     * toggleEditable
     *
     * Public
     */
    that.toggleEditable = function() {
        if (!editable) {
            editable = true;
            $('#add-measure').css( 'display', 'inline');
            $('#vex-canvas').click( function (e) {
                        // Get the position
                        cursorPosition.x = e.pageX-containerOffset.left;

                        // Move the cursor
                        cursor.move(cursorPosition.x, cursorPosition.y);

                        // Add the note
                        addNoteInPosition(cursorPosition);

                        // Redraw
                        redraw();
                    });
            cursor.show();
        }
        else {
            editable = false;
            $("#add-measure").css( 'display', 'none');
            $('#vex-canvas').unbind('click');
            cursor.hide();
        }
    };

    /*
     * add_bar
     *
     * Public
     *
     */
    that.add_bar = function() {
        var x = 10;
        for(var i=0; i<that.bars.length; i+=1)
            x += that.bars[i].width;

        var bar = Ava.Bar({
                        x: x,
                        tickables: [],
                        ctx: that.ctx,
                    });

        containerWidth = bar.width + x + 10;
        // resize context based on new width
        that.ctx.resize(containerWidth);
        that.bars.push(bar);
        redraw();
    };


    // Constructor
    ( function(s) {
        clef           = s.clef;
        numBeat        = s.numBeat || 4;
        beatValue      = s.beatValue || 4;
        containerDivId = s.containerDivId;

        containerWidth = 0;
        // Container offset which would use to get mouse click position
        containerOffset = {top: 0, left: 0};
        editable = false;
        that.bars = [];

        cursorPosition = {x: 0, y: 0};


        // Add vex-canvas and Error handler div and other divs
        htmlContent = '<div id="tool-bar"></div>';
        htmlContent += '<div id="vex-canvas"></div>';
        htmlContent += '<div class="error" id="error-msg"></div>';
        htmlContent += '<div id="tools"></div>';
        htmlContent += '<div id="verbose-info"></div>';
        $("#"+containerDivId).html(htmlContent);

        $("#tool-bar").html('<button id="edit-toggle" type="button">edit</button><button id="add-measure" type="button">Add bar</button>');

        canvas = $('#vex-canvas')[0];

        // Init
        renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.RAPHAEL);
        that.ctx = renderer.getContext();
        cursor = Ava.Cursor({
                        ctx: that.ctx,
                        x: cursorPosition.x,
                        y: cursorPosition.y,
                    });



        // Add events
        $('#vex-canvas').mousemove(function (e) {
                $('#verbose-info').html( e.pageX-containerOffset.left +', '+ (e.pageY-containerOffset.top) );
                });
        $("#edit-toggle").click(that.toggleEditable);
        $("#add-measure").click(that.add_bar);


        // Add initial bars
        var init_bar = Ava.Bar({
                        clef: s.init_bar.clef,
                        showClef: s.init_bar.showClef,
                        keySignature: s.init_bar.keySignature,
                        showTimeSignature: s.init_bar.showTimeSignature,
                        tickables: s.init_bar.tickables,
                        ctx: that.ctx,
                        numBeat: numBeat,
                        beatValue: beatValue,
                    });
        that.bars.push(init_bar);
        containerWidth += init_bar.width + 30;

        $(canvas).css( 'width', containerWidth );
        $(canvas).css( 'height', '9em' );
        $(canvas).css({
                backgroundColor: '#ffe',
                padding: '10px',
                border: '5px solid #ccc',
                //overflow: 'auto'
            });

    }(spec) );



    var _get_bar = function(x) {
        if (typeof x !== 'number') {
            throw {
                name: 'positionError',
                message: 'Only number is accepted',
            };
        }

        var bar;

        for (var i=0; i < that.bars.length; i+=1) {
            if (that.bars[i].x <= x)
                bar = that.bars[i];
            else
                break;
        }

        return bar;
    };

    /*
     * addNoteInPosition
     */
    var addNoteInPosition = function(cursorPosition) {
        if (typeof cursorPosition !== 'object') {
            throw {
                name: 'invalidParam',
                message: 'Passed invalid parameter',
            };
        }

        var bar = _get_bar(cursorPosition.x);
        if (bar.has_empty_spot())
            bar.addTickable(Ava.Tickable({ keys: ["d/4"], duration: Ava.Context.currentDuration() }));

        // redraw would happen after this function get called for sake of
        // performance rather than calling here
    };


    /*
     * draw
     */
    that.draw = function () {
        for (var i=0; i < that.bars.length; i+=1) {
            that.bars[i].draw();
        }

        // Set the correct offset as SVG is not before draw
        containerOffset.left = $('#vex-canvas svg').offset().left;
        containerOffset.top = $('#vex-canvas').offset().top;
        containerOffset.top = Math.floor(containerOffset.top);

        if (editable) {
            // For some reason after ctx clear it's not possible to show
            // the cursor again. So I need to recreate the object again.
            // Might be able to improve it later.
            // Show the cursor again
            cursor = Ava.Cursor({
                        ctx: that.ctx,
                        x: cursorPosition.x,
                        y: cursorPosition.y,
                    });
            cursor.show();
        }
    };

    /*
     * redraw
     */
    var redraw = function() {
        $(canvas).css( 'width', containerWidth+70 );
        that.ctx.clear();
        that.draw();
    };

    return that;
};
