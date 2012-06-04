/*
 * Container
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

    // Public
    // that.measures;
    // that.ctx;
    // // Public Methods
    // that.toggleEditable;
    // that.addMeasure;

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
     * addMeasure
     *
     * Public
     *
     */
    that.addMeasure = function() {
        var x = 10;
        for(var i=0; i<that.measures.length; i+=1)
            x += that.measures[i].width;

        var  measure = Ava.Measure({
                        x: x,
                        tickables: [],
                        ctx: that.ctx,
                    });

        containerWidth = measure.width + x + 10;
        // resize context based on new width
        that.ctx.resize(containerWidth);
        that.measures.push(measure);
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
        that.measures = [];

        cursorPosition = {x: 0, y: 0};


        // Add vex-canvas and Error handler div and other divs
        htmlContent = '<div id="tool-bar"></div>';
        htmlContent += '<div id="vex-canvas"></div>';
        htmlContent += '<div class="error" id="error-msg"></div>';
        htmlContent += '<div id="tools"></div>';
        htmlContent += '<div id="verbose-info"></div>';
        $("#"+containerDivId).html(htmlContent);

        $("#tool-bar").html('<button id="edit-toggle" type="button">edit</button><button id="add-measure" type="button">Add Measure</button>');

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
        $("#add-measure").click(that.addMeasure);


        // Add initial measures
        var initMeasure = Ava.Measure({
                        clef: 'treble',
                        showClef: true,
                        keySignature: 'G',
                        showTimeSignature: true,
                        tickables: [
                            { keys: ["d/4"], duration: "q" },
                            { keys: ["b/4"], duration: "qr" },
                            { keys: ["c/4"], duration: "q" },
                            { keys: ["d/4"], duration: "q" },
                        ],
                        ctx: that.ctx,
                    });
        that.measures.push(initMeasure);
        containerWidth += initMeasure.width + 30;

        $(canvas).css( 'width', containerWidth );
        $(canvas).css( 'height', '9em' );
        $(canvas).css({
                backgroundColor: '#ffe',
                padding: '10px',
                border: '5px solid #ccc',
                //overflow: 'auto'
            });

    }(spec) );



    var _getMeasure = function(x) {
        if (typeof x !== 'number') {
            throw {
                name: 'positionError',
                message: 'Only number is accepted',
            };
        }

        var measure;

        for (var i=0; i < that.measures.length; i+=1) {
            if (that.measures[i].x <= x)
                measure = that.measures[i];
            else
                break;
        }

        return measure;
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

        var measure = _getMeasure(cursorPosition.x);
        if (measure.has_empty_spot())
            measure.addTickable(Ava.Tickable({ keys: ["d/4"], duration: "q" }));

        // redraw would happen after this function get called for sake of
        // performance rather than calling here
    };


    /*
     * draw
     */
    that.draw = function () {
        for (var i=0; i < that.measures.length; i+=1) {
            that.measures[i].draw();
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
