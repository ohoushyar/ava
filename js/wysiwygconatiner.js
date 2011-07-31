/*
 * WysiwygContainer
 *
 * TODO: Accept time as '4/4' or '6/8' ...
 */
Ava.WysiwygContainer = function (spec) {
    var that = {};

    // Private attributes
    var x = spec[x] || 10;
    var y = spec[y] || 0;
    var clef           = spec.clef;
    var numOfMeasures  = spec.initNumOfMeasures;
    var numBeat        = spec.numBeat || 4;
    var beatValue      = spec.beatValue || 4;
    var containerDivId = spec.containerDivId;

    var measureWidth = 250;
    var editable = true;
    var containerTickables,
        containerWidth,
        time,
        canvas,
        renderer,
        ctx,
        stave;


    time = {
        num_beats: numOfMeasures * numBeat,
        beat_value: beatValue,
        resolution: Vex.Flow.RESOLUTION,
    };

    containerWidth = measureWidth * numOfMeasures;


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
        numOfMeasures += 1;
        time.num_beats += numBeat;
        containerWidth += measureWidth;
        ctx.resize(containerWidth);
        stave.setWidth(containerWidth);

        // Set REST as a deafult 
        containerTickables.push( new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "wr" }) );
        containerTickables.push( new Vex.Flow.BarNote() );

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
    $(canvas).css( 'width', containerWidth+70 );
    $(canvas).css( 'height', '9em' );
    $(canvas).css( {
        backgroundColor: '#ffe', 
        padding: '10px',
        border: '5px solid #ccc',
        //overflow: 'auto'
        } );

    // Init
    renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.RAPHAEL);
    ctx = renderer.getContext();
    stave = new Vex.Flow.Stave(x, y, containerWidth);
    stave.addClef(clef).setContext(ctx);

    /*
     * setTickables
     */
    var setTickables = function (tickables) {
        containerTickables = [];

        for (var i = 0; i < tickables.length; i += 1) {
            switch(tickables[i].type) {
            case 'note':
                containerTickables.push( new Vex.Flow.StaveNote(tickables[i].value) ); 
                break;
            case 'bar-note':
                containerTickables.push( new Vex.Flow.BarNote() );
                break;
            }
        }
    };

    /*
     * draw
     */
    var draw = function () {
        try {
            stave.draw();

            var voice = new Vex.Flow.Voice(time).setStrict(true);
            voice.addTickables(containerTickables);

            var formatter = new Vex.Flow.Formatter().joinVoices([voice]).formatToStave([voice], stave);

            voice.draw(ctx, stave);
        }
        catch (e) {
            $("#error-msg").html(e.code + ': ' + e.message);
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
    that.setTickables   = setTickables;
    that.draw           = draw;

    return that;
};




