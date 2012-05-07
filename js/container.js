/*
 * Container
 *
 * TODO: Accept time as '4/4' or '6/8' ...
 */
Ava.Container = function (spec) {
    var that = Ava;

    // Private attributes
    var clef           = spec.clef;
    var numBeat        = spec.numBeat || 4;
    var beatValue      = spec.beatValue || 4;
    var containerDivId = spec.containerDivId;

    var containerWidth = 0;
    // Container offset which would use to get mouse click position
    var containerOffset = {top: 0, left: 0};
    var editable = false;
    var measures = [];

    var canvas,
        renderer,
        ctx,
        cursor;
    var cursorPosition = {x: 0, y:0};


    // Add vex-canvas and Error handler div and other divs
    var html_content = '<div id="tool-bar"></div>';
    html_content += '<div id="vex-canvas"></div>';
    html_content += '<div class="error" id="error-msg"></div>';
    html_content += '<div id="tools"></div>';
    html_content += '<div id="verbose-info"></div>';
    $("#"+containerDivId).html(html_content);

    $("#tool-bar").html('<button id="edit-toggle" type="button">edit</button><button id="add-measure" type="button">Add Measure</button>');

    canvas = $('#vex-canvas')[0]; 

    // Init
    renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.RAPHAEL);
    ctx = renderer.getContext();
    cursor = Ava.Cursor({
                    ctx: ctx,
                    x: cursorPosition.x,
                    y: cursorPosition.y,
                });

    var getMeasure = function(x) {
        if (typeof x !== 'number') {
            throw {
                name: 'positionError',
                message: 'Only number is accepted',
            };
        }

        var measure;

        for (var i=0; i < measures.length; i+=1) {
            if (measures[i].x <= x)
                measure = measures[i];
            else
                break;
        }

        return measure;
    };

    /*
     * toggleEditable
     */
    var toggleEditable = function() {
        if (!editable) {
            editable = true;
            $('#add-measure').css( 'display', 'inline');
            $('#vex-canvas').click( function (e) { 
                        cursorPosition.x = e.pageX-containerOffset.left; 
                        cursor.move(cursorPosition.x, cursorPosition.y);
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
     */
    var addMeasure = function() {
        var x = 10;
        for(var i=0; i<measures.length; i+=1)
            x += measures[i].width;

        var  measure = Ava.Measure({
                        x: x, 
                        tickables: [ new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }), ],
                        ctx: ctx,
                    });

        containerWidth = measure.width + x + 10;
        // resize context based on new width
        ctx.resize(containerWidth);
        measures.push(measure);
        redraw();  
    };

    // Add events
    $('#vex-canvas').mousemove(function (e) {
            $('#verbose-info').html( e.pageX-containerOffset.left +', '+ (e.pageY-containerOffset.top) );
            });
    $("#edit-toggle").click(toggleEditable);
    $("#add-measure").click(addMeasure);


    // Add initial measures
    var initMeasure = Ava.Measure({
                    clef: 'treble',
                    showClef: true,
                    keySignature: 'G',
                    showTimeSignature: true,
                    tickables: [
                        new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
                        new Vex.Flow.StaveNote({ keys: ["b/4"], duration: "qr" }),
                        new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" }),
                        new Vex.Flow.StaveNote({ keys: ["d/4"], duration: "q" }),
                    ],
                    ctx: ctx,
                });
    measures.push(initMeasure);
    containerWidth += initMeasure.width + 30;

    $(canvas).css( 'width', containerWidth );
    $(canvas).css( 'height', '9em' );
    $(canvas).css({
            backgroundColor: '#ffe', 
            padding: '10px',
            border: '5px solid #ccc',
            //overflow: 'auto'
        });


    /*
     * draw
     */
    var draw = function () {
        for (var i=0; i < measures.length; i+=1){
            measures[i].draw();
        }

        // Set the correct offset as SVG is not before draw
        containerOffset.left = $('#vex-canvas svg').offset().left;
        containerOffset.top = $('#vex-canvas').offset().top;
        containerOffset.top = Math.floor(containerOffset.top);

        if (editable) {
            // For some reason after ctx clear it's not possible to show the cursor
            // again. So I need to recreate the object again. Might be able to 
            // improve it later.
            // Show the cursor again
            cursor = Ava.Cursor({
                        ctx: ctx,
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
        ctx.clear();
        draw();
    };

    // Public Methods
    that.toggleEditable = toggleEditable;
    that.addMeasure     = addMeasure;
    that.draw           = draw;
    that.measures       = measures;
    that.ctx            = ctx;

    return that;
};
