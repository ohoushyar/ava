/*
 * WysiwygContainer
 *
 * TODO: Accept time as '4/4' or '6/8' ...
 */
Ava.WysiwygContainer = function (clef, measures, numBeat, beatValue, containerDiv) {
    // Add vex-canvas
    $(containerDiv).html('<div id="vex-canvas"></div><div id="error-msg"></div>');

    this.x = 10;
    this.y = 0;

    this.measures = measures;
    this.numBeat = numBeat || 4;
    this.beatValue = beatValue || 4;
    this.clef = clef;
    this.time = {
        num_beats: this.measures * this.numBeat,
        beat_value: this.beatValue,
        resolution: Vex.Flow.RESOLUTION,
    };

    this.measureWidth = 250;
    this.width = this.measureWidth * this.measures;

    this.canvas = $('#vex-canvas')[0]; 

    $(this.canvas).css( 'width', this.width+50 );
    $(this.canvas).css( 'height', '9em' );
    $(this.canvas).css( {
        backgroundColor: '#ffe', 
        padding: '10px',
        border: '5px solid #ccc',
        //overflow: 'auto'
        } );

    this.renderer = new Vex.Flow.Renderer(this.canvas, Vex.Flow.Renderer.Backends.RAPHAEL);
    this.ctx      = this.renderer.getContext();
    this.stave    = new Vex.Flow.Stave(this.x, this.y, this.width);

    this.stave.addClef(this.clef).setContext(this.ctx);
};

/*
 * setTickables
 */
Ava.WysiwygContainer.prototype.setTickables = function (tickables) {
    this.tickables = [];

    for (var i = 0; i < tickables.length; i += 1) {
       switch(tickables[i].type) {
       case 'note':
           this.tickables.push( new Vex.Flow.StaveNote(tickables[i].value) ); 
           break;
       case 'bar-note':
           this.tickables.push( new Vex.Flow.BarNote() );
           break;
       }
    }
};

/*
 * draw
 */
Ava.WysiwygContainer.prototype.draw = function () {
    this.stave.draw();

    this.voice = new Vex.Flow.Voice(this.time).setStrict(true);
    try {
        this.voice.addTickables(this.tickables);

    var formatter = new Vex.Flow.Formatter().joinVoices([this.voice]).formatToStave([this.voice], this.stave);

    }
    catch (e) {
        $("#error-msg").html('<span class="error">' + e + '</span>');
    }

    try {
        this.voice.draw(this.ctx, this.stave);
    }
    catch (e) {
        $("#error-msg").html('<span class="error">' + e.message + '</span>');
    }
};


