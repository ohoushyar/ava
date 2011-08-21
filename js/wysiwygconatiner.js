/*
 * WysiwygContainer
 *
 * TODO: Accept time as '4/4' or '6/8' ...
 */
Ava.WysiwygContainer = function (spec) {
    var that = {};

    // Private attributes
    var clef           = spec.clef;
    var numBeat        = spec.numBeat || 4;
    var beatValue      = spec.beatValue || 4;
    var containerDivId = spec.containerDivId;

    var containerWidth = 0;
    var editable = true;
    var measures = [];

    var canvas,
        renderer,
        ctx;


    /*
     * toggleEditable
     */
    var toggleEditable = function() {
        if (!editable) {
            editable = true;
            $("#add-measure").css( 'display', 'inline');
        }
        else {
            editable = false;
            $("#add-measure").css( 'display', 'none');
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
        ctx.resize(containerWidth);
        measures.push(measure);
        redraw();  
    };

    // Add vex-canvas and Error handler div
    $("#"+containerDivId).html('<div id="tool-bar"></div><div id="vex-canvas"></div><div class="error" id="error-msg"></div><div id="tools"></div>');

    $("#tool-bar").html('<button id="edit-toggle" type="button">edit</button><button id="add-measure" type="button">Add Measure</button>');
    $("#edit-toggle").click(toggleEditable);
    $("#add-measure").click(addMeasure);
    if (!editable)
        $("#add-measure").css( 'display', 'none');

    canvas = $('#vex-canvas')[0]; 

    // Init
    renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.RAPHAEL);
    ctx = renderer.getContext();

    var initMeasure = Ava.Measure({
                    clef: 'treble',
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
    $(canvas).css( {
        backgroundColor: '#ffe', 
        padding: '10px',
        border: '5px solid #ccc',
        //overflow: 'auto'
        } );


    /*
     * draw
     */
    var draw = function () {
        for (var i=0; i < measures.length; i+=1){
            measures[i].draw();
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

    return that;
};




